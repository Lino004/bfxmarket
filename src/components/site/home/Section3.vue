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
      <h1 class="text-center" v-animate-css="'fadeInDown'">Nos services</h1>
      <!-- <v-row class="my-5">
        <v-col cols="12" sm="4" >
          <CardAction
            titre="Initiation au trading"
            description="Apprenez les b-a-ba du trading, comprenez comment
              fonctionne le marché et devenez rentable en quatre semaines.
              L’une des meilleures formations par lesquelles débuter."
            libelle-btn="Débuter la formation"
            :index="0"
            :is-lock="false"
            @action="$router.push({
              name: 'bfx-module',
              params: { idModule: 2 }
            })"/>
        </v-col>
        <v-col cols="12" sm="4" >
          <CardAction
            titre="Formation Débutant"
            description="Prédire les quatre mouvements du marché"
            libelle-btn="Débuter la formation"
            :index="1"
            :is-lock="true"
            @action="$router.push({
              name: 'bfx-module',
              params: { idModule: 3 }
            })"/>
        </v-col>
        <v-col cols="12" sm="4" >
          <CardAction
            titre="Formation Avancée"
            description="En cours"
            libelle-btn="Débuter la formation"
            :index="2"
            :is-lock="true"
            @action="$router.push({
              name: 'bfx-module',
              params: { idModule: 4 }
            })"/>
        </v-col>
      </v-row> -->
    </v-container>
    <v-container>
      <v-row justify="space-between">
        <v-col md="4" class="mb-3" v-for="(m, i) in modules" :key="i">
          <CardImg
            :data="m"
            dataBtn="Débuter la formation"
            :index="i"
            @action="startModule(m.id)"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import CardAction from '@/components/site/general/CardAction.vue';
import CardImg from '@/components/site/general/CardImg.vue';
import { listeModuleByFormation } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import { mapGetters } from 'vuex';

export default {
  components: { /* CardAction, */ CardImg },
  data: () => ({
    page: {
      content: '',
      resume: '',
    },
    ref: 'page/',
    modules: [],
    isLoad: false,
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
    ]),
  },
  methods: {
    async getData() {
      this.isLoad = true;
      try {
        const modulesRes = (await listeModuleByFormation(9)).data;
        const reqs = [];
        modulesRes.forEach((el) => {
          reqs.push(listeChapitreByModule(el.id));
        });
        /* eslint no-param-reassign: ["error", { "props": false }] */
        modulesRes.forEach((el) => {
          el.active = el.is_lock;
          el.img = `${BASE_HOST}${el.image}`;
          el.content = el.description;
          el.title = el.titre;
        });
        const resps = await Promise.all(reqs);
        for (let index = 0; index < resps.length; index += 1) {
          modulesRes[index].chaps = resps[index].data;
        }
        modulesRes.forEach((m) => {
          const tab = [];
          m.chaps.forEach((chap) => {
            tab.push(this.listeSouscript.includes(chap.id));
          });
          m.is_finish = tab.every(el => el === true);
        });
        modulesRes.sort((a, b) => a.id - b.id);
        for (let index = 0; index < modulesRes.length; index += 1) {
          if (index === 0) modulesRes[index].to_continue = true;
          if (index) {
            const presIndex = index - 1;
            modulesRes[index].to_continue = modulesRes[presIndex].is_finish;
          }
        }
        this.modules = modulesRes;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    startModule(id) {
      this.$router.push({ name: 'bfx-module', params: { idModule: id } });
    },
  },
  async mounted() {
    await this.getData();
  },
  destroyed() {
    // db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
