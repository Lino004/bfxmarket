<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="chapitre.titre"/>
     <section>
      <v-container fill-height>
        <div
          style="width: 100%;"
          class="noselect"
          v-html="chapitre.contenu"
          @contextmenu.prevent="noContextMenu"></div>
      </v-container>
     </section>
     <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { getChapitre } from '@/api/chapitres/index';

export default {
  components: { PageTitle },
  data: () => ({
    chapitre: {},
    isLoad: false,
  }),
  computed: {
    breadcrumbs() {
      // const { idModule, idFormation } = this.$route.params;
      return [
        {
          text: 'Accueil',
          disabled: false,
          to: '/',
        },
        /* {
          text: 'Formation',
          disabled: false,
          to: `/home/formation/${idFormation}`,
        },
        {
          text: 'Module',
          disabled: false,
          to: `/home/formation/${idFormation}/module/${idModule}`,
        }, */
        {
          text: 'Chapitre',
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async getChapitre() {
      this.isLoad = true;
      try {
        const { idChapitre } = this.$route.params;
        this.chapitre = (await getChapitre(idChapitre)).data;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    noContextMenu() {
      return false;
    },
  },
  async mounted() {
    await this.getChapitre();
  },
};
</script>

<style>

</style>
