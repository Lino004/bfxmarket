<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Modification page FAQ</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary"
          @click="dialog = true">
          Ajouter
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="faqs"
      :items-per-page="10"
      class="elevation-1 mt-4"
    >
      <template v-slot:item.numero="{ item }">
        {{getNumeroFaq(item.id)}}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          fab
          dark
          small
          color="green"
          @click="modif(item)">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.modifier="{ item }">
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
    <v-dialog
      width="500"
      v-model="dialog"
      persistent>
      <v-card>
        <v-card-title
          class="headline bg-blue-grad"
          primary-title
        >
          {{isUpdate ? 'Modifier' : 'Ajouter'}} une FAQ
        </v-card-title>

        <v-card-text class="pa-5">
          <v-text-field
            label="Titre"
            outlined
            append-icon="format-title"
            v-model="faq.titre"/>
          <v-textarea
            label="Contenu"
            outlined
            v-model="faq.content"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="init()"
          >
            Annuler
          </v-btn>
          <v-btn
            color="primary"
            @click="add"
          >
            {{isUpdate ? 'Modifier' : 'Ajouter'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
import { v1 as uuidv1 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
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
      faq: {
        titre: '',
        content: '',
      },
      faqs: [],
      ref: 'page/faq/',
      headers: [
        { text: 'N° du FAQ', value: 'numero', width: 150 },
        { text: 'Titre', value: 'titre' },
        { text: 'Actions', value: 'actions', width: 80 },
        { text: 'Modifier', value: 'modifier', width: 80 },
      ],
      dialog: false,
      isUpdate: false,
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    get() {
      db.ref(this.ref).on('value', (snap) => {
        if (snap.val()) {
          this.faqs = Object.values(snap.val());
        } else {
          this.faqs = [];
        }
      });
    },
    getNumeroFaq(id) {
      return this.faqs.map(el => el.id).indexOf(id) + 1;
    },
    add() {
      if (this.faq.titre && this.faq.content) {
        let key = uuidv1();
        if (this.faq.id) key = this.faq.id;
        db.ref(this.ref).child(key).set({
          titre: this.faq.titre,
          content: this.faq.content,
          id: key,
        });
        this.init();
      }
    },
    supp(id) {
      console.log(id);
      const result = window.confirm('Etes vous sur de vouloir supprimer cette element?');
      if (result) db.ref(this.ref).child(id).remove();
    },
    modif(faq) {
      this.isUpdate = true;
      this.faq = cloneDeep(faq);
      this.dialog = true;
    },
    init() {
      this.faq.titre = '';
      this.faq.content = '';
      this.isUpdate = false;
      this.dialog = false;
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
