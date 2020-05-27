<template>
  <div class="liste-article-blog is-invisible-scroll">
    <v-row>
      <v-col>
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line
          placeholder="Recherche..."
          v-model="search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="article in liste"
        :key="article.id"
        cols="12"
        sm="4"
        md="3"
        xl="2"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          v-ripple
          shaped
          elevation="5"
          @click="$router.push({ name: 'bfx-article', params: { id: article.id } })"
        >
          <v-img
            class="white--text align-end"
            height="150px"
            :src="`${base}${article.image}`"
          >
            <div class="pa-2 bg-black-5">
              <h4> {{article.titre}} </h4>
              <p
                class="mb-0 caption d-inline-block text-truncate mod_p"
                style="width: 100%"
                v-html="article.description">
              </p>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
import { listeArticle } from '@/api/blog/index';
import { BASE_HOST } from '@/api/config/config';

export default {
  components: {},
  data() {
    return {
      base: BASE_HOST,
      data: [],
      search: '',
    };
  },
  computed: {
    liste() {
      return this.data.filter(el => el.titre.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    async getList() {
      this.isLoad = true;
      try {
        this.data = (await listeArticle()).data;
        this.data.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    formatDate(date) {
      return moment(date).format('L');
    },
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style lang="css" scoped>

</style>
