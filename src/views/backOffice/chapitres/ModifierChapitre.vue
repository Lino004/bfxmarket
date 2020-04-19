<template>
  <div style="width: 100%" class="ma-3" v-if="chapitre">
    <v-row >
      <v-col>
        <h2>Modifier une chapitre</h2>
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
          @click="updateChapitre"
          :loading="isLoad">
          Enregistrer
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="8">
        <v-text-field
          label="Titre de la chapitre"
          outlined
          append-icon="card-text"
          v-model="chapitre.titre"
          hide-details
          class="mb-2"/>
      </v-col>
      <v-col>
        <v-text-field
          label="Cout du chapitre en $"
          outlined
          append-icon="card-text"
          v-model="chapitre.price"
          hide-details
          type="number"
          class="mb-2"/>
      </v-col>
      <v-col>
        <v-text-field
          label="Nbr de pers à parrainer"
          outlined
          append-icon="card-text"
          v-model="chapitre.downline"
          hide-details
          type="number"
          class="mb-2"/>
      </v-col>
    </v-row>
    <h3>Contenu detaillé de la chapitre</h3>
    <yimo-vue-editor v-model="chapitre.contenu" :config="editorConfig"></yimo-vue-editor>
    <!-- <vue-editor v-model="chapitre.contenu"></vue-editor> -->
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
/* import { VueEditor } from 'vue2-editor'; */
import YimoVueEditor from 'yimo-vue-editor';
import SnackComp from '@/components/site/general/SnackComp.vue';
import { updateChapitre, getChapitre } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import cloneDeep from 'lodash/cloneDeep';

export default {
  components: {
    SnackComp,
    /* VueEditor, */
    YimoVueEditor,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      base: BASE_HOST,
      chapitre: {},
      isLoad: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
      ],
      editorConfig: {
        printLog: false,
        hideLinkImg: false,
        // ie9不支持跨域
        uploadImgUrl: null, // 'http://localhost:2233/api/upload?isIe9=' + isIe9,
        menus: [
          'source',
          '|',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'unorderlist',
          'orderlist',
          'alignleft',
          'aligncenter',
          'alignright',
          '|',
          'link',
          'unlink',
          'table',
          // 'emotion',
          '|',
          'img',
          'video',
          'insertcode',
          '|',
          'undo',
          'redo',
          'fullscreen',
        ],
      },
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async updateChapitre() {
      this.isLoad = true;
      try {
        if (this.chapitre.titre && this.chapitre.contenu) {
          const dataClone = cloneDeep(this.chapitre);
          const { id } = dataClone;
          delete dataClone.id;
          if (dataClone.image.src.includes(this.base)) delete dataClone.image;
          await updateChapitre(id, dataClone);
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
    async getChapitre() {
      this.isLoad = true;
      try {
        const { id } = this.$route.params;
        this.chapitre = (await getChapitre(id)).data;
        this.chapitre.image = {
          code: '',
          ext: '',
          src: `${this.base}${this.chapitre.image}`,
        };
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getChapitre();
  },
  destroyed() {},
};
</script>

<style>

</style>
