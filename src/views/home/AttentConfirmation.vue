<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="En attente de confirmation"/>
    <v-container class="d-flex justify-center">
      <v-card
        class="mx-auto"
        max-width="600"
        outlined>

        <v-card-text v-if="user">
          <p class="body-1 black--text">
            Votre demande d'inscription a bien été pris en compte.
            Veuillez consulter votre mail pour confirmation. <br>
            Email de confirmation: <strong>{{user.email}}</strong> <br>
            <strong>NB :</strong> Si vous ne recevez pas de mail, vérifier dans vos spams.
          </p>
        </v-card-text>
      </v-card>
    </v-container>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { mapGetters } from 'vuex';

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
        text: 'Confirmation',
        disabled: true,
      },
    ],
    isLoad: false,
  }),
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {},
  mounted() {
    if (!this.user) {
      this.$router.push('/');
    }
  },
};
</script>

<style>

</style>
