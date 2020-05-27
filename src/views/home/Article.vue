<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="article.titre" :image="article.image.src"/>
     <section>
      <v-container fill-height>
        <div
          style="width: 100%;"
          class="noselect"
          v-html="article.contenu"
          @contextmenu.prevent="noContextMenu"></div>
      </v-container>
     </section>
     <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { getArticle } from '@/api/blog/index';
import { BASE_HOST } from '@/api/config/config';

export default {
  components: { PageTitle },
  data: () => ({
    article: {
      titre: '',
      description: '',
      image: {
        code: '',
        ext: '',
      },
      contenu: '',
      is_lock: false,
    },
    base: BASE_HOST,
    loading: false,
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
    async getArticle() {
      this.loading = true;
      this.article = (await getArticle(this.$route.params.id)).data;
      this.article.image = {
        code: '',
        ext: '',
        src: `${this.base}${this.article.image}`,
      };
      this.loading = false;
    },
    noContextMenu() {
      return false;
    },
  },
  async mounted() {
    await this.getArticle();
  },
};
</script>

<style>

</style>
