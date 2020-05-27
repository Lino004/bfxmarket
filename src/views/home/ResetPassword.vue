<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Réinitialisation de mot de passe"/>
    <v-container class="d-flex justify-center">
      <v-card
        class="mx-auto"
        max-width="600"
        outlined>

        <v-card-text>
          <p class="body-1">
            Votre demande de réinitialisation de mot de passe a bien été pris en compte.
          Veuillez les champs suivant:
          </p>
          <v-text-field
            label="Nouveau mot de passe*"
            outlined
            type="password"
            required
            append-icon="lock"
            v-model="password"
            :rules="reglePass"
            hide-details="auto"
            class="mb-2"/>
          <v-text-field
            label="Confirmer le nouveau mot de passe*"
            outlined
            type="password"
            required
            append-icon="lock"
            v-model="confPass"
            :rules="[...regleConfPass, testPass]"
            hide-details="auto"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="reset">
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
import { resetPassword } from '@/api/auth/index';

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
        text: 'Réinitialisation',
        disabled: true,
      },
    ],
    isLoad: false,
    password: null,
    reglePass: [
      v => !!v || 'Votre mot de passe est obligatoire',
      v => (v && v.length >= 8) || 'Plus de 8 carractère pour le mot de passe SVP!!',
    ],
    confPass: null,
    regleConfPass: [
      v => !!v || 'La confirmation de mot de passe est obligatoire',
      v => (v && v.length >= 8) || 'Plus de 8 carractère pour le mot de passe SVP!!',
    ],
  }),
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    testPass(v) {
      return (this.password === v) || 'Les mots de passe ne sont pas identiques';
    },
    async reset() {
      this.isLoad = true;
      try {
        if (this.password === this.confPass) {
          const { pass, id } = this.$route.params;
          const data = {
            password: this.password,
            identifiant_url: pass,
            identifiant: id,
          };
          await resetPassword(data);
          this.showSnackMsg({
            msg: 'Votre mot de passe à bien été changé',
            color: 'success',
          });
          this.password = '';
          this.confPass = '';
          this.$router.push('/');
        } else {
          this.showSnackMsg({
            msg: 'Une erreur s\'est produite. Vérifiez les informations et réessayez',
            color: 'error',
          });
        }
        this.isLoad = false;
        return '';
      } catch (error) {
        if (error.response && error.response.status) {
          this.showSnackMsg({
            msg: error.response.data.error,
            color: 'error',
          });
          this.isLoad = false;
          return '';
        }
        this.showSnackMsg({
          msg: 'Une erreur s\'est produite. Vérifiez les informations et réessayez',
          color: 'error',
        });
        this.isLoad = false;
        return '';
      }
    },
  },
  mounted() {},
};
</script>

<style>

</style>
