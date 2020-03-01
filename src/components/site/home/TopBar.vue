<template>
  <v-app-bar color="primary" fixed>
    <v-container mx-auto py-0>
      <v-layout align-center>
        <v-img
          :src="require('@/assets/img/logo-white.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"/>
      </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn
      v-for="(link, i) in links"
      :key="i"
      :to="link.to"
      text
      small
      color="primary"
      class="ml-0 hidden-sm-and-down">
      <span class="white--text">{{ link.text }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: 'Accueil',
          to: '/',
        },
      ],
    };
  },
};
</script>

<style>

</style>
