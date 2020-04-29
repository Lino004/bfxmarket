<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="module.titre"/>
     <section>
        <v-container fill-height>
          <div v-html="module.contenu"></div>
        </v-container>
        <v-container>
          <v-list shaped class="pa-0" v-if="chapitres.length">
            <v-subheader class="px-0">Nos chapitres: </v-subheader>
            <v-list-item-group :color="'primary'">
              <v-divider></v-divider>
              <v-list-item
                v-for="(chap, i) in listeChap()"
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
                <v-list-item-content>
                  <div class="my-5">
                    <strong v-if="chap.downline">
                      Parrainer
                      {{chap.downline}} pers.
                    </strong>
                    {{chap.downline && chap.price ? 'ou' : ''}}
                    <strong v-if="chap.price">Faire un don de {{chap.price}} $</strong>
                  </div>
                </v-list-item-content>
                <v-list-item-action style="width: 100px">
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
              <v-divider></v-divider>
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
import cloneDeep from 'lodash/cloneDeep';

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
        this.listeChap();
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    listeChap() {
      const tab = cloneDeep(this.chapitres);
      const i = Math.max(...this.listeSouscript);
      const y = tab.find(el => el.id > i).id;
      return tab.filter(el => el.id <= y);
    },
  },
  async mounted() {
    await this.getModule();
  },
};
</script>

<style>

</style>
