<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height bg-blue-grad"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <div class="text-center">
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
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
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
      'showSnackMsg',
    ]),
    ...mapMutations({
      actionSetUserAdmin: 'SET_USER_ADMIN',
    }),
    async login() {
      try {
        this.loading = true;
        const infoUser = {
          login: this.email.toLowerCase(),
          password: this.password,
        };
        const user = (await login(infoUser)).data;
        this.showSnackMsg({
          msg: 'Connexion réussi',
          color: 'success',
        });
        user.password = '';
        this.actionSetUserAdmin(user);
        this.$router.push({ name: 'back-office-config-home' });
        this.loading = false;
      } catch (error) {
        if (error.response.status === 404) {
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
