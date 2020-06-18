<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="formation.titre"
       v-if="formation.titre === 'Waves'"/>
     <v-img src="@/assets/img/Débutant.jpg" height="400"
       v-if="formation.titre === 'Débutant'"></v-img>
     <v-img src="@/assets/img/Avancé.jpg" height="400"
       v-if="formation.titre === 'Avancé'"></v-img>
     <section>
        <v-container fill-height>
          <div v-html="formation.contenu"></div>
        </v-container>
        <v-container>
          <v-row justify="space-between">
            <v-col md="4" class="mb-3" v-for="(m, i) in modules" :key="i">
              <CardImg
                :data="m"
                dataBtn="Démarrer le module"
                :index="i"
                @action="startModule(m.id)"/>
            </v-col>
          </v-row>
        </v-container>
     </section>
    </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import CardImg from '@/components/site/general/CardImg.vue';
import { getFormation } from '@/api/formations/index';
import { listeModuleByFormation } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import { mapGetters } from 'vuex';

export default {
  components: { PageTitle, CardImg },
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
        const modulesRes = (await listeModuleByFormation(this.formation.id)).data;
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
  },
  async mounted() {
    await this.getFormation();
  },
};
</script>

<style>

</style>
