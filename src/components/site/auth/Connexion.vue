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
      <v-spacer/>
      <v-btn color="primary" @click="$emit('annuler')">Annuler</v-btn>
      <v-btn
        color="primary"
        @click="login">
        Se connecter
      </v-btn>
    </v-card-actions>
     <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/auth/index';

export default {
  data: () => ({
    email: '',
    regleEmail: [
      v => !!v || 'Votre email est obligatoire',
      v => /.+@.+\..+/.test(v) || 'Entrez un email valide',
    ],
    password: null,
    reglePass: [
      v => !!v || 'Votre mot de passe est obligatoire',
      v => (v && v.length >= 8) || 'Plus de 8 carractère pour le mot de passe SVP!!',
    ],
    loading: false,
  }),
  methods: {
    ...mapActions([
      'setUser',
      'showSnackMsg',
    ]),
    async login() {
      try {
        this.loading = true;
        const infoUser = {
          login: this.email.toLowerCase().trim(),
          password: this.password,
        };
        const user = (await login(infoUser)).data;
        this.showSnackMsg({
          msg: 'Connexion réussi',
          color: 'success',
        });
        user.password = '';
        this.setUser(user);
        window.location.reload();
        this.loading = false;
        this.$emit('annuler');
      } catch (error) {
        if (error.response.status === 404) {
          this.showSnackMsg({
            msg: error.response.data.error,
            color: 'error',
          });
        }
        if (error.response.status === 400) {
          this.showSnackMsg({
            msg: error.response.data.error,
            color: 'error',
          });
        }
        this.loading = false;
      }
    },
  },

};
</script>

<style>

</style>
