<template>
  <section>
    <v-parallax :src="require('@/assets/bg2.jpg')" height="380">
      <v-layout column align-center justify-center>
        <div class="headline white--text mb-4 text-center">
          Web development has never been easier
        </div>
        <em>Kick-start your application today</em>
        <v-btn
          class="mt-12"
          color="blue lighten-2"
          dark
          large
          href="/pre-made-themes"
        >
          Get Started
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
export default {

};
</script>

<style>

</style>
