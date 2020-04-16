<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Modification du contenu "POLITIQUE DE CONFIDENTIALITÉ"</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn small color="primary" @click="update">Enregistrer</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h3 class="mt-4">Contenu de la page</h3>
    <vue-editor v-model="page.content" class="mt-4"></vue-editor>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
import { VueEditor } from 'vue2-editor';
import SnackComp from '@/components/site/general/SnackComp.vue';

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
      page: {
        content: '',
      },
      ref: 'page/',
    };
  },
  methods: {
    update() {
      const key = 'politique-conf';
      if (!this.page.content) return '';
      db.ref(this.ref).child(key).update({ ...this.page });
      this.showSnackComp('Enregistrer', 'success');
      return '';
    },
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    get() {
      const key = 'politique-conf';
      db.ref(this.ref).orderByKey().equalTo(key).once('value')
        .then((snap) => {
          this.page = snap.val()[key];
        });
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
