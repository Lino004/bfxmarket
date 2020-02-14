<template>
  <section>
    <v-parallax :src="require('@/assets/bg001.png')" height="600">
      <v-layout
        align-end
        justify-center
        align-center
        class="white--text"
      >
        <v-card color="transparent"
                class="white--text"
                width="300"
                flat>
          <!-- <v-img
            :src="require('@/assets/logo.png')"
            class="mr-5"
            contain
            height="200"/> -->
          <h1 class="white--text mb-2 display-1">
            Blue FxMarket <br> Incorporation
          </h1>
          <p>
            TRADEZ LES MARCHES FINANCIERS EN COPIANT LES SIGNAUX DONNES PAR NOTRE
            EQUIPE D'EXPERTS EN ANALYSE TECHNIQUE DANS NOTRE CANAL PUBLIC SUR TELEGRAM!
          </p>
        </v-card>
        <img :src="require('@/assets/screen.webp')" height="500" class="d-none d-sm-flex">
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
