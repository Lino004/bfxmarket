<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="module.titre"/>
     <section>
        <v-container fill-height>
          <div v-html="module.contenu"></div>
        </v-container>
        <v-container>
          <v-list shaped class="pa-0">
            <v-subheader class="px-0">Nos chapitres: </v-subheader>
            <v-list-item-group :color="'primary'">
              <v-list-item
                v-for="(chap, i) in chapitres"
                :key="i"
                :disabled="!chap.is_lock"
                class="px-0"
                inactive
              >
                <v-list-item-icon>
                  <v-avatar
                    left
                    class="green white--text"
                    size="30">
                    {{i+1}}
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="chap.titre"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-text="'SOUSCRIRE'"
                    :disabled="!chap.is_lock"
                    color="primary"
                    :to="{ name: 'bfx-souscription' }"
                    v-if="!listeSouscript.includes(chap.id)"/>
                  <v-btn
                    v-text="'OUVRIR'"
                    color="green"
                    :dark="chap.is_lock"
                    :disabled="!chap.is_lock"
                    @click="startChapitre(chap.id)"
                    v-else/>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
     </section>
     <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { getModule } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';
import { mapGetters } from 'vuex';

export default {
  components: { PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      /* {
        text: 'Formation',
        disabled: false,
        to: { name: 'bfx-formation', params: { idModule: 1 } },
      }, */
      {
        text: 'Modules',
        disabled: true,
      },
    ],
    module: {},
    chapitres: [],
    isLoad: false,
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
    ]),
  },
  methods: {
    startChapitre(idChap) {
      if (this.listeSouscript.includes(idChap)) {
        this.$router.push({
          name: 'bfx-chapitre',
          params: {
            idFormation: this.module.formation,
            idModule: this.module.id,
            idChapitre: idChap,
          },
        });
      }
    },
    async getModule() {
      this.isLoad = true;
      try {
        const { idModule } = this.$route.params;
        this.module = (await getModule(idModule)).data;
        this.chapitres = (await listeChapitreByModule(this.module.id)).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.chapitres.forEach((el) => {
          el.active = el.is_lock;
          el.title = el.titre;
        });
        this.chapitres.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getModule();
  },
};
</script>

<style>

</style>
