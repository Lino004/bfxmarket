<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="module.titre"/>
     <section>
        <v-container fill-height>
          <div v-html="module.contenu"></div>
        </v-container>
        <v-container class="pb-5">
          <v-list class="pa-0" v-if="chapitres.length">
            <v-subheader class="px-0">Nos chapitres:</v-subheader>
            <v-list-item-group>
              <v-divider></v-divider>
              <v-list-item
                v-for="(chap, i) in liste"
                :key="i"
                :disabled="!chap.is_lock"
                class="px-0"
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
                  <v-list-item-subtitle>
                    <div>
                      <strong v-if="chap.downline">
                        Parrainer
                        {{chap.downline}} pers.
                      </strong>
                      {{chap.downline && chap.price ? 'ou' : ''}}
                      <strong v-if="chap.price">{{text}} {{chap.price}} $</strong>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <ModalSouscription
                    v-if="!listeSouscript.includes(chap.id)"
                    :chap="chap"
                    :id-module="module.id"/>
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
import { mapGetters, mapActions } from 'vuex';
import ModalSouscription from '@/components/site/formation/souscription.vue';

export default {
  components: {
    PageTitle,
    ModalSouscription,
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Modules',
        disabled: true,
      },
    ],
    module: {},
    chapitres: [],
    liste: [],
    isLoad: false,
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
      'user',
    ]),
    text() {
      if (this.module.formation.id === 10) return 'Payer';
      return 'Faire un don de';
    },
  },
  methods: {
    ...mapActions([
      'getUser',
    ]),
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
        await this.getUser();
        this.module = (await getModule(idModule)).data;
        this.chapitres = (await listeChapitreByModule(this.module.id)).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.chapitres.forEach((el) => {
          el.active = el.is_lock;
          el.title = el.titre;
          el.contenu = null;
          el.idFormation = el.module.formation.id;
          el.module = null;
        });
        this.chapitres.sort((a, b) => a.id - b.id);
        // this.liste = this.listeChap();
        const lastIndexChapSouscrit = this.chapitres
          .findIndex(el => !this.listeSouscript.includes(el.id));
        if (lastIndexChapSouscrit === -1) this.liste = this.chapitres;
        else {
          let lastIndex = lastIndexChapSouscrit + 1;
          if (lastIndex === this.chapitres.length + 1) {
            lastIndex = lastIndexChapSouscrit;
          }
          this.liste = this.chapitres.slice(0, lastIndex);
        }
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
        throw error;
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
