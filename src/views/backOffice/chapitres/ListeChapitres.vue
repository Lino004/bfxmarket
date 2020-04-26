<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Liste des chapitres </h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary"
          :to="{
            name: 'back-office-ajout-chapitre',
          }">
          Ajouter
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      class="elevation-1 mt-4"
      :headers="headers"
      :items="chapitres"
      :items-per-page="10"
      :loading="isLoad">
      <template v-slot:item.price="{ item }">
        {{item.price}} $
      </template>
      <template v-slot:item.status="{ item }">
        <v-btn
          fab
          dark
          small
          :color="item.is_lock ? 'green' : 'red'"
          @click="uploadIsLock(item)">
          <v-icon dark> {{item.is_lock ? 'mdi-lock-open' : 'mdi-lock'}} </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.modifier="{ item }">
        <v-btn
          fab
          dark
          small
          color="green"
          :to="{
            name: 'back-office-modifier-chapitre',
            params: {
              id: item.id
            }
          }">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.supprimer="{ item }">
        <v-btn
          fab
          dark
          small
          color="red"
          @click="supp(item.id)">
          <v-icon dark>mdi-delete</v-icon>
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
import SnackComp from '@/components/site/general/SnackComp.vue';
import { listeChapitre, deleteChapitre, updateChapitre } from '@/api/chapitres/index';
import cloneDeep from 'lodash/cloneDeep';

export default {
  components: {
    SnackComp,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      chapitres: [],
      isLoad: false,
      headers: [
        { text: 'Titre', value: 'titre' },
        { text: 'Nbr de pers. à parrainer', value: 'downline', width: 80 },
        { text: 'Prix', value: 'price', width: 80 },
        { text: 'Status', value: 'status', width: 80 },
        { text: 'Modifier', value: 'modifier', width: 80 },
        { text: 'Supprimer', value: 'supprimer', width: 80 },
      ],
      expanded: [],
      singleExpand: false,
      formations: [],
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async getList() {
      this.isLoad = true;
      try {
        this.chapitres = (await listeChapitre()).data;
        this.chapitres.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async supp(id) {
      await deleteChapitre(id);
      await this.getList();
    },
    async uploadIsLock(data) {
      const dataClone = cloneDeep(data);
      const { id } = dataClone;
      await updateChapitre(id, {
        ...dataClone,
        is_lock: !dataClone.is_lock,
      });
      await this.getList();
    },
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style>

</style>
