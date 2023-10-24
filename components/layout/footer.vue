<script setup></script>

<template>
  <div class="header w-full mt-4 flex flex-row items-center justify-around">
    <div class="flex flex-row gap-4">
      <UButton
        variant="ghost"
        size="2xs"
        color="gray"
        label="Site réalisé par M. NICOLAS"
        to="mailto:mathieu@alloe.fr"
      />
      <UButton variant="ghost" size="2xs" color="gray" label="CGU" to="/cgu" />
    </div>
  </div>
</template>

<style scoped>
.titre {
  font-size: 2rem;
  flex-grow: 1;
}
</style>
