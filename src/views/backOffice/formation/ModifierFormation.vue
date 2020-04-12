<template>
  <div style="width: 100%" class="ma-3" v-if="formation">
    <v-row >
      <v-col>
        <h2>Modifier une formation</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          class="mr-2"
          :to="{
            name: 'back-office-liste-formation',
          }">
          Annuler
        </v-btn>
        <v-btn
          small
          color="primary"
          @click="updateFormation"
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
        <UploadImg v-model="formation.image"/>
      </v-col>
      <v-col>
      <v-text-field
        label="Titre de la formation"
        outlined
        append-icon="card-text"
        v-model="formation.titre"
        hide-details
        class="mb-2"/>
      <v-textarea
        label="Description de la formation"
        outlined
        v-model="formation.description"
        hide-details
      ></v-textarea>
      </v-col>
    </v-row>
    <h3>Contenu detaillé de la formation</h3>
    <vue-editor v-model="formation.contenu"></vue-editor>
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
import { updateFormation, getFormation } from '@/api/formations/index';
import { BASE_HOST } from '@/api/config/config';
import cloneDeep from 'lodash/cloneDeep';

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
      base: BASE_HOST,
      formation: {
        image: {
          code: '',
          ext: '',
        },
      },
      isLoad: false,
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async updateFormation() {
      this.isLoad = true;
      try {
        if (this.formation.titre && this.formation.description
            && this.formation.contenu) {
          const dataClone = cloneDeep(this.formation);
          const { id } = dataClone;
          delete dataClone.id;
          if (dataClone.image.src.includes(this.base)) delete dataClone.image;
          await updateFormation(id, dataClone);
          this.showSnackComp('Enregistrement réussi', 'success');
          this.$router.push({ name: 'back-office-liste-formation' });
        } else {
          this.showSnackComp('Il y a des éléments manquant', 'error');
        }
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async getFormation() {
      this.isLoad = true;
      try {
        const { id } = this.$route.params;
        this.formation = (await getFormation(id)).data;
        this.formation.image = {
          code: '',
          ext: '',
          src: `${this.base}${this.formation.image}`,
        };
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getFormation();
  },
  destroyed() {},
};
</script>

<style>

</style>
