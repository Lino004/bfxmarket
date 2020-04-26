<template>
  <section class="white">
    <Bande position="right" title="Nos Tarifs"/>
    <v-container class="my-4">
      <div>
        Nos formations sont offertes gratuitement selon les conditions suivantes :
        <li>
          <strong>Formation d’initiation :</strong> Gratuit
          <v-btn color="bg-blue-grad" small :to="{ name: 'bfx-guide' }">
            Cliquer ici pour commencer
          </v-btn>
        </li>
        <li>
          <strong>Formation débutante :</strong>
          Pour déverrouiller chacun des chapitres de la
          formation débutante, vous aurez à parrainer une à trois personnes ou
          faire un don qui varie entre 5 à 15 dollars.
        </li>
        <li>
          <strong>Formation Avancée :</strong>
          Pour avoir accès à chacune des leçons de la formation,
          il vous faudra parrainer deux personnes ou faire un don de 10 dollars.
        </li>
        <li>
          <strong>Formation Professionnelle :</strong> disponible en janvier 2021.
        </li>
      </div>
    </v-container>
  </section>
</template>

<script>
import Bande from '@/components/site/general/Bande.vue';

export default {
  components: { Bande },
  data: () => ({}),
  methods: {},
  mounted() {},
  destroyed() {},
};
</script>

<style>

</style>
