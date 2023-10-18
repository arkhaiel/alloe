<template>
  <UContainer>

  </UContainer>
</template>

<script setup>
const rows = ref([])
const add = (date, text) => {
  rows.value.push({
    date: new Date(date.split('/').reverse()),
    text: text
  })
}

add('18/10/2023', "Mise en ligne de la page d'accueil du nouveau site alloé, en prévision de l'évènement de lancement qui commencera le weekend du 28/10.")
add('18/10/2023', "Mise en ligne du site https://48h.alloe.fr qui contient les archives des éditions 2018 à 2022.")

const cols = [{
  key: 'date',
  label: 'date'
}, {
  key: 'text',
  label: 'info'
}]

</script>