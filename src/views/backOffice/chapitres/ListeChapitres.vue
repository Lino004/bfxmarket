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
          }"
          v-if="accesActions('a_chap')">
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
      :loading="isLoad"
      :options="{
        sortBy: ['module.id', 'id']
      }">
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
      <!-- <template v-slot:item.supprimer="{ item }">
        <v-btn
          fab
          dark
          small
          color="red"
          @click="supp(item.id)">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template> -->
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
import cloneDeep from 'lodash/cloneDeep';
import { listeChapitre, deleteChapitre, updateChapitre } from '@/api/chapitres/index';
import { accesActions } from '@/configuration/user';

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
      expanded: [],
      singleExpand: false,
      formations: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'Formation',
          value: 'module.titre',
          show: true,
        },
        {
          text: 'Titre',
          value: 'titre',
          show: true,
        },
        {
          text: 'Parrainage',
          value: 'downline',
          width: 120,
          show: true,
        },
        {
          text: 'Prix',
          value: 'price',
          width: 80,
          show: true,
        },
        {
          text: 'Status',
          value: 'status',
          width: 100,
          show: accesActions('m_status_chap'),
        },
        {
          text: 'Modifier',
          value: 'modifier',
          width: 100,
          show: accesActions('m_chap'),
        },
        // { text: 'Supprimer', value: 'supprimer', width: 80 },
      ].filter(el => el.show);
    },
  },
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
      dataClone.module = dataClone.module.id;
      await updateChapitre(id, {
        ...dataClone,
        is_lock: !dataClone.is_lock,
      });
      await this.getList();
    },
    accesActions: name => accesActions(name),
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style>

</style>
