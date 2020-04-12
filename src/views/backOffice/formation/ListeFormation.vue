<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Liste des formations</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary"
          :to="{
            name: 'back-office-ajout-formation'
          }">
          Ajouter
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      class="elevation-1 mt-4"
      :headers="headers"
      :items="formations"
      :items-per-page="10"
      :loading="isLoad"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand>
      <template v-slot:item.image="{ item }">
        <v-img :src="`${base}${item.image}`" height="50" width="50"></v-img>
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
            name: 'back-office-modifier-formation',
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
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            class="elevation-1 mt-4"
            :headers="headers"
            :items="formations"
            :items-per-page="10"
            :loading="isLoad"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
            hide-default-footer>
            <template v-slot:item.image="{ item }">
              <v-img :src="`${base}${item.image}`" height="50" width="50"></v-img>
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
                  name: 'back-office-modifier-formation',
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
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">More info about {{ item.name }}</td>
            </template>
          </v-data-table>
        </td>
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
import { listeFormation, deleteFormation, updateFormation } from '@/api/formations/index';
import cloneDeep from 'lodash/cloneDeep';
import { BASE_HOST } from '@/api/config/config';

export default {
  components: {
    SnackComp,
  },
  data() {
    return {
      valueSnack: false,
      base: BASE_HOST,
      colorSnack: '',
      message: '',
      formations: [],
      isLoad: false,
      headers: [
        { text: 'Image', value: 'image', width: 100 },
        { text: 'Titre', value: 'titre' },
        { text: 'Status', value: 'status', width: 80 },
        { text: 'Modifier', value: 'modifier', width: 80 },
        { text: 'Supprimer', value: 'supprimer', width: 80 },
        { text: '', value: 'data-table-expand' },
      ],
      expanded: [],
      singleExpand: false,
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
        this.formations = (await listeFormation()).data;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async supp(id) {
      await deleteFormation(id);
      await this.getList();
    },
    async uploadIsLock(data) {
      const dataClone = cloneDeep(data);
      const { id } = dataClone;
      await updateFormation(id, {
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
