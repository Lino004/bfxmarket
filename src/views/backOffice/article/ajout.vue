<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Ajout d'un article</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          class="mr-2"
          :to="{
            name: 'back-office-liste-article',
          }">
          Annuler
        </v-btn>
        <v-btn
          small
          color="primary"
          @click="addArticle"
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
        <UploadImg v-model="article.image"/>
      </v-col>
      <v-col>
      <v-text-field
        label="Titre de la article"
        outlined
        append-icon="card-text"
        v-model="article.titre"
        hide-details
        class="mb-2"/>
      <!-- <v-textarea
        label="Description de la article"
        outlined
        v-model="article.description"
        hide-details
      ></v-textarea> -->
      <vue-editor v-model="article.description" :editor-toolbar="customToolbar"></vue-editor>
      </v-col>
    </v-row>
    <h3>Contenu detaillé de la article</h3>
    <vue-editor v-model="article.contenu"></vue-editor>

    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import cloneDeep from 'lodash/cloneDeep';
import SnackComp from '@/components/site/general/SnackComp.vue';
import UploadImg from '@/components/backOffice/general/UploadImg.vue';
import { createArticle, getArticle, updateArticle } from '@/api/blog/index';
import { BASE_HOST } from '@/api/config/config';

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
      article: {
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
      loading: false,
      base: BASE_HOST,
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async addArticle() {
      this.isLoad = true;
      try {
        if (this.article.titre && this.article.description
            && this.article.contenu && this.article.image.src) {
          if (this.$route.params.id) {
            const dataClone = cloneDeep(this.article);
            const { id } = dataClone;
            delete dataClone.id;
            if (dataClone.image.src.includes(this.base)) delete dataClone.image;
            await updateArticle(id, dataClone);
          } else {
            await createArticle(this.article);
          }
          this.showSnackComp('Enregistrement réussi', 'success');
          this.$router.push({ name: 'back-office-liste-article' });
        } else {
          this.showSnackComp('Il y a des éléments manquant', 'error');
        }
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async getArticle() {
      this.loading = true;
      this.article = (await getArticle(this.$route.params.id)).data;
      this.article.image = {
        code: '',
        ext: '',
        src: `${this.base}${this.article.image}`,
      };
      this.loading = false;
    },
  },
  async mounted() {
    if (this.$route.params.id) await this.getArticle();
  },
  destroyed() {},
};
</script>

<style>

</style>
