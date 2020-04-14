<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Ajout d'un module</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          class="mr-2"
          :to="{
            name: 'back-office-liste-modules',
          }">
          Annuler
        </v-btn>
        <v-btn
          small
          color="primary"
          @click="addModule"
          :loading="isLoad">
          Enregistrer
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col
        cols="12"
        sm="3"
      >
        <UploadImg v-model="module.image"/>
      </v-col>
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
      ></v-select>
      <v-text-field
        label="Titre du module"
        outlined
        append-icon="card-text"
        v-model="module.titre"
        hide-details
        class="mb-2"/>
      <vue-editor v-model="module.description" :editor-toolbar="customToolbar"></vue-editor>
      </v-col>
    </v-row>
    <h3>Contenu detaillé du module</h3>
    <vue-editor v-model="module.contenu"></vue-editor>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import SnackComp from '@/components/site/general/SnackComp.vue';
import UploadImg from '@/components/backOffice/general/UploadImg.vue';
import { listeFormation } from '@/api/formations/index';
import { createModule } from '@/api/modules/index';

export default {
  components: {
    SnackComp,
    UploadImg,
    VueEditor,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      module: {
        titre: '',
        niveau: 'test',
        description: '',
        image: {
          code: '',
          ext: '',
        },
        contenu: '',
        is_lock: false,
      },
      isLoad: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
      ],
      formationSelect: 3,
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async addModule() {
      this.isLoad = true;
      try {
        if (this.module.titre && this.module.description
            && this.module.contenu && this.module.image.code) {
          this.module.formation = this.formationSelect;
          await createModule(this.module);
          this.showSnackComp('Enregistrement réussi', 'success');
          this.$router.push({ name: 'back-office-liste-modules' });
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
        this.formations = (await listeFormation()).data.map((el) => {
          const data = {
            id: el.id,
            titre: el.titre,
          };
          return data;
        });
        /* eslint no-param-reassign: ["error", { "props": false }] */
        this.formations.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getListFormation();
  },
  destroyed() {},
};
</script>

<style>

</style>
