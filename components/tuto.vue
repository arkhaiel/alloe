<template>
  <UCard :ui="{ body: { padding: 'py-0 sm:py-0' }}" class="prose dark:prose-invert prose-h1:text-lg prose-h2:text-base prose-a:no-underline max-w-full m-auto ring-1 rounded-md mb-2 whitespace-pre-wrap text-justify">
<MdComp v-if="tutopage === '/lire'">
# Ici, vous commencez une nouvelle histoire
Le principe est simple, vous avez plusieurs points de départ possibles (pour l'instant, c'est des "challoé" : les propositions sont les bienvenues.)
Chaque challoé est un nouveau "jeu", avec des contraintes. Pour l'instant, il y en a trois :
:u-badge[:u-icon{ name="i-heroicons-arrow-down "} 30]{ color="green" variant="subtle" size="lg"} est la taille "verticale" de l'histoire : quels que soient les choix que vous ferez, l'histoire se terminera en 30 chapitres.
:u-badge[:u-icon{ name="i-heroicons-arrows-right-left"} 4]{ color="blue" variant="subtle" size="lg"} est la taille "horizontale" de l'histoire : pour chaque nouveau chapitre, au maximum 4 choix seront possibles.
:u-badge[:u-icon{ name="i-heroicons-document-text "} ∞]{ color="red" variant="subtle" size="lg"} correspond à une troisième contrainte : le nombre de caractères maximum autorisés pour chaque chapitre : ici c'est infini (enfin, presque).

Deux actions possibles donc : 
- choix d'une première suite à lire : création d'une **histoire** dans votre espace perso, que vous pourrez continuer à lire au fil des écritures des autres 
- écriture d'une suite (s'il reste de la place !) : vous créez dans votre **espace perso** un chapitre, que vous pourrez modifier quand vous le souhaiterez.
</MdComp>

<MdComp v-else-if="tutopage.startsWith('/lire')">
# Ceci est une "histoire" !
Vous voilà donc en train de créer votre propre histoire sur alloé. Parfait ! À chaque fois que vous arriverez en bas d'une lecture, vous aurez plusieurs choix, soit parmi les chapitres déjà écrits par les autres participants, soit parmi les emplacements vides que vous pouvez réserver pour y déposer votre production.
Vous pourrez donc suivre le chemin qui vous semblera le plus intéressant. Si vous voulez revenir en arrière, pas de souci, il y a un bouton qui le permet.

Vous pourrez retrouver cette histoire quand vous voudrez dans votre espace perso :u-button[mes  textes]{to="/mes-textes" variant="soft"}, pour voir comment les autres alloéens l'ont faite évoluer.

(vous pouvez même modifier le titre, pour retrouver l'histoire plus facilement. Remplacez le texte dans l'en-tête, validez avec la touche :u-kbd[Entrée] et c'est fait !)
</MdComp>

<MdComp v-else-if="tutopage === '/mes-textes'">
# Votre espace perso
Vous y trouverez tous vos objets littéraires :
- les histoires que vous êtes en train de lire 
- les chapitres que vous avez écrits
</MdComp>

<MdComp v-else-if="tutopage.startsWith('/ecrire')">
# Écrire un chapitre
Pour écrire ce chapitre, il n'y a pas grand-chose à savoir, à part peut-être ceci : 
- Si vous mettez `*une étoile*` avant et après une phrase, un mot, ils seront transformés *en italique* à l'affichage
- Si vous mettez `**deux étoiles**` avant et après une phrase, un mot, ils seront transformés **en gras** à l'affichage
- Pour commencer un dialogue, écrivez deux tirets : `--` ils seront transformés en tiret cadratin, et chaque nouvelle ligne commencera automatiquement par un tiret cadratin. Si vous laissez une ligne vide, il disparaîtra : fin du dialogue.
</MdComp>

<MdComp v-else-if="false">
# Bienvenue sur alloé !

**28 octobre** est la date de lancement de notre alloé 2023 !
Pour que tout le monde prenne ses marques, nous commencerons avec un seul *challoé*, avec des contraintes simples : 
- quel que soit le chemin choisi, l'histoire sera terminée à la fin du cinquième chapitre
- chaque chapitre pourra avoir 5 suites différentes

*Est-ce qu'un challoé en 5x5 pourrait s'appeler un challoé carré ? bonne question. Est-ce que je suis fatigué ? sûrement.*

--- 

Ce site est pour l'instant en version :u-badge[beta]{variant="subtle"}, ce qui signifie qu'il sera amené à évoluer au fil du temps : des fonctionnalités seront ajoutées, la réactivité sera améliorée, et toutes vos remarques et suggestions sont les bienvenues. Elles sont pour moi primordiales, car elles me permettront de faire évoluer cette plateforme dans la bonne direction : n'hésitez donc pas à m'écrire un petit mail si vous avez des remarques à me faire !

## qu'est-ce qu'on fait ici ?
Le principe est simple et ressemble aux *histoires dont vous êtes le héros* : vous choisissez un *challoé* (le nom reste à confirmer, si vous avez de l'inspiration tenez-moi au courant), on vous propose des suites, vous en choisissez une, ou vous écrivez la vôtre, et ainsi de suite... Tous les textes sont partagés entre les utilisateurs, donc si Alice écrit une suite, Bob pourra la consulter !

## alloé ?
alloé est l'acronyme de "allez, on écrit !" et c'est un évènement qui durant cinq ans nous a rassemblés autour de l'écriture, le temps d'un weekend. Les résultats des années précédentes sont accessibles ici : [48h alloé](https://48h.alloe.fr).

Aujourd'hui, nouvelle aventure avec cette plateforme qui vient de voir le jour. C'est un projet **open-source et complètement gratuit**, et si vous maniez les lignes de code aussi bien que les lignes de texte n'hésitez pas à venir faire un tour sur le dépôt [github](https://github.com/mathieunicolas/alloe) !

## si ça ne marche pas ?
Si vous rencontrez un problème et que vous avez envie de participer à l'amélioration de la plateforme, merci de prendre le temps de m'envoyer un mail pour m'informer de votre mésaventure. Mon adresse mail est [mathieu@alloe.fr](mailto:mathieu@alloe.fr).
</MdComp>
  </UCard>
</template>

<script lang="ts" setup>
defineProps(['tutopage'])
</script>

<style>

</style>

