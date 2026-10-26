(function () {
  'use strict';

  const C = window.CONTENU;
  const $ = (sel) => document.querySelector(sel);
  const MOINS_ANIM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Style d'animation : 'confettis' (par défaut), 'flocons' ou 'paillettes'.
  // Se choisit avec window.STYLE_ANIM = '…' dans la page, avant les scripts.
  const NOMS_ANIM = { confettis: 'Confettis', flocons: 'Flocons doux', paillettes: 'Paillettes dorées' };
  const ANIM = NOMS_ANIM[window.STYLE_ANIM] ? window.STYLE_ANIM : 'confettis';
  // Page d'aperçu : toutes les cases ouvertes, sans code.
  const DEMO = window.DEMO === true;
  document.documentElement.dataset.anim = ANIM;

  /* ───────── Outils ───────── */

  function h(tag, props, ...enfants) {
    const el = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const e of enfants.flat()) {
      if (e == null || e === false) continue;
      el.append(e instanceof Node ? e : document.createTextNode(e));
    }
    return el;
  }

  // Comme replaceChildren, mais ignore les enfants absents (false, null, undefined).
  function remplir(el, ...enfants) {
    el.replaceChildren(...enfants.flat().filter((e) => e != null && e !== false));
  }

  const stock = {
    lire(cle) { try { return localStorage.getItem(cle); } catch (e) { return null; } },
    ecrire(cle, val) { try { localStorage.setItem(cle, val); } catch (e) { /* navigation privée */ } },
    effacer(cle) { try { localStorage.removeItem(cle); } catch (e) { /* idem */ } }
  };

  const pad = (n) => String(n).padStart(2, '0');
  const isoDe = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

  // Sans accents, minuscules, lettres uniquement : « Je te Crêpe ! » → « je te crepe »
  const normaliser = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z]+/g, ' ').trim();
  const compact = (s) => normaliser(s).replace(/ /g, '');

  const JOURS_SEMAINE = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function dateLisible(iso, avecJour) {
    const [a, m, j] = iso.split('-').map(Number);
    const d = new Date(a, m - 1, j);
    const num = j === 1 ? '1er' : String(j);
    return (avecJour ? JOURS_SEMAINE[d.getDay()] + ' ' : '') + num + ' ' + MOIS[m - 1];
  }
  const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const COEUR = '<svg viewBox="0 0 32 29" aria-hidden="true"><path d="M16 28.5 3.3 15.8A7.9 7.9 0 1 1 16 6.1a7.9 7.9 0 1 1 12.7 9.7Z"/></svg>';
  const FLOCON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5"/></svg>';
  const ETOILE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z"/></svg>';
  function coeurSvg(cls) {
    const span = h('span');
    span.innerHTML = COEUR;
    const svg = span.firstChild;
    if (cls) svg.setAttribute('class', cls);
    return svg;
  }

  /* ───────── Dates et verrouillage ───────── */

  const JOURS = Object.keys(C.jours).sort();
  const params = new URLSearchParams(location.search);

  let modeTest = DEMO || stock.lire('avent-test') === '1';
  let ouvertes = new Set(JSON.parse(stock.lire('avent-ouvertes') || '[]'));

  // En mode test, ?date=2026-11-12 simule ce jour-là au lieu de tout déverrouiller.
  function aujourdhui() {
    const simulee = params.get('date');
    if (modeTest && simulee && /^\d{4}-\d{2}-\d{2}$/.test(simulee)) return simulee;
    return isoDe(new Date());
  }
  const toutOuvert = () => modeTest && !params.get('date');
  const estDispo = (iso) => toutOuvert() || iso <= aujourdhui();

  /* ───────── Grille ───────── */

  function afficherGrille() {
    const racine = $('#grille');
    racine.replaceChildren();
    const auj = aujourdhui();
    for (const [num, nom] of [['11', 'Novembre'], ['12', 'Décembre']]) {
      const grille = h('div', { class: 'cases' });
      for (const iso of JOURS.filter((j) => j.slice(5, 7) === num)) {
        const dispo = estDispo(iso);
        const classes = ['case', dispo ? 'dispo' : 'fermee'];
        if (dispo && ouvertes.has(iso)) classes.push('ouverte');
        if (iso === auj) classes.push('aujourdhui');
        grille.append(h('button', {
          type: 'button',
          class: classes.join(' '),
          'aria-label': majuscule(dateLisible(iso, true)) + (dispo ? '' : ', pas encore ouverte'),
          onclick: (e) => clicCase(iso, e.currentTarget)
        }, String(Number(iso.slice(8)))));
      }
      racine.append(h('section', { class: 'mois' }, h('h2', { text: nom }), grille));
    }
    $('#barre-test').hidden = !modeTest;
    $('#quitter-test').hidden = DEMO;
    $('#barre-test-texte').textContent = DEMO
      ? 'Aperçu « ' + NOMS_ANIM[ANIM] + ' » : toutes les cases sont ouvertes.'
      : toutOuvert()
        ? 'Mode test : toutes les cases sont ouvertes.'
        : 'Mode test : date simulée au ' + dateLisible(aujourdhui(), false) + '.';
  }

  // Centre de la case touchée, pour faire partir l'animation « paillettes » de là.
  let pointOrigine = null;

  function clicCase(iso, bouton) {
    if (!estDispo(iso)) {
      bouton.classList.remove('secoue');
      void bouton.offsetWidth;
      bouton.classList.add('secoue');
      toast('Patience… celle-ci s\'ouvre le ' + dateLisible(iso, false) + '.');
      return;
    }
    if (ANIM === 'flocons' && !MOINS_ANIM) {
      if (bouton.classList.contains('pivote')) return;
      bouton.classList.add('pivote');
      setTimeout(() => ouvrirCase(iso), 260);
      return;
    }
    if (ANIM === 'paillettes') {
      const r = bouton.getBoundingClientRect();
      pointOrigine = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    ouvrirCase(iso);
  }

  let minuteurToast;
  function toast(texte) {
    const t = $('#toast');
    t.textContent = texte;
    t.classList.add('visible');
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(() => t.classList.remove('visible'), 2400);
  }

  /* ───────── Fenêtre ───────── */

  const fenetre = $('#fenetre');
  const zone = $('#fenetre-contenu');
  let nettoyages = [];
  let historiquePousse = false;
  let dernierFocus = null;

  function montrerFenetre(titre, contenu) {
    viderFenetre();
    $('#fenetre-titre').textContent = titre;
    zone.replaceChildren(contenu);
    zone.scrollTop = 0;
    if (fenetre.hidden) {
      dernierFocus = document.activeElement;
      fenetre.hidden = false;
      document.body.classList.add('bloque');
      if (!historiquePousse) { history.pushState({ fenetre: true }, ''); historiquePousse = true; }
      fenetre.querySelector('.fermer').focus({ preventScroll: true });
      // « Paillettes » : la fenêtre grandit depuis la case touchée.
      const feuille = fenetre.querySelector('.feuille');
      feuille.style.transformOrigin = pointOrigine
        ? (pointOrigine.x - feuille.offsetLeft) + 'px ' + (pointOrigine.y - feuille.offsetTop) + 'px'
        : '';
    }
    pointOrigine = null;
  }

  function viderFenetre() {
    nettoyages.forEach((f) => f());
    nettoyages = [];
  }

  // Fermer passe par l'historique : le bouton « retour » du téléphone ferme aussi la case.
  function fermerFenetre(depuisHistorique) {
    if (fenetre.hidden) return;
    if (historiquePousse && !depuisHistorique) { history.back(); return; }
    historiquePousse = false;
    viderFenetre();
    fenetre.hidden = true;
    zone.replaceChildren();
    document.body.classList.remove('bloque');
    afficherGrille();
    if (dernierFocus && document.contains(dernierFocus)) dernierFocus.focus({ preventScroll: true });
  }

  fenetre.addEventListener('click', (e) => { if (e.target.closest('[data-fermer]')) fermerFenetre(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerFenetre(false); });
  window.addEventListener('popstate', () => fermerFenetre(true));

  function ouvrirCase(iso) {
    const jour = C.jours[iso];
    const rendu = RENDUS[jour.type];
    const origine = pointOrigine;
    montrerFenetre(majuscule(dateLisible(iso, true)), rendu(jour, iso));
    if (!modeTest) {
      ouvertes.add(iso);
      stock.ecrire('avent-ouvertes', JSON.stringify([...ouvertes]));
    }
    if (!['spa', 'cadeau'].includes(jour.type)) fete(origine);
  }

  /* ───────── Animations ───────── */

  function calqueParticules(dureeMs) {
    const calque = h('div', { class: 'particules', 'aria-hidden': 'true' });
    document.body.append(calque);
    setTimeout(() => calque.remove(), dureeMs);
    return calque;
  }

  const COULEURS = ['#b3363b', '#d0a24c', '#2f5d50', '#e8a3a0', '#f7e7c2'];

  function confettis() {
    if (MOINS_ANIM) return;
    const calque = calqueParticules(1400);
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI;
      const force = 80 + Math.random() * 120;
      calque.append(h('span', {
        class: 'confetti',
        style: `background:${COULEURS[i % COULEURS.length]};--dx:${Math.cos(angle) * force * 1.4}px;--dy:${Math.sin(angle) * force}px;--rot:${Math.random() * 540 - 270}deg;animation-delay:${Math.random() * 80}ms`
      }));
    }
  }

  const ROUGES = ['#b3363b', '#e05a61', '#e8a3a0', '#8e2a2f'];
  const BLEUS = ['#8fb0c7', '#a9c3d6', '#7a9db8'];
  const ORS = ['#d0a24c', '#e8c36a', '#b3363b', '#c9973f'];

  // Particules qui traversent l'écran : 'tombe' (vers le bas) ou 'envol' (vers le haut).
  function pluie(forme, nombre, couleurs, { taille = [16, 36], duree = [3.5, 3], delai = 1.8, classe = 'tombe' } = {}) {
    if (MOINS_ANIM) return;
    const calque = calqueParticules(12000);
    for (let i = 0; i < nombre; i++) {
      const t = taille[0] + Math.random() * (taille[1] - taille[0]);
      const el = h('span', {
        class: classe,
        style: `left:${Math.random() * 100}%;width:${t}px;height:${t}px;color:${couleurs[i % couleurs.length]};fill:currentColor;--duree:${duree[0] + Math.random() * duree[1]}s;--delai:${Math.random() * delai}s`
      });
      el.innerHTML = forme;
      el.firstChild.style.animationDelay = (-Math.random() * 2) + 's';
      calque.append(el);
    }
  }

  function pluieDeCoeurs() {
    if (ANIM === 'paillettes') pluie(COEUR, 38, ROUGES, { duree: [3, 2.5], classe: 'envol' });
    else if (ANIM === 'flocons') pluie(COEUR, 34, ROUGES, { taille: [16, 34], duree: [5.5, 3] });
    else pluie(COEUR, 38, ROUGES);
  }
  const chuteDeNeige = () => pluie(FLOCON, 34, BLEUS, { taille: [14, 28] });

  // Particules qui jaillissent d'un point dans toutes les directions.
  function gerbe(forme, x, y, nombre, couleurs, portee) {
    if (MOINS_ANIM) return;
    const calque = calqueParticules(1500);
    for (let i = 0; i < nombre; i++) {
      const angle = (Math.PI * 2 * i) / nombre + Math.random() * 0.3;
      const force = portee + Math.random() * portee * 0.8;
      const el = h('span', {
        class: 'jaillit',
        style: `left:${x}px;top:${y}px;fill:${couleurs[i % couleurs.length]};--dx:${Math.cos(angle) * force}px;--dy:${Math.sin(angle) * force}px`
      });
      el.innerHTML = forme;
      calque.append(el);
    }
  }
  function centreDe(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function gerbeDeCoeurs(depuis) {
    const { x, y } = centreDe(depuis);
    gerbe(COEUR, x, y, 14, COULEURS.slice(0, 2), 90);
  }

  // Petite célébration : ouverture d'une case, quiz sans faute, pendu réussi.
  function fete(origine) {
    if (ANIM === 'flocons') pluie(FLOCON, 22, BLEUS, { taille: [10, 22], duree: [2.2, 1.5], delai: 0.6 });
    else if (ANIM === 'paillettes') {
      const p = origine || { x: innerWidth / 2, y: innerHeight * 0.3 };
      gerbe(ETOILE, p.x, p.y, 16, ORS, 70);
    } else confettis();
  }

  // « Flocons » : quelques flocons tombent doucement derrière la grille, en continu.
  if (ANIM === 'flocons' && !MOINS_ANIM) {
    const fond = h('div', { class: 'neige-fond', 'aria-hidden': 'true' });
    for (let i = 0; i < 14; i++) {
      const t = 8 + Math.random() * 12;
      const el = h('span', {
        class: 'flocon-fond',
        style: `left:${Math.random() * 100}%;width:${t}px;height:${t}px;animation-duration:${10 + Math.random() * 8}s;animation-delay:${-Math.random() * 18}s`
      });
      el.innerHTML = FLOCON;
      fond.append(el);
    }
    document.body.prepend(fond);
  }

  /* ───────── Rendus simples ───────── */

  function rendreTexte(j) {
    return h('div', null, h('p', { class: 'grand', text: j.texte }));
  }

  function rendreQuestion(j) {
    return h('div', null,
      h('p', { class: 'etiquette', text: j.defi ? 'Défi' : 'Question' }),
      h('p', { class: 'grand', text: j.texte }),
      h('p', { class: 'consigne', text: 'Réponds-moi par message.' }));
  }

  const aCompleter = (t) => typeof t === 'string' && t.startsWith('À COMPLÉTER');

  function rendrePhoto(j) {
    return h('figure', { class: 'photo' },
      h('img', { src: j.src, alt: aCompleter(j.legende) ? 'Photo' : j.legende }),
      h('figcaption', { class: aCompleter(j.legende) ? 'a-completer' : null, text: j.legende }));
  }

  function rendreBon(j) {
    return h('div', { class: 'bon' },
      h('p', { class: 'bon-kicker', text: 'Bon pour' }),
      h('p', { class: 'bon-titre', text: j.titre }),
      h('p', { class: 'bon-mention', text: 'À utiliser quand on se retrouve.' }));
  }

  function rendrePochette(j) {
    return h('div', null,
      h('p', { class: 'pochette-num', text: 'Ouvre la pochette n°' + j.numero }),
      h('p', { class: 'indice', text: j.indice }));
  }

  function rendreRecette(j) {
    return h('div', { class: 'recette' },
      h('p', { class: 'etiquette', text: 'Défi recette' }),
      h('p', { class: 'titre-bloc', text: j.titre }),
      j.note && h('p', { class: 'alerte', text: j.note }),
      h('h3', { text: 'Ingrédients' }),
      j.portions && h('p', { class: 'note', text: j.portions }),
      h('ul', null, j.ingredients.map((i) => h('li', { text: i }))),
      h('h3', { text: 'Étapes' }),
      h('ol', null, j.etapes.map((e) => h('li', { text: e }))),
      j.astuce && h('p', { class: 'note', text: j.astuce }),
      h('p', { class: 'consigne', text: 'Envoie-moi une photo du résultat.' }));
  }

  /* ───────── Quiz (QCM, vrai ou faux, photo) ───────── */

  function quiz({ titre, questions }) {
    const racine = h('div');
    const seule = questions.length === 1;

    function demarrer() {
      let n = 0;
      let score = 0;
      afficherQuestion();

      function afficherQuestion() {
        const q = questions[n];
        const multiple = q.bonnes.length > 1;
        const choisis = new Set();
        let repondu = false;

        const boutons = q.choix.map((texte, i) => h('button', {
          type: 'button',
          onclick: () => {
            if (repondu) return;
            if (multiple) {
              choisis.has(i) ? choisis.delete(i) : choisis.add(i);
              boutons[i].classList.toggle('choisi');
              boutons[i].setAttribute('aria-pressed', choisis.has(i));
              valider.disabled = choisis.size === 0;
            } else {
              choisis.add(i);
              corriger();
            }
          }
        }, texte));
        if (multiple) boutons.forEach((b) => b.setAttribute('aria-pressed', 'false'));

        const valider = multiple ? h('button', { type: 'button', class: 'bouton', disabled: true, onclick: () => corriger() }, 'Valider') : null;
        const bas = h('div');

        remplir(racine, 
          titre && h('p', { class: 'titre-bloc', text: titre }),
          !seule && h('p', { class: 'progression', text: 'Question ' + (n + 1) + ' sur ' + questions.length }),
          q.q && h('p', { class: 'question', text: q.q }),
          multiple && h('p', { class: 'aide', text: 'Plusieurs réponses possibles.' }),
          h('div', { class: 'choix' + (q.choix.length === 2 ? ' deux' : '') }, boutons),
          valider && h('div', { class: 'boutons' }, valider),
          bas);

        function corriger() {
          repondu = true;
          if (valider) valider.remove();
          let bonnesTrouvees = 0;
          boutons.forEach((b, i) => {
            b.disabled = true;
            const bonne = q.bonnes.includes(i);
            if (bonne) b.classList.add('bonne');
            if (choisis.has(i) && !bonne) b.classList.add('ratee');
            if (choisis.has(i) && bonne) bonnesTrouvees++;
          });
          const parfait = bonnesTrouvees === q.bonnes.length && choisis.size === q.bonnes.length;
          if (parfait) score++;
          const verdict = parfait ? 'Bien vu !' : (bonnesTrouvees > 0 ? 'En partie !' : 'Presque !');
          const libelles = multiple
            ? q.bonnes.map((i) => '« ' + q.choix[i] + ' »').join(' et ')
            : q.choix[q.bonnes[0]];
          const rappel = (multiple ? 'Les bonnes réponses : ' : 'La bonne réponse : ') + libelles + '.';

          const suite = seule
            ? h('button', { type: 'button', class: 'bouton discret', onclick: demarrer }, 'Rejouer')
            : h('button', { type: 'button', class: 'bouton', onclick: () => { n++; n < questions.length ? afficherQuestion() : afficherScore(); } },
              n + 1 < questions.length ? 'Question suivante' : 'Voir mon score');

          bas.replaceChildren(
            h('div', { class: 'retour', role: 'status' },
              h('strong', { text: verdict }),
              h('p', { text: rappel }),
              q.explication && h('p', { text: q.explication })),
            h('div', { class: 'boutons' }, suite));
          bas.querySelector('.retour').scrollIntoView({ block: 'nearest', behavior: MOINS_ANIM ? 'auto' : 'smooth' });
        }
      }

      function afficherScore() {
        const total = questions.length;
        const mot = score === total ? 'Sans faute, bravo !'
          : score >= total / 2 ? 'Joli score !'
          : 'L\'important, c\'est d\'avoir joué.';
        remplir(racine, 
          titre && h('p', { class: 'titre-bloc', text: titre }),
          h('div', { class: 'score' },
            h('p', { class: 'note', text: 'Ton score' }),
            h('p', { class: 'score-chiffre', text: score + ' / ' + total }),
            h('p', { class: 'grand', text: mot }),
            h('button', { type: 'button', class: 'bouton', onclick: demarrer }, 'Rejouer')));
        if (score === total) fete();
      }
    }

    demarrer();
    return racine;
  }

  const rendreQuiz = (j) => quiz(j);

  const rendreVraiFaux = (j) => quiz({
    titre: j.titre,
    questions: j.questions.map((q) => ({ q: q.q, choix: ['Vrai', 'Faux'], bonnes: [q.vrai ? 0 : 1], explication: q.explication }))
  });

  function rendreLieu(j) {
    return h('div', null,
      h('p', { class: 'question', text: 'Où a été prise cette photo ?' }),
      h('figure', { class: 'photo' }, h('img', { src: j.src, alt: 'Photo d\'un lieu à deviner' })),
      h('p', { class: 'consigne', text: 'Réponds-moi par message.' }));
  }

  /* ───────── Pendu ───────── */

  function rendrePendu(j) {
    const racine = h('div');
    const mot = j.mot.toUpperCase();
    const MAX = 6;
    let ecouteClavier = null;

    function demarrer() {
      const trouvees = new Set();
      let erreurs = 0;
      let fini = false;
      const touches = {};

      const motEl = h('div', { class: 'mot', 'aria-live': 'polite' });
      const vies = h('div', { class: 'vies', 'aria-hidden': 'true' });
      const viesTexte = h('p', { class: 'vies-texte' });
      const clavier = h('div', { class: 'clavier' });
      const resultat = h('div', { class: 'resultat' });

      for (const rang of ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN']) {
        clavier.append(h('div', { class: 'rang' }, [...rang].map((l) => {
          touches[l] = h('button', { type: 'button', class: 'touche', 'aria-label': 'Lettre ' + l, onclick: () => jouer(l) }, l);
          return touches[l];
        })));
      }

      function dessiner(revelerTout) {
        motEl.replaceChildren(...[...mot].map((l) => {
          const vue = trouvees.has(l);
          return h('span', { class: 'lettre' + (!vue && revelerTout ? ' revelee' : '') }, vue || revelerTout ? l : '');
        }));
        motEl.setAttribute('aria-label', [...mot].map((l) => trouvees.has(l) ? l : 'vide').join(' '));
        vies.replaceChildren(...Array.from({ length: MAX }, (_, i) => h('span', { class: 'vie' + (i < erreurs ? ' perdue' : '') })));
        const reste = MAX - erreurs;
        viesTexte.textContent = reste > 1 ? 'Encore ' + reste + ' essais' : (reste === 1 ? 'Dernier essai !' : '');
      }

      function jouer(l) {
        if (fini || touches[l].disabled) return;
        touches[l].disabled = true;
        if (mot.includes(l)) {
          trouvees.add(l);
          touches[l].classList.add('oui');
        } else {
          erreurs++;
          touches[l].classList.add('non');
        }
        const gagne = [...mot].every((x) => trouvees.has(x));
        const perdu = erreurs >= MAX;
        dessiner(perdu);
        if (gagne || perdu) terminer(gagne);
      }

      function terminer(gagne) {
        fini = true;
        clavier.remove();
        viesTexte.textContent = '';
        resultat.replaceChildren(
          h('p', { class: 'grand', text: gagne ? j.reussite : j.echec }),
          h('p', { class: 'note', text: j.explication }),
          h('div', { class: 'boutons', style: 'justify-content:center' },
            h('button', { type: 'button', class: gagne ? 'bouton discret' : 'bouton', onclick: demarrer }, gagne ? 'Rejouer' : 'Recommencer')));
        if (gagne) fete();
      }

      dessiner(false);
      remplir(racine, 
        h('p', { class: 'etiquette', text: 'Pendu' }),
        h('p', { class: 'indice', text: 'Indice : ' + j.indice }),
        motEl, vies, viesTexte, clavier, resultat);

      ecouteClavier = (e) => {
        const l = e.key && e.key.length === 1 ? normaliser(e.key).toUpperCase() : '';
        if (touches[l] && !e.metaKey && !e.ctrlKey) jouer(l);
      };
    }

    demarrer();
    const relais = (e) => ecouteClavier && ecouteClavier(e);
    document.addEventListener('keydown', relais);
    nettoyages.push(() => document.removeEventListener('keydown', relais));
    return racine;
  }

  /* ───────── Champ de réponse (énigme, rébus) ───────── */

  function champReponse(surValider) {
    const input = h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'done', placeholder: 'Ta réponse', 'aria-label': 'Ta réponse' });
    const form = h('form', { class: 'reponse', onsubmit: (e) => { e.preventDefault(); if (input.value.trim()) surValider(input.value); } },
      input, h('button', { type: 'submit', class: 'bouton' }, 'Valider'));
    return { form, input };
  }

  /* ───────── Énigme ───────── */

  function rendreEnigme(j) {
    const racine = h('div');

    function demarrer() {
      let montres = 1;
      const liste = h('ol', { class: 'liste-indices' });
      const message = h('p', { class: 'message', role: 'status' });
      const actions = h('div', { class: 'boutons' });
      const { form, input } = champReponse((val) => {
        if (compact(val).includes(compact(j.reponse))) gagner(j.reussite);
        else message.textContent = montres < j.indices.length ? 'Pas tout à fait… prends un autre indice.' : 'Pas tout à fait… essaie encore.';
      });

      function dessiner() {
        liste.replaceChildren(...j.indices.slice(0, montres).map((t, i) => h('li', null, h('span', { text: 'Indice ' + (i + 1) }), t)));
        actions.replaceChildren(montres < j.indices.length
          ? h('button', { type: 'button', class: 'bouton discret', onclick: () => { montres++; message.textContent = ''; dessiner(); } }, 'Indice suivant')
          : h('button', { type: 'button', class: 'bouton discret', onclick: () => gagner('C\'était la neige !') }, 'Voir la réponse'));
      }

      function gagner(texte) {
        input.blur();
        racine.replaceChildren(h('div', { class: 'victoire' },
          h('p', { class: 'grand', text: texte }),
          h('div', { class: 'boutons', style: 'justify-content:center' },
            h('button', { type: 'button', class: 'bouton discret', onclick: demarrer }, 'Rejouer'))));
        chuteDeNeige();
      }

      dessiner();
      racine.replaceChildren(
        h('p', { class: 'etiquette', text: 'Énigme' }),
        h('p', { class: 'question', text: 'Qui suis-je ?' }),
        liste, actions, form, message);
    }

    demarrer();
    return racine;
  }

  /* ───────── Rébus ───────── */

  function rendreRebus(j, iso) {
    const racine = h('div');
    const cle = 'avent-rebus-debut-' + iso;
    if (!stock.lire(cle)) stock.ecrire(cle, String(Date.now()));
    const debut = Number(stock.lire(cle)) || Date.now();
    const delai = (j.delaiIndiceMinutes || 5) * 60 * 1000;
    let minuteur = null;
    nettoyages.push(() => clearTimeout(minuteur));

    function demarrer() {
      const message = h('p', { class: 'message', role: 'status' });
      const zoneIndice = h('div');
      const { form, input } = champReponse((val) => {
        const c = compact(val);
        if (c.includes('tecrepe') || c.includes('tcrepe')) gagner();
        else if (c.includes('jetaime') || c.includes('jtaime')) message.textContent = 'Presque… c\'est notre version à nous.';
        else message.textContent = 'Pas tout à fait… essaie encore.';
      });

      function montrerIndice() {
        if (zoneIndice.childElementCount) return;
        zoneIndice.append(
          h('div', { class: 'retour' }, h('strong', { text: 'Indice' }), h('p', { text: j.indice })),
          h('div', { class: 'boutons' }, h('button', { type: 'button', class: 'bouton discret', onclick: gagner }, 'Voir la réponse')));
      }

      function gagner() {
        clearTimeout(minuteur);
        input.blur();
        racine.replaceChildren(h('div', { class: 'victoire' },
          coeurSvg('coeur-svg'),
          h('p', { class: 'grand', text: majuscule(j.reponse) }),
          h('div', { class: 'boutons', style: 'justify-content:center' },
            h('button', { type: 'button', class: 'bouton discret', onclick: demarrer }, 'Rejouer'))));
        pluieDeCoeurs();
      }

      remplir(racine, 
        h('p', { class: 'etiquette', text: 'Rébus' }),
        h('div', { class: 'rebus', 'aria-label': j.emojis.join(' plus ') },
          ...j.emojis.flatMap((e, i) => i ? [h('span', { class: 'plus', 'aria-hidden': 'true' }, '+'), h('span', null, e)] : [h('span', null, e)])),
        h('p', { class: 'question', style: 'text-align:center', text: 'Qu\'est-ce que je veux te dire ?' }),
        form, message, zoneIndice,
        modeTest && h('div', { class: 'boutons' },
          h('button', { type: 'button', class: 'bouton discret', onclick: montrerIndice }, 'Test : montrer l\'indice maintenant')));

      const reste = delai - (Date.now() - debut);
      clearTimeout(minuteur);
      if (reste <= 0) montrerIndice();
      else minuteur = setTimeout(montrerIndice, reste);
    }

    demarrer();
    return racine;
  }

  /* ───────── Cadeau (spa et 24 décembre) ───────── */

  function cadeau({ indice, revele, iso }) {
    const racine = h('div', { class: 'cadeau-zone' });
    const boite = h('button', { type: 'button', class: 'cadeau', 'aria-label': 'Ouvrir le cadeau' },
      h('span', { class: 'c-boite' }),
      h('span', { class: 'c-couvercle' }, h('span', { class: 'c-noeud' })));
    const cta = h('p', { class: 'cta', text: 'Clique pour l\'ouvrir' });

    boite.addEventListener('click', () => {
      if (boite.classList.contains('ouvert')) return;
      boite.classList.add('ouvert');
      cta.remove();
      gerbeDeCoeurs(boite);
      if (ANIM === 'flocons') pluie(FLOCON, 22, BLEUS, { taille: [10, 22], duree: [2.5, 1.5], delai: 0.8 });
      if (ANIM === 'paillettes') {
        const t0 = setTimeout(() => { const { x, y } = centreDe(boite); gerbe(ETOILE, x, y, 20, ORS, 110); }, 450);
        nettoyages.push(() => clearTimeout(t0));
      }
      const delaiOuverture = { confettis: 750, flocons: 1200, paillettes: 1150 }[ANIM];
      const t1 = setTimeout(() => {
        boite.classList.add('parti');
        const t2 = setTimeout(() => {
          boite.remove();
          const contenu = revele();
          racine.append(contenu,
            h('div', { class: 'boutons', style: 'justify-content:center' },
              h('button', { type: 'button', class: 'bouton discret', onclick: () => ouvrirCase(iso) }, 'Revoir l\'ouverture')));
          // Lire la mise en page fige l'état de départ, pour que la transition se joue.
          const anime = contenu.querySelector('.ticket') || contenu;
          void anime.offsetWidth;
          anime.classList.add('visible');
          pluieDeCoeurs();
        }, MOINS_ANIM ? 0 : 380);
        nettoyages.push(() => clearTimeout(t2));
      }, MOINS_ANIM ? 0 : delaiOuverture);
      nettoyages.push(() => clearTimeout(t1));
    });

    remplir(racine, indice ? h('p', { class: 'indice', text: indice }) : null, boite, cta);
    return racine;
  }

  function rendreSpa(j, iso) {
    return cadeau({
      iso,
      indice: j.indice,
      revele: () => h('div', { class: 'revele' },
        h('img', { class: 'spa-photo', src: j.src, alt: 'Un spa' }),
        h('p', { class: 'spa-texte', text: j.texte }),
        h('p', { class: 'bon-mention', text: 'À utiliser quand on se retrouve.' }))
    });
  }

  function rendreCadeau(j, iso) {
    return cadeau({
      iso,
      revele: () => h('div', { class: 'ticket-scene' },
        h('div', { class: 'ticket' },
          h('div', { class: 'ticket-cadre' },
            h('p', { class: 'ticket-texte', text: j.texte }),
            coeurSvg('coeur-svg'))))
    });
  }

  const RENDUS = {
    texte: rendreTexte,
    question: rendreQuestion,
    photo: rendrePhoto,
    bon: rendreBon,
    pochette: rendrePochette,
    recette: rendreRecette,
    quiz: rendreQuiz,
    vraifaux: rendreVraiFaux,
    lieu: rendreLieu,
    pendu: rendrePendu,
    enigme: rendreEnigme,
    rebus: rendreRebus,
    spa: rendreSpa,
    cadeau: rendreCadeau
  };

  /* ───────── Mode test : 5 tapes rapides sur le titre ───────── */

  let tapes = [];
  $('#titre').addEventListener('click', () => {
    const maintenant = Date.now();
    tapes = tapes.filter((t) => maintenant - t < 5000).concat(maintenant);
    if (tapes.length >= 5) { tapes = []; demanderCode(); }
  });

  function demanderCode() {
    const message = h('p', { class: 'message', role: 'status' });
    const input = h('input', { type: 'password', autocomplete: 'off', placeholder: 'Code', 'aria-label': 'Code secret' });
    const form = h('form', {
      class: 'reponse',
      onsubmit: (e) => {
        e.preventDefault();
        if (input.value.trim() === C.codeTest) {
          modeTest = true;
          stock.ecrire('avent-test', '1');
          fermerFenetre(false);
          toast('Mode test activé.');
        } else {
          message.textContent = 'Ce n\'est pas le bon code.';
        }
      }
    }, input, h('button', { type: 'submit', class: 'bouton' }, 'OK'));
    montrerFenetre('Mode test', h('div', null, h('p', { class: 'note', text: 'Entre le code pour tout déverrouiller sur cet appareil.' }), form, message));
    setTimeout(() => input.focus(), 50);
  }

  $('#quitter-test').addEventListener('click', () => {
    modeTest = false;
    stock.effacer('avent-test');
    if (params.has('date')) { location.search = ''; return; }
    afficherGrille();
    toast('Mode test désactivé.');
  });

  /* ───────── Code d'accès : rien ne s'affiche sans lui ───────── */

  const normCode = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '');

  function ouvrirCalendrier() {
    document.body.classList.remove('verrouille');
    afficherGrille();
  }

  function afficherPorte() {
    document.body.classList.add('verrouille');
    const message = h('p', { class: 'message', role: 'status' });
    const input = h('input', { type: 'password', id: 'code-acces', autocomplete: 'off', placeholder: 'Code', 'aria-label': 'Code' });
    const porte = h('section', { class: 'porte' },
      h('h1', { text: 'Jusqu\'à Noël' }),
      h('p', { text: 'Entre le code que je t\'ai donné.' }),
      h('form', {
        class: 'reponse',
        onsubmit: (e) => {
          e.preventDefault();
          if (normCode(input.value) === normCode(C.codeAcces)) {
            stock.ecrire('avent-acces', normCode(C.codeAcces));
            porte.remove();
            ouvrirCalendrier();
          } else {
            message.textContent = 'Ce n\'est pas le bon code.';
            input.select();
          }
        }
      }, input, h('button', { type: 'submit', class: 'bouton' }, 'Entrer')),
      message);
    document.body.append(porte);
    input.focus();
  }

  // Le code est retenu sur l'appareil ; s'il change dans contenu.js, il est redemandé.
  if (!C.codeAcces || stock.lire('avent-acces') === normCode(C.codeAcces)) ouvrirCalendrier();
  else afficherPorte();
})();
