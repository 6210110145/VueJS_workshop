<template>
  <v-app id="main" :style="{background: $vuetify.theme.themes[theme].background}">
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  data: () => ({
    //
  }),
};
</script>
