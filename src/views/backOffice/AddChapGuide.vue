<template>
  <div style="width: 100%" class="ma-3">
    <v-row v-if="$route.params.id">
      <v-col>
        <h2>Chapitre N°{{chap.numero}}: {{chap.titre}}</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn small color="primary" @click="add">Enregistrer</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <h2>Ajouter un chapitre</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn small color="primary" @click="add">Ajouter</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-text-field
      label="Titre du chapitre"
      outlined
      append-icon="card-text"
      v-model="chap.titre"/>
    <vue-editor v-model="chap.content"></vue-editor>
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
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import SnackComp from '@/components/site/general/SnackComp.vue';

moment.locale('fr');

export default {
  components: {
    VueEditor,
    SnackComp,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      chap: {},
      ref: 'page/guide/',
    };
  },
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    add() {
      if (this.chap.titre && this.chap.content) {
        const key = uuidv1();
        db.ref(this.ref).child(key).set({
          titre: this.chap.titre,
          content: this.chap.content,
          id: key,
          date: moment().format('DD/MM/YYYY hh:mm:ss a'),
        });
        this.$router.push({ name: 'back-office-liste-chap-guide-trading' });
      }
    },
  },
};
</script>

<style>

</style>
