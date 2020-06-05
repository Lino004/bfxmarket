<template>
  <section class="white">
    <!-- <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row align="center" class="fill-height">
            <v-col class="text-center">
              <p class="mb-0">
                {{page.resume}}
              </p>
              <v-btn
                small
                color="bg-blue-grad my-2"
                :to="{ name: 'bfx-faisons' }">
                En savoir plus
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="d-none d-sm-flex">
          <v-row justify="center" class="fill-height">
            <v-img src="https://image.flaticon.com/icons/png/512/32/32441.png" max-width="250"></v-img>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->
    <v-container>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Nos formations</h1>
      <v-row class="my-5">
        <v-col cols="12" sm="4" >
          <CardAction
            titre="Formation Débutant"
            description="Apprenez les b-a-ba du trading, comprenez comment
              fonctionne le marché et devenez rentable en quatre semaines.
              L’une des meilleures formations par lesquelles débuter."
            libelle-btn="Débuter la formation"
            :index="0"
            :is-lock="false"
            @action="$router.push({
              name: 'bfx-formation',
              params: { idFormation: 9 }
            })"/>
        </v-col>
        <v-col cols="12" sm="4" >
          <CardAction
            titre="Formation Avancée"
            description="Prédire les quatre mouvements du marché"
            libelle-btn="Débuter la formation"
            :index="1"
            :is-lock="true"
            @action="$router.push({
              name: 'bfx-formation',
              params: { idFormation: 10 }
            })"/>
        </v-col>
        <v-col cols="12" sm="4" >
          <CardAction
            titre="A B C  Stratégie"
            description="En cours"
            libelle-btn="Débuter la formation"
            :index="2"
            :is-lock="true"
            @action="$router.push({
              name: 'bfx-formation',
              params: { idFormation: 11 }
            })"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import db from '@/plugins/firebase';
import CardAction from '@/components/site/general/CardAction.vue';

export default {
  components: { CardAction },
  data: () => ({
    page: {
      content: '',
      resume: '',
    },
    ref: 'page/',
  }),
  methods: {
    /* get() {
      const key = 'que-faisons-nous';
      db.ref(this.ref).orderByKey().equalTo(key).once('value')
        .then((snap) => {
          this.page = snap.val()[key];
        });
    }, */
  },
  mounted() {
    // this.get();
  },
  destroyed() {
    // db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
