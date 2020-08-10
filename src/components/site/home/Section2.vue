<template>
  <section>
    <!-- <v-layout
      column
      wrap
      class="py-10"
      align-center
    >
      <v-flex xs12 sm4 class="my-4">
        <div class="text-center" v-animate-css="'fadeInDown'">
          <h2 class="headline font-weight-bold">
            Devenez rentable sur les marchés financiers grace aux 3 formations offertes
          </h2>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-row justify="space-between">
            <v-col md="3" class="mb-3" v-for="(formation, i) in listeFormation" :key="i">
              <CardImg
                :data="formation"
                :index="i"
                dataBtn="Débuter la formation"
                @action="$router.push({
                  name: 'bfx-formation',
                  params: {
                    idFormation: formation.id
                  }
                })"/>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout> -->
    <v-container class="my-5">
      <v-main class="text-justify">
        <strong>WFxSchool</strong> est une école de trading. Elle est fondée par des traders
        professionnels prêt à mettre à votre disposition des notions et
        connaissances de trading appris après des années de rentabilité
        sur les marchés.
      </v-main>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Nos Objectifs</h1>
      <v-row justify="center">
        <v-col cols="12" sm="4">
          <v-img src="@/assets/img/nos-objectifs.jpg" height="200"></v-img>
        </v-col>
        <v-col cols="12" sm="6" class="text-justify">
          <ul>
            <li>
              Vous aidez à faire fortune grâce au trading à travers les
              formations que nous vous offrons. Et ceci que vous soyez,
              amateur, débutant ou professionnel.
            </li>
            <li class="my-2">
              Révolutionner financièrement toute l’Afrique à travers les
              formations sur le trading sans frais (gratuit)
            </li>
            <li>
              Permettre aux démunis de pouvoir apprendre le trading et
              en faire une source de revenu
            </li>
          </ul>
          Comme nous le prônons,
          <span class="font-italic">‘’Personne n’évolue seule et nul n’a
          le droit d’être heureux tout seul’’</span>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
/* import { mapGetters } from 'vuex';
import { listeFormation } from '@/api/formations/index';
import { BASE_HOST } from '@/api/config/config';
import CardImg from '@/components/site/general/CardImg.vue';

export default {
  components: { CardImg },
  data() {
    return {
      listeFormation: [],
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    async getList() {
      this.isLoad = true;
      try {
        this.listeFormation = (await listeFormation()).data;
        eslint no-param-reassign: ["error", { "props": false }]
        this.listeFormation.forEach((el) => {
          el.active = el.is_lock && this.user;
          el.img = `${BASE_HOST}${el.image}`;
          el.content = el.description;
          el.title = el.titre;
        });
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
}; */
</script>

<style>

</style>
