// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/index.css"],
  devtools: { enabled: true },
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
});
