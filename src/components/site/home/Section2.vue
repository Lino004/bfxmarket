<template>
  <section>
    <v-layout
      column
      wrap
      class="py-10"
      align-center
    >
      <v-flex xs12 sm4 class="my-4">
        <div class="text-center" v-animate-css="'fadeInDown'">
          <h2 class="headline font-weight-bold">
            Devenez rentable sur les marchés financiers grace aux 3 formations offertes
          </h2>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-row justify="space-between">
            <v-col md="3" class="mb-3" v-for="(formation, i) in listeFormation" :key="i">
              <CardImg
                :data="formation"
                :index="i"
                dataBtn="Débuter la formation"
                @action="$router.push({
                  name: 'bfx-formation',
                  params: {
                    idFormation: formation.id
                  }
                })"/>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { listeFormation } from '@/api/formations/index';
import { BASE_HOST } from '@/api/config/config';
import CardImg from '@/components/site/general/CardImg.vue';

export default {
  components: { CardImg },
  data() {
    return {
      listeFormation: [],
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
    async getList() {
      this.isLoad = true;
      try {
        this.listeFormation = (await listeFormation()).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.listeFormation.forEach((el) => {
          el.active = el.is_lock && this.user;
          el.img = `${BASE_HOST}${el.image}`;
          el.content = el.description;
          el.title = el.titre;
        });
        this.listeFormation.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getList();
  },
};
</script>

<style>

</style>
