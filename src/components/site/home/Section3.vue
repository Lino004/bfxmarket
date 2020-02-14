<template>
  <section>
    <v-parallax :src="require('@/assets/bg002.png')" height="380">
      <v-layout column align-center justify-center
      class="my-12">
        <v-row justify="center" align="center">
          <v-col cols="8">
            <div class="headline white--text mb-4 text-center">
              Qui Sommes-Nous?
            </div>
            <p class="text-center d-none d-sm-flex">
              Nous sommes une équipe d'experts en analyse technique des marchés du Forex
              et des Indices et aussi experts en gestion de portefeuille. Nous travaillons
              tous les jours à dénicher les meilleures opportunités rentables sur les marchés
              financiers tout en vous permettant de risquer le moins possible.
            </p>
            <p class="text-center d-sm-none">
              Nous sommes une équipe d'experts en analyse technique des marchés du Forex
              et des Indices et aussi experts en gestion de portefeuille.
            </p>
            <div class="text-center">
              <v-btn
                color="primary"
                @click="setEnDev(true)"
              >
                En savoir plus
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
  },
};
</script>

<style>

</style>
