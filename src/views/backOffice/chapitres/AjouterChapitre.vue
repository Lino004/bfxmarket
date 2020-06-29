<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Ajout d'un chapitre</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          class="mr-2"
          :to="{
            name: 'back-office-liste-chapitres',
          }">
          Annuler
        </v-btn>
        <v-btn
          small
          color="primary"
          @click="addChapitre"
          :loading="isLoad">
          Enregistrer
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-select
          v-model="formationSelect"
          :items="formations"
          item-text="titre"
          item-value="id"
          hide-details
          outlined
          expanded
          label="Choisissez une formation"
          class="mb-2"
          dark
        ></v-select>
        <v-select
          v-model="moduleSelect"
          :items="getModule"
          item-text="titre"
          item-value="id"
          hide-details
          outlined
          expanded
          label="Choisissez une module"
          class="mb-2"
          dark
        ></v-select>
        <v-text-field
          label="Titre du chapitre"
          outlined
          append-icon="card-text"
          v-model="chapitre.titre"
          hide-details
          class="mb-2"
          dark/>
      </v-col>
    </v-row>
    <h3>Contenu detaillé du chapitre</h3>
    <!-- <yimo-vue-editor v-model="chapitre.contenu"></yimo-vue-editor> -->
    <vue-editor v-model="chapitre.contenu"></vue-editor>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
// import YimoVueEditor from 'yimo-vue-editor';
import SnackComp from '@/components/site/general/SnackComp.vue';
import { createChapitre } from '@/api/chapitres/index';
import { listeFormation } from '@/api/formations/index';
import { listeModule } from '@/api/modules/index';

export default {
  components: {
    SnackComp,
    VueEditor,
    // YimoVueEditor,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      chapitre: {
        titre: '',
        contenu: '',
        is_lock: false,
      },
      isLoad: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
      ],
      formations: [],
      formationSelect: 3,
      modules: [],
      moduleSelect: 1,
    };
  },
  computed: {
    getModule() {
      if (!this.modules.length) return [];
      return this.modules.filter(el => el.formation.id === this.formationSelect);
    },
  },
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async addChapitre() {
      this.isLoad = true;
      try {
        if (this.chapitre.titre && this.chapitre.contenu) {
          // this.chapitre.formation = this.formationSelect;
          this.chapitre.module = this.moduleSelect;
          await createChapitre(this.chapitre);
          this.showSnackComp('Enregistrement réussi', 'success');
          this.$router.push({ name: 'back-office-liste-chapitres' });
        } else {
          this.showSnackComp('Il y a des éléments manquant', 'error');
        }
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async getListFormation() {
      this.isLoad = true;
      try {
        this.formations = (await listeFormation()).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.formations.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async getListModule() {
      this.isLoad = true;
      try {
        this.modules = (await listeModule()).data;
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.modules.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getListFormation();
    await this.getListModule();
  },
  destroyed() {},
};
</script>

<style>

</style>
