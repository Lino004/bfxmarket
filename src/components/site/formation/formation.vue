<template>
  <div>
     <!-- <PageTitle :breadcrumbs="breadcrumbs" :title="formation.titre"
       v-if="formation.titre === 'Waves'"/> -->
     <v-img :src="formation.image" height="400"/>
     <section>
        <v-container fill-height>
          <div v-html="formation.contenu"></div>
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
    </div>
</template>

<script>
// import PageTitle from '@/components/site/general/PageTitle.vue';
import CardImg from '@/components/site/general/CardImg.vue';
import { getFormation } from '@/api/formations/index';
import { listeModuleByFormation } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import { mapGetters } from 'vuex';

export default {
  components: { /* PageTitle, */ CardImg },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Formation',
        disabled: true,
      },
    ],
    formation: {},
    modules: [],
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
    ]),
  },
  methods: {
    startModule(id) {
      this.$router.push({ name: 'bfx-module', params: { idModule: id } });
    },
    async getFormation() {
      this.isLoad = true;
      try {
        const { idFormation } = this.$route.params;
        this.formation = (await getFormation(idFormation)).data;
        this.formation.image = `${BASE_HOST}${this.formation.image}`;
        const modulesRes = (await listeModuleByFormation(this.formation.id)).data;
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
  },
  async mounted() {
    await this.getFormation();
  },
};
</script>

<style>

</style>
