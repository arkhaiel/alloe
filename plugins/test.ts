function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(SecretPiniaPlugin)
})