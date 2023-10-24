<template>
  <UContainer>
    <UTable :rows="rows" :columns="cols" :sort="{ column: 'date', direction: 'desc' }">
      <template #date-data="{ row }">{{
        useDateFormat(row.date, "DD-MM-YYYY").value.replaceAll("-", "/")
      }}</template>
      <template #title-data="{ row }"
        ><UButton
          :label="row.title"
          :to="'/news' + row._path"
          variant="link"
          class="whitespace-normal"
      /></template>
    </UTable>
  </UContainer>
</template>

<script setup>
definePageMeta({
  documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  },
});

const { navigation } = useContent();
const rows = navigation.value.filter((el) => !el.children);

const cols = [
  {
    key: "date",
    label: "date",
  },
  {
    key: "title",
    label: "info",
  },
];
</script>
