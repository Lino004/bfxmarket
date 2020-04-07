<template>
  <div style="width: 100%" class="ma-3">
    <h2>Reglage de la page d'accueil</h2>
    <v-divider></v-divider>
    <Slide/>
    <ContactInfo/>
  </div>
</template>

<script>
import Slide from '@/components/backOffice/configPageAccueil/Slide.vue';
import ContactInfo from '@/components/backOffice/configPageAccueil/ContactInfo.vue';

export default {
  components: {
    Slide,
    ContactInfo,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  destroyed() {},
};
</script>

<style>

</style>
