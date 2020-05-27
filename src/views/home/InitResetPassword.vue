<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Mot de passe oublié"/>
    <v-container class="d-flex justify-center">
      <v-card
        class="mx-auto"
        max-width="600"
        outlined>

        <v-card-text>
          <p class="body-1">
            Vous avez oublié votre mot de passe. Veillez entrer votre adresse email:
          </p>
          <v-text-field
            label="Email*"
            outlined
            type="email"
            required
            append-icon="mail"
            v-model="email"
            :rules="regleEmail"
            hide-details="auto"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="initReset">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { mapGetters, mapActions } from 'vuex';
import { initResetPassword } from '@/api/auth/index';

export default {
  components: { PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Mot de passe oublié',
        disabled: true,
      },
    ],
    isLoad: false,
    email: null,
    regleEmail: [
      v => !!v || 'Votre email est obligatoire',
      v => /.+@.+\..+/.test(v) || 'Entrez un email valide',
    ],
  }),
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    async initReset() {
      try {
        const data = {
          email: this.email.toLowerCase().trim(),
        };
        await initResetPassword(data);
        this.showSnackMsg({
          msg: 'Votre demande a été prit en compte. Veuillez vérifier votre boite mail.',
          color: 'success',
        });
        return '';
      } catch (error) {
        if (error.response && error.response.status) {
          this.showSnackMsg({
            msg: error.response.data.error,
            color: 'error',
          });
          return '';
        }
        this.showSnackMsg({
          msg: 'Une erreur s\'est produite. Vérifiez les informations et réessayez',
          color: 'success',
        });
        return '';
      }
    },
  },
  mounted() {},
};
</script>

<style>

</style>
