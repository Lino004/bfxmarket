<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Souscription"/>
    <v-container class="d-flex justify-center">
      <v-card width="100%" max-width="800px">
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
        >
          <v-tab
            v-for="item in items"
            :key="item.tab"
            @click.prevent=""
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
            <component :is="item.component"
                       :chapitres="chapitres"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import Parrainage from '@/components/site/souscription/Parrainage.vue';
import FaireUnDon from '@/components/site/souscription/FaireUnDon.vue';
import { listeChapitre } from '@/api/chapitres/index';
import { mapGetters } from 'vuex';

export default {
  components: { PageTitle, Parrainage, FaireUnDon },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Souscription',
        disabled: true,
      },
    ],
    tab: null,
    items: [
      { tab: 'Souscription par parrainage', component: 'Parrainage' },
      /* { tab: 'Faire un don', component: '' }, */
    ],
    chapitres: [],
    isLoad: false,
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
    ]),
  },
  methods: {
    async getList() {
      this.isLoad = true;
      try {
        this.chapitres = (await listeChapitre()).data;
        this.chapitres.sort((a, b) => a.id - b.id);
        this.chapitres = this.chapitres.filter(el => !this.listeSouscript.includes(el.id));
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
