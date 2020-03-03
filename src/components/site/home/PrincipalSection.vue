<template>
  <section>
    <v-parallax :src="''" height="700">
      <v-layout
        align-end
        justify-center
        align-center
        class="white--text"
      >
        <v-card color="transparent"
                class="white--text"
                width="300"
                flat
                v-animate-css="'fadeInLeft'">
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
        <img :src="require('@/assets/img/screen.webp')"
             height="500"
             class="d-none d-sm-flex"
             v-animate-css="'fadeInRight'">
      </v-layout>
    </v-parallax>
    <div class="elementor-shape-bottom" data-negative="false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          class="fill-white"
          opacity="0.33"
          d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,
            0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,
            4.7S492.4,59,473,67.3z"/>
        <path
          class="fill-white"
          opacity="0.66"
          d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,
            0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,
            775.7,67.3,734,67.3z"/>
        <path
          class="fill-white"
          d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,
            44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"/>
      </svg>
    </div>
  </section>
</template>

<script>

export default {
  components: {},
};
</script>

<style>

</style>
