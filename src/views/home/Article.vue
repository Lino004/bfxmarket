<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="article.titre"/>
     <section>
      <v-container fill-height>
        <div
          style="width: 100%;"
          class="noselect"
          v-html="article.contenu"
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

export default {
  components: { PageTitle },
  data: () => ({
    article: {
      titre: 'Titre article',
      contenu: 'Contenu de l\'article',
    },
    isLoad: false,
  }),
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Accueil',
          disabled: false,
          to: '/',
        },
        {
          text: 'Blog',
          disabled: false,
          to: '/home/blog',
        },
        {
          text: 'Article',
          disabled: true,
        },
      ];
    },
  },
  methods: {
    /* async getChapitre() {
      this.isLoad = true;
      try {
        const { idChapitre } = this.$route.params;
        this.chapitre = (await getChapitre(idChapitre)).data;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    }, */
    noContextMenu() {
      return false;
    },
  },
  async mounted() {
    // await this.getChapitre();
  },
};
</script>

<style>

</style>
