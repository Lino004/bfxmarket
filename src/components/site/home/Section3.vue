<template>
  <section class="white">
    <v-container>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Nos services</h1>
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
import CardImg from '@/components/site/general/CardImg.vue';
import { listeModuleByFormation } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import { mapGetters } from 'vuex';

export default {
  components: { CardImg },
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
        this.modules = modulesRes.map(el => ({
          ...el,
          active: el.is_lock,
          img: `${BASE_HOST}${el.image}`,
          content: el.description,
          title: el.titre,
        }));
        const resps = await Promise.all(reqs);
        for (let index = 0; index < resps.length; index += 1) {
          this.modules[index].chaps = resps[index].data;
        }
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.modules.forEach((m) => {
          const tab = [];
          m.chaps.forEach((chap) => {
            tab.push(this.listeSouscript.includes(chap.id));
          });
          m.is_finish = tab.every(el => el === true);
        });
        this.modules.sort((a, b) => a.id - b.id);
        for (let index = 0; index < this.modules.length; index += 1) {
          if (index === 0) this.modules[index].to_continue = true;
          if (index) {
            const presIndex = index - 1;
            this.modules[index].to_continue = this.modules[presIndex].is_finish;
          }
          if (index === 2) this.modules[index].to_continue = this.modules[index].is_finish;
        }
        // this.modules = modulesRes;
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
  destroyed() {},
};
</script>

<style>

</style>
