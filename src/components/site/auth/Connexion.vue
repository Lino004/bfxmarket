<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      flat
      class="mb-5 bg-blue-grad"
    >
      <v-toolbar-title>Connexion</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          name="email"
          outlined
          append-icon="person"
          type="text"
          v-model="email"
          :rules="regleEmail"
        />

        <v-text-field
          label="Mot de passe"
          name="password"
          outlined
          append-icon="lock"
          type="password"
          v-model="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="$emit('annuler')">Annuler</v-btn>
      <v-btn color="primary" @click="login2">Se connecter</v-btn>
    </v-card-actions>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/auth/index';
import axios from 'axios';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    SnackComp,
  },
  data: () => ({
    email: null,
    regleEmail: [
      v => !!v || 'Votre email est obligatoire',
      v => /.+@.+\..+/.test(v) || 'Entrez un email valide',
    ],
    password: null,
    reglePass: [
      v => !!v || 'Votre mot de passe est obligatoire',
      v => (v && v.length >= 8) || 'Plus de 8 carractère pour le mot de passe SVP!!',
    ],
    valueSnack: false,
    colorSnack: '',
    message: '',
  }),
  methods: {
    ...mapActions([
      'setUser',
    ]),
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async login() {
      try {
        this.createLoading = true;
        const infoUser = {
          email: this.email,
          password: this.password,
        };
        const user = (await login(infoUser)).data;
        this.showSnackComp('Connexion réussi', 'success');
        console.log(user);
        /* user.password = '';
        this.setUser(user); */
        this.createLoading = false;
        this.$emit('annuler');
      } catch (error) {
        this.showSnackComp('Erreur serveur', 'error');
        this.createLoading = false;
      }
    },
    async login2() {
      try {
        this.createLoading = true;
        /* const infoUser = {
          email: this.email,
          password: this.password,
        }; */
        // const user = await axios.post('http://backend.wfxschool.com/services/api/auth/login');
        const user = await axios({
          method: 'post',
          url: 'http://backend.wfxschool.com/services/api/auth/login',
          data: {
            email: this.email,
            password: this.password,
          },
        });
        console.log(user);
        /* const user = await axios.get('http://backend.wfxschool.com/services/api/tasks/pays/list');
        console.log(user); */
        this.showSnackComp('Connexion réussi', 'success');
      } catch (error) {
        console.log(error);
        this.showSnackComp('Erreur serveur', 'error');
        this.createLoading = false;
      }
    },
  },

};
</script>

<style>

</style>
