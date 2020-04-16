<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="formation.titre"/>
     <section>
        <v-container fill-height v-html="formation.contenu">
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
import { BASE_HOST } from '@/api/config/config';

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
  methods: {
    startModule(id) {
      this.$router.push({ name: 'bfx-module', params: { idModule: id } });
    },
    async getFormation() {
      this.isLoad = true;
      try {
        const { idFormation } = this.$route.params;
        this.formation = (await getFormation(idFormation)).data;
        this.modules = (await listeModuleByFormation(this.formation.id)).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.modules.forEach((el) => {
          el.active = el.is_lock;
          el.img = `${BASE_HOST}${el.image}`;
          el.content = el.description;
          el.title = el.titre;
        });
        this.modules.sort((a, b) => a.id - b.id);
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
