/*
  Tout le texte du calendrier est ici.
  Pour modifier une case : cherche sa date (ex. "2026-11-03") et change le texte entre guillemets.
  Les emplacements à remplir commencent par « À COMPLÉTER ».
*/
window.CONTENU = {

  // Code à donner pour voir le calendrier (majuscules, accents et espaces ignorés).
  codeAcces: "crepe",

  // Code secret du mode test (tape 5 fois vite sur le titre « Jusqu'à Noël »).
  codeTest: "lulu-test",

  jours: {

    /* ───────────── NOVEMBRE ───────────── */

    "2026-11-01": { type: "texte", texte: "C'est parti pour un voyage jusqu'à Noël ! Rendez-vous ici tous les jours.", suite: "Mon amour, je t'aime très fort, j'espère que ce calendrier va te plaire" },

    "2026-11-02": { type: "question", texte: "Quelle est ta plus belle photo de l'année sur ton téléphone ?" },

    "2026-11-03": { type: "photo", src: "photo/photo_mardi_1.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-11-04": {
      type: "pendu",
      mot: "COUETTE",
      indice: "Mon mélange préféré entre deux mots",
      reussite: "Couette, tu as trouvé !!",
      echec: "Raté… mais c'était couette",
      explication: "Cool + chouette = couette."
    },

    "2026-11-05": {
      type: "quiz",
      titre: "Quiz cinéma : les comédies cultes françaises",
      questions: [
        { q: "Qui joue OSS 117 dans « Le Caire, nid d'espions » ?",
          choix: ["Jean Dujardin", "Gérard Jugnot", "Jean Reno", "Clovis Cornillac"], bonnes: [0],
          explication: "Jean Dujardin, dans le rôle de sa vie." },
        { q: "Quel groupe est à l'origine de « La Cité de la peur » ?",
          choix: ["Les Inconnus", "Les Nuls", "Les Robins des Bois", "Le Splendid"], bonnes: [1],
          explication: "Les Nuls : Alain Chabat, Chantal Lauby et Dominique Farrugia." },
        { q: "Où se déroule l'intrigue de « La Cité de la peur » ?",
          choix: ["Au Festival de Cannes", "À Deauville", "À Avoriaz", "À Cabourg"], bonnes: [0],
          explication: "Pendant le Festival de Cannes, où les projections tournent très mal." },
        { q: "Comment s'appelle le personnage de Jean Dujardin dans « OSS 117 » ?",
          choix: ["Hubert Bonisseur de La Bath", "Hector de Montcalm", "Hugo Bellefontaine", "Henri de Saint-Clair"], bonnes: [0],
          explication: "Hubert Bonisseur de La Bath, rien que ça." },
        { q: "Qui joue Fernand dans « Les Tontons flingueurs » ?",
          choix: ["Jean Gabin", "Lino Ventura", "Bourvil", "Louis de Funès"], bonnes: [1],
          explication: "Lino Ventura, alias Fernand Naudin." }
      ]
    },

    "2026-11-06": { type: "bon", titre: "Un petit-déj au lit" },

    "2026-11-07": {
      type: "vraifaux",
      titre: "Vrai ou faux : la bouffe",
      questions: [
        { q: "Les Mayas et les Aztèques buvaient déjà du cacao.", vrai: true,
          explication: "Mais amer, et pas du tout sucré." },
        { q: "Le miel peut se conserver quasiment indéfiniment.", vrai: true,
          explication: "Tant qu'il est bien fermé, à l'abri de l'humidité." },
        { q: "Botaniquement, la tomate est un légume.", vrai: false,
          explication: "C'est un fruit !" },
        { q: "Botaniquement, la banane est une baie, et pas la fraise.", vrai: true,
          explication: "La fraise est un « faux fruit » : ses vrais fruits, ce sont les petits grains dessus." },
        { q: "La Chandeleur, le jour des crêpes, a lieu le 2 février.", vrai: true,
          explication: "Le 2 février, jour officiel des crêpes." }
      ]
    },

    "2026-11-08": { type: "pochette", numero: 1, indice: "Une pause gourmande" },

    "2026-11-09": { type: "question", defi: true, texte: "Fais-moi deviner un film que tu penses que je connais, en 3 emojis." },

    "2026-11-10": { type: "photo", src: "photo/photo_mardi_2.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-11-11": {
      type: "quiz",
      titre: "Qu'est-ce que je préfère ? La bouffe",
      questions: [
        { q: "Quelle est ma boisson préférée ?",
          choix: ["Un thé", "Un jus de fruit", "Un chocolat chaud Caotina", "Un grand verre d'eau"], bonnes: [2],
          explication: "Un Caotina, toujours." },
        { q: "Mon snack préféré à 16 h ?",
          choix: ["Un carré de chocolat", "Un fruit", "Un gâteau"], bonnes: [0, 1],
          explication: "Chocolat ou fruit, les deux me vont." },
        { q: "Côté cuisine, je suis plutôt…",
          choix: ["Cheffe étoilée", "La recette à la lettre", "Au feeling, on verra bien", "Livraison"], bonnes: [2],
          explication: "Au feeling. Et en général, ça se mange !" }
      ]
    },

    "2026-11-12": {
      type: "vraifaux",
      titre: "Vrai ou faux : les animaux",
      questions: [
        { q: "Les poulpes ont trois cœurs.", vrai: true,
          explication: "Deux pour les branchies, un pour le reste du corps." },
        { q: "Les chats ne perçoivent pas le goût sucré.", vrai: true,
          explication: "Il leur manque le récepteur du sucré." },
        { q: "Les autruches enfouissent leur tête dans le sable.", vrai: false,
          explication: "C'est un mythe." },
        { q: "Les chauves-souris sont aveugles.", vrai: false,
          explication: "Elles voient, et s'orientent aussi par écholocation." },
        { q: "Les dauphins dorment avec la moitié du cerveau éveillée.", vrai: true,
          explication: "Une moitié se repose pendant que l'autre veille." }
      ]
    },

    "2026-11-13": { type: "bon", titre: "Je cuisine ce que tu veux" },

    "2026-11-14": {
      type: "recette",
      titre: "Pudding de chia framboise",
      note: "À préparer la veille au soir : lance-le ce soir, et tu le dégustes demain.",
      portions: "Pour 1 portion",
      ingredients: [
        "3 c. à soupe de graines de chia",
        "250 ml de lait ou de boisson végétale",
        "100 g de framboises (fraîches ou surgelées)"
      ],
      etapes: [
        "Mélange le chia et le lait.",
        "Laisse reposer 10 minutes, puis remélange.",
        "Couvre et mets au frigo pour la nuit.",
        "Ajoute les framboises au moment de servir."
      ]
    },

    "2026-11-15": { type: "pochette", numero: 2, indice: "Pour avoir la tête bien en place" },

    "2026-11-16": { type: "question", texte: "Quel pays ou quelle ville tu rêves de visiter ?" },

    "2026-11-17": { type: "photo", src: "photo/photo_mardi_3.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-11-18": {
      type: "lieu",
      src: "photo/photo_lieu_1.jpeg"
    },

    "2026-11-19": {
      type: "quiz",
      titre: "Quiz cinéma : Kaamelott et Mission Cléopâtre",
      questions: [
        { q: "« C'est pas faux. » Qui dit ça dans Kaamelott ?",
          choix: ["Perceval", "Karadoc", "Léodagan", "Lancelot"], bonnes: [0],
          explication: "Perceval, sa réponse à tout ce qu'il ne comprend pas." },
        { q: "« Le gras, c'est la vie. » Qui dit ça ?",
          choix: ["Perceval", "Karadoc", "Bohort", "Arthur"], bonnes: [1],
          explication: "Karadoc, grand philosophe de la nourriture." },
        { q: "Dans « Mission Cléopâtre », quel pari fait Cléopâtre à César ?",
          choix: ["Construire un palais en 3 mois", "Traverser le désert en une semaine", "Gagner un concours de cuisine", "Faire taire Obélix"], bonnes: [0],
          explication: "Un palais en trois mois, d'où l'appel à Numérobis." },
        { q: "Qui a réalisé « Mission Cléopâtre » et joue aussi César ?",
          choix: ["Christian Clavier", "Alain Chabat", "Gérard Depardieu", "Jamel Debbouze"], bonnes: [1],
          explication: "Alain Chabat, devant et derrière la caméra." },
        { q: "Qui joue Cléopâtre dans le film ?",
          choix: ["Monica Bellucci", "Audrey Fleurot", "Laetitia Casta", "Sophie Marceau"], bonnes: [0],
          explication: "Monica Bellucci." }
      ]
    },

    "2026-11-20": { type: "bon", titre: "Un resto ou un brunch, c'est toi qui choisis" },

    "2026-11-21": {
      type: "enigme",
      indices: ["Je tombe sans me faire mal.", "Je suis blanche et légère.", "Je fonds au soleil."],
      reponse: "neige",
      reussite: "Bien joué, c'est la neige !"
    },

    "2026-11-22": { type: "pochette", numero: 3, indice: "Ça fond, mais pas dans les mains" },

    "2026-11-23": { type: "question", defi: true, texte: "Fais-moi deviner une série que tu penses que je connais, en 3 emojis." },

    "2026-11-24": { type: "photo", src: "photo/photo_mardi_4.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-11-25": {
      type: "quiz",
      titre: "Qu'est-ce que je préfère ? Les petites habitudes",
      questions: [
        { q: "Quand je rentre chez moi, la première chose que je fais ?",
          choix: ["Me jeter sur le canapé", "Ouvrir le frigo", "Aller au sport", "Me mettre en pyjama"], bonnes: [0, 2],
          explication: "Canapé ou sport : ça dépend de la journée." },
        { q: "Mon week-end idéal ?",
          choix: ["Sport", "Couture", "Film et plaid", "Balade en montagne"], bonnes: [0, 1],
          explication: "Sport et couture, mon combo parfait." },
        { q: "En vacances, je suis plutôt…",
          choix: ["Itinéraire planifié à la minute", "À l'aventure", "Sieste non-stop", "Toujours un plan sportif"], bonnes: [2, 3],
          explication: "Sieste ou plan sportif, jamais entre les deux." }
      ]
    },

    "2026-11-26": {
      type: "vraifaux",
      titre: "Vrai ou faux : culture générale",
      questions: [
        { q: "La tour Eiffel peut grandir de quelques centimètres en été.", vrai: true,
          explication: "Le métal se dilate avec la chaleur." },
        { q: "La Grande Muraille de Chine est visible à l'œil nu depuis l'espace.", vrai: false,
          explication: "Elle est très longue, mais bien trop étroite." },
        { q: "Le mont Blanc est le plus haut sommet des Alpes.", vrai: true,
          explication: "Environ 4 800 mètres." },
        { q: "Sydney est la capitale de l'Australie.", vrai: false,
          explication: "C'est Canberra." },
        { q: "La foudre ne frappe jamais deux fois au même endroit.", vrai: false,
          explication: "Elle peut frapper plusieurs fois le même endroit, surtout les points hauts." }
      ]
    },

    "2026-11-27": { type: "bon", titre: "Un câlin illimité, valable à tout moment" },

    "2026-11-28": {
      type: "recette",
      titre: "Poêlée de poulet et champignons à la crème",
      portions: "Pour 2 personnes",
      ingredients: [
        "2 blancs de poulet (environ 300 g)",
        "250 g de champignons de Paris",
        "1 oignon ou 2 échalotes",
        "15 à 20 cl de crème",
        "Huile ou beurre",
        "Sel, poivre"
      ],
      etapes: [
        "Coupe le poulet en morceaux et fais-le dorer à la poêle.",
        "Ajoute l'oignon, puis les champignons émincés. Laisse cuire 10 minutes.",
        "Verse la crème et laisse mijoter 5 minutes.",
        "Sale et poivre."
      ]
    },

    "2026-11-29": {
      type: "spa",
      indice: "Une demi-journée où on ne fait rien, et c'est fait exprès",
      src: "photo/photo_spa.jpeg",
      texte: "Une demi-journée spa en amoureux"
    },

    "2026-11-30": { type: "question", texte: "Un truc que tu veux absolument faire cet hiver ?" },

    /* ───────────── DÉCEMBRE ───────────── */

    "2026-12-01": { type: "photo", src: "photo/photo_mardi_5.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-12-02": {
      type: "lieu",
      src: "photo/photo_lieu_2.jpeg"
    },

    "2026-12-03": {
      type: "quiz",
      titre: "Quiz de Noël n°1",
      questions: [
        { q: "Combien de rennes tirent le traîneau du Père Noël, sans compter Rudolph ?",
          choix: ["6", "8", "9", "12"], bonnes: [1],
          explication: "Huit, et Rudolph devant pour éclairer la route." },
        { q: "Quel dessert traditionnel de Provence compte 13 versions pour Noël ?",
          choix: ["Les 13 desserts", "La galette des rois", "La tarte tropézienne", "Les calissons"], bonnes: [0],
          explication: "Les 13 desserts, servis le soir du 24." },
        { q: "Dans quel film Kevin McCallister se retrouve-t-il seul à la maison ?",
          choix: ["Maman, j'ai raté l'avion", "Le Grinch", "Elfe", "Love Actually"], bonnes: [0],
          explication: "Maman, j'ai raté l'avion, le classique." },
        { q: "De quelle langue vient le chant de Noël « Stille Nacht » (« Douce nuit ») ?",
          choix: ["Du suédois", "De l'allemand", "De l'anglais", "Du néerlandais"], bonnes: [1],
          explication: "Il a été écrit en allemand, en Autriche." },
        { q: "Le Père Noël s'inspire de saint Nicolas, un évêque qui vivait dans l'actuelle…",
          choix: ["Italie", "Turquie", "Finlande", "Pologne"], bonnes: [1],
          explication: "Il était évêque de Myre, dans l'actuelle Turquie." }
      ]
    },

    "2026-12-04": { type: "bon", titre: "Une soirée film et chocolat chaud" },

    "2026-12-05": {
      type: "recette",
      titre: "Chocolat chaud maison",
      portions: "Pour 1 tasse",
      ingredients: [
        "250 ml de lait",
        "40 g de chocolat noir (70 % ou plus)",
        "Une pincée de cannelle (facultatif)"
      ],
      etapes: [
        "Fais chauffer le lait sans le faire bouillir.",
        "Ajoute le chocolat en morceaux.",
        "Remue jusqu'à ce qu'il soit fondu."
      ],
      astuce: "Vérifie sur l'étiquette que le chocolat est bien sans gluten."
    },

    "2026-12-06": { type: "pochette", numero: 4, indice: "Fait par des abeilles (très travailleuses)" },

    "2026-12-07": { type: "question", defi: true, texte: "Envoie-moi un selfie avec ta tasse préférée." },

    "2026-12-08": { type: "photo", src: "photo/photo_mardi_6.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-12-09": {
      type: "quiz",
      titre: "Qu'est-ce que je préfère ? Nous deux",
      questions: [
        { q: "Qui a envoyé le premier message ?",
          choix: ["Moi", "Toi", "Un ami en commun", "Personne, on s'est croisés"], bonnes: [0],
          explication: "C'est moi. Je dis ça, je dis rien." },
        { q: "Le premier endroit où nous sommes sortis ?",
          choix: ["À l'opéra", "Au parc", "À Cultura", "Au bowling"], bonnes: [0],
          explication: "À l'opéra, pas mal pour une première sortie." },
        { q: "La phrase que je dis le plus souvent ?",
          choix: ["« J'ai faim »", "« Cinq minutes, j'arrive »", "« Je répète encore un peu »", "« C'est pas ma faute »"], bonnes: [0],
          explication: "« J'ai faim ». Tu le savais." }
      ]
    },

    "2026-12-10": {
      type: "quiz",
      titre: "Quiz cinéma : les citations de Kaamelott",
      questions: [
        { q: "« Moi j'ai appris à lire, ben je souhaite ça à personne. » Qui dit ça ?",
          choix: ["Léodagan", "Arthur", "Perceval", "Karadoc"], bonnes: [0],
          explication: "C'est Léodagan." },
        { q: "« C'est l'histoire d'un petit ourson qui s'appelle Arthur. » Qui la raconte ?",
          choix: ["Arthur", "Merlin", "Perceval", "Père Blaise"], bonnes: [0],
          explication: "C'est Arthur qui la raconte." },
        { q: "« …d'animal plus dangereux que le lapin adulte ! » Qui dit ça ?",
          choix: ["Bohort", "Perceval", "Lancelot", "Yvain"], bonnes: [0],
          explication: "Bohort, qui a très peur des lapins." },
        { q: "Qui joue Perceval ?",
          choix: ["Franck Pitiot", "Jean-Christophe Hembert", "Nicolas Gabion", "Alexandre Astier"], bonnes: [0],
          explication: "Franck Pitiot." },
        { q: "Qui joue le roi Arthur ?",
          choix: ["Alexandre Astier", "Lionnel Astier", "Simon Astier", "Guillaume Briat"], bonnes: [0],
          explication: "Alexandre Astier, qui a aussi créé la série." }
      ]
    },

    "2026-12-11": { type: "bon", titre: "Un massage de 20 minutes" },

    "2026-12-12": {
      type: "vraifaux",
      titre: "Vrai ou faux : l'hiver et les fêtes",
      questions: [
        { q: "Tous les flocons de neige ont six branches.", vrai: true,
          explication: "Leur structure est hexagonale, même si leurs formes varient beaucoup." },
        { q: "C'est Coca-Cola qui a inventé le Père Noël en rouge.", vrai: false,
          explication: "Il était déjà représenté en rouge bien avant." },
        { q: "Les bois des rennes tombent et repoussent chaque année.", vrai: true,
          explication: "Ils repoussent tous les ans." },
        { q: "Le calendrier de l'Avent vient d'Allemagne.", vrai: true,
          explication: "Il est né en Allemagne." },
        { q: "Le sapin de Noël décoré est une tradition venue d'Alsace et d'Allemagne.", vrai: true,
          explication: "On en trouve des traces en Alsace il y a déjà plusieurs siècles." }
      ]
    },

    "2026-12-13": { type: "pochette", numero: 5, indice: "Jamais deux sans trois" },

    "2026-12-14": { type: "question", texte: "Si tu pouvais passer Noël n'importe où, ce serait où ?" },

    "2026-12-15": { type: "photo", src: "photo/photo_mardi_7.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-12-16": {
      type: "lieu",
      src: "photo/photo_lieu_3.jpeg"
    },

    "2026-12-17": { type: "bon", titre: "Un repas de Noël de ton choix, fait avec amour" },

    "2026-12-18": { type: "bon", titre: "Un bain chaud préparé" },

    "2026-12-19": {
      type: "quiz",
      titre: "Quiz de Noël n°2",
      questions: [
        { q: "Dans quel pays mange-t-on traditionnellement du KFC à Noël ?",
          choix: ["Au Japon", "En Allemagne", "Au Canada", "En Islande"], bonnes: [0],
          explication: "Au Japon, le menu KFC de Noël se réserve à l'avance." },
        { q: "Comment s'appelle le renne au nez rouge ?",
          choix: ["Rudolph", "Dasher", "Comet", "Blitzen"], bonnes: [0],
          explication: "Rudolph, évidemment." },
        { q: "Quelle plante rouge appelle-t-on « étoile de Noël » ?",
          choix: ["Le houx", "Le gui", "Le poinsettia", "Le cyclamen"], bonnes: [2],
          explication: "Le poinsettia, avec ses grandes feuilles rouges." },
        { q: "Qui est à l'origine de « L'Étrange Noël de monsieur Jack » ?",
          choix: ["Tim Burton", "Walt Disney", "Steven Spielberg", "Wes Anderson"], bonnes: [0],
          explication: "Une idée de Tim Burton, réalisée par Henry Selick." },
        { q: "Dans quel pays est née la bûche de Noël ?",
          choix: ["En Italie", "En France", "Au Royaume-Uni", "En Suède"], bonnes: [1],
          explication: "En France." }
      ]
    },

    "2026-12-20": { type: "pochette", numero: 6, indice: "Le seul sapin qu'on a le droit de croquer" },

    "2026-12-21": { type: "question", texte: "Quel personnage de film ou de série me ressemble le plus ?" },

    "2026-12-22": { type: "photo", src: "photo/photo_mardi_8.jpeg", legende: "Un petit souvenir de nous 🥰" },

    "2026-12-23": {
      type: "rebus",
      emojis: ["🙋", "🫵", "🥞"],
      reponse: "je te crêpe",
      indice: "C'est notre façon de dire quelque chose de tendre",
      delaiIndiceMinutes: 5
    },

    "2026-12-24": { type: "cadeau", texte: "Un week-end en amoureux" }
  }
};
