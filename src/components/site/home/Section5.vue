<template>
  <section>
    <v-container>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Témoignages</h1>
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        height="100%"
      >
        <v-carousel-item
          v-for="(comment, i) in liste"
          :key="i"
        >
          <v-sheet height="100%" color="transparent">
            <v-row
              class="fill-height black--text"
              align="center"
              justify="center"
            >
            <div class="mx-5">
              <h3 class="text-cente"> {{comment.user_name}} </h3>
              <div v-html="comment.contenu"></div>
            </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item v-if="!liste.length">
          <v-sheet height="100%" color="transparent">
            <v-row
              class="fill-height black--text"
              align="center"
              justify="center"
            >
            <div class="mx-5">
              <div>Aucun témoignage</div>
            </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { listeComment } from '@/api/comment/index';

export default {
  components: { },
  data: () => ({
    liste: [],
  }),
  computed: {
    ...mapGetters([
      'userStatus',
    ]),
  },
  methods: {
    async listeComment() {
      const liste = (await listeComment()).data;
      this.liste = liste.filter(el => el.is_validate);
    },
  },
  async mounted() {
    await this.listeComment();
  },
};
</script>

<style>

</style>
