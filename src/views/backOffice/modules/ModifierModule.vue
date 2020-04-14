<template>
  <div style="width: 100%" class="ma-3" v-if="module">
    <v-row >
      <v-col>
        <h2>Modifier une module</h2>
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
          @click="updateModule"
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
      <v-text-field
        label="Titre de la module"
        outlined
        append-icon="card-text"
        v-model="module.titre"
        hide-details
        class="mb-2"/>
      <!-- <v-textarea
        label="Description de la module"
        outlined
        v-model="module.description"
        hide-details
      ></v-textarea> -->
      <vue-editor v-model="module.description" :editor-toolbar="customToolbar"></vue-editor>
      </v-col>
    </v-row>
    <h3>Contenu detaillé de la module</h3>
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
import { updateModule, getModule } from '@/api/modules/index';
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
      module: {
        image: {
          code: '',
          ext: '',
        },
      },
      isLoad: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
      ],
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async updateModule() {
      this.isLoad = true;
      try {
        if (this.module.titre && this.module.description
            && this.module.contenu) {
          const dataClone = cloneDeep(this.module);
          const { id } = dataClone;
          delete dataClone.id;
          if (dataClone.image.src.includes(this.base)) delete dataClone.image;
          await updateModule(id, dataClone);
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
    async getModule() {
      this.isLoad = true;
      try {
        const { id } = this.$route.params;
        this.module = (await getModule(id)).data;
        this.module.image = {
          code: '',
          ext: '',
          src: `${this.base}${this.module.image}`,
        };
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getModule();
  },
  destroyed() {},
};
</script>

<style>

</style>
