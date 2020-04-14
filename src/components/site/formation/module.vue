<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="module.titre"/>
     <section>
        <v-container fill-height v-html="module.contenu">
        </v-container>
        <v-container>
          <v-list shaped>
            <v-subheader>Nos chapitres: </v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(chap, i) in chapitres"
                :key="i"
                @click="startChapitre(chap.id)"
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
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
     </section>
    </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { getModule } from '@/api/modules/index';
import { listeChapitreByModule } from '@/api/chapitres/index';

export default {
  components: { PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Formation',
        disabled: false,
        to: { name: 'bfx-formation', params: { idModule: 1 } },
      },
      {
        text: 'Modules',
        disabled: true,
      },
    ],
    module: {},
    chapitres: [],
  }),
  methods: {
    startChapitre(idChap) {
      this.$router.push({
        name: 'bfx-chapitre',
        params: {
          idFormation: this.module.formation,
          idModule: this.module.id,
          idChapitre: idChap,
        },
      });
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
