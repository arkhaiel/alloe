<template>
  <div class="gradient" />
  <ULandingHero :links="page.hero.links" :ui="{ wrapper: 'py-10 sm:py-16 md:py-24' }">
    <template #headline>
    <UButton variant="soft" label="v1.0 : Voir les changements" to="/changelog" />
    </template>
    <template #title>
      <span v-html="page.hero.title" />
    </template>

    <template #description>
      <span v-html="page.hero.description" />
    </template>
  </ULandingHero>
  <ULandingSection :ui="{ wrapper: 'py-10 sm:py-16', title: 'sm:text-xl lg:text-xl text-md font-normal'}" headline="lire et écrire" title="Des histoires dont vous êtes le héros">
  <ULandingGrid>
    <ULandingCard
        v-for="(card, index) of page.features"
        :key="index"
        v-bind="card"
        class="col-span-4">
    <div class="flex flex-row justify-around">
      <UButton variant="outline" v-for="l of card.links" :label="l.label" :to="l.to" />
    </div>
    </ULandingCard>
  </ULandingGrid>
  </ULandingSection>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'landing'
})

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

</script>

<style>
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(50% 50% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.2;
  z-index: -1;
}
</style>

