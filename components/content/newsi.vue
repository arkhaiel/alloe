<template>
    <div>Coucou tout le monde</div>
    <UTable :rows="rows" :columns="cols">
    <template #date-data="{ row }">{{ useDateFormat(row.date, 'DD-MM-YYYY').value }}</template>
    <template #text-data="{ row }"><p class="whitespace-normal text-justify" v-html="row.text"></p></template>
    </UTable>
    <pre>{{ navigation }}</pre>
</template>

<script setup>
const { navigation } = useContent()
const rows = navigation.value[0].children
const cols = [{
  key: 'date',
  label: 'date'
}, {
  key: 'title',
  label: 'info'
}]
</script>