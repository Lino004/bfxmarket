<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="formation.titre"/>
     <section>
        <v-container fill-height v-html="formation.contenu">
        </v-container>
        <v-container>
          <v-row justify="space-between">
            <v-col md="3" class="mb-3" v-for="(module, i) in modules" :key="i">
              <CardImg
                :data="module"
                dataBtn="Démarrer le module"
                :index="i"
                @action="startFormation"/>
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
    modules: [
      {
        title: 'Module 1',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
      {
        title: 'Module 2',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
      {
        title: 'Module 3',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
    ],
  }),
  methods: {
    startFormation() {
      return this.$router.push({ name: 'bfx-module', params: { idModule: 1 } });
    },
    async getFormation() {
      this.isLoad = true;
      try {
        const { idFormation } = this.$route.params;
        this.formation = (await getFormation(idFormation)).data;
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
