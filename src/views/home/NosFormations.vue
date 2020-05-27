<template>
  <div>
    <v-img src="@/assets/img/nos-formations.jpg" height="400"></v-img>
     <!-- <PageTitle :breadcrumbs="breadcrumbs" title="Nos formations"/> -->
     <section>
        <v-container fill-height>
          <div>
            Pour avoir accès à chacun des chapitres de nos formations,
            deux méthodes sont disponibles.
            <strong>Parrainer</strong>
            un nombre de personnes ou faire un
            <strong>don minimal de 5$</strong>. Ce don sera utilisé pour
            maintenir le site en activité afin de mieux vous servir.
          </div>
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
                :is-lock="false"
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
  </div>
</template>

<script>
// import PageTitle from '@/components/site/general/PageTitle.vue';
import { mapGetters } from 'vuex';
import CardAction from '@/components/site/general/CardAction.vue';
import { listeFormation } from '@/api/formations/index';
// import { BASE_HOST } from '@/api/config/config';

export default {
  components: { /* PageTitle, */ CardAction },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Nos formations',
        disabled: true,
      },
    ],
    listeFormation: [],
  }),
  computed: {
    ...mapGetters([
      'userStatus',
    ]),
  },
  methods: {
    async getList() {
      this.isLoad = true;
      try {
        this.listeFormation = (await listeFormation()).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        /* this.listeFormation.forEach((el) => {
          el.active = el.is_lock && this.user;
          el.img = `${BASE_HOST}${el.image}`;
          el.content = el.description;
          el.title = el.titre;
        }); */
        this.listeFormation.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style>

</style>
