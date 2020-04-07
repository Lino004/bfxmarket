<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="my-4">Modification des indformations de contact</h3>
      </v-col>
      <v-col class="text-end">
        <v-btn
          class="mx-2"
          fab dark
          color="green"
          @click="dialog = true">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h4>Text introductif</h4>
        <p> {{info.intro}} </p>
      </v-col>
      <v-col cols="4">
        <h4>Adresse</h4>
        <p> {{info.adresse}} </p>
      </v-col>
      <v-col cols="4">
        <h4>Contact</h4>
        <p> {{info.contact}} </p>
      </v-col>
      <v-col cols="4">
        <h4>Email</h4>
        <p> {{info.email}} </p>
      </v-col>
    </v-row>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
    <v-dialog
      width="500"
      v-model="dialog">
      <v-card>
        <v-card-title
          class="headline bg-blue-grad"
          primary-title
        >
          Modifier les infortaions de contact
        </v-card-title>

        <v-card-text class="pa-5">
          <v-textarea
            label="Text intro"
            outlined
            v-model="info.intro"
          ></v-textarea>
          <v-text-field
            label="Text principal"
            outlined
            append-icon="card-text"
            v-model="info.adresse"/>
          <v-text-field
            label="Text secondaire"
            outlined
            append-icon="card-text"
            v-model="info.contact"/>
          <v-text-field
            label="Text secondaire"
            outlined
            append-icon="card-text"
            v-model="info.email"/>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="primary"
            @click="update"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      valueSnack: false,
      colorSnack: '',
      message: '',
      ref: 'info-contact/',
      info: {
        intro: '',
        adresse: '',
        contact: '',
        email: '',
      },
    };
  },
  methods: {
    update() {
      if (!this.info.intro || !this.info.adresse || !this.info.contact || !this.info.email) return '';
      db.ref(this.ref).update({ ...this.info });
      this.dialog = false;
      return '';
    },
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    get() {
      db.ref(this.ref).on('value', (snap) => {
        if (snap.val()) {
          this.info = snap.val();
        }
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
