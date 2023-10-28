<script setup>
// logo animé : https://thecodedose.com/blog/animated-handwriting-effect-with-css/

const us = useCounterStore();

const text = ref();

const infoCook = useCookie("info-ouv", {
  maxAge: 3600 * 24 * 2,
  sameSite: "Lax",
  default: () => "true",
});
</script>

<template>

</template>
