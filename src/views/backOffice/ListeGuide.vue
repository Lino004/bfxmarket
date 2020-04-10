<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Liste des chapitre du "Guide de l'étudiant"</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary"
          :to="{
            name: 'back-office-add-chap-guide-trading',
          }">
          Ajouter
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="chaps"
      :items-per-page="10"
      class="elevation-1 mt-4"
    >
      <template v-slot:item.numero="{ item }">
        {{getNumeroChap(item.id)}}
      </template>
      <template v-slot:item.ouvrir="{ item }">
        <v-btn
          fab
          dark
          small
          color="primary"
          :to="{
            name: 'back-office-modif-chap-guide-trading',
            params: {
              id: item.id
            }
          }">
          <v-icon dark>mdi-open-in-new</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    SnackComp,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      chaps: [],
      ref: 'page/',
      headers: [
        { text: 'N° du chapitre', value: 'numero', width: 150 },
        { text: 'Titre', value: 'titre' },
        { text: 'Ouvrire', value: 'ouvrir', width: 150 },
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
    async get() {
      try {
        const key = 'guide';
        const responce = await db.ref(this.ref).orderByKey().equalTo(key).once('value');
        this.chaps = Object.values(responce.val()[key]);
      } catch (error) {
        this.chaps = [];
      }
    },
    getNumeroChap(id) {
      return this.chaps.map(el => el.id).indexOf(id) + 1;
    },
  },
  async mounted() {
    await this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
