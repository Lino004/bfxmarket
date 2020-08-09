<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Envoyer un e-mail
    </v-card-title>

    <v-card-text class="pa-5">
      <v-text-field
        label="Objet du mail"
        outlined
        append-icon="card-text"
        v-model="mail.sujet"/>
      <v-textarea
        label="Contenu du mail"
        outlined
        v-model="mail.contenu"></v-textarea>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$parent.$parent.$parent.showModal = false"
      >
        Annuler
      </v-btn>
      <v-btn
        color="primary"
        @click="envoiMail"
      >
        Envoyer
      </v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { sendMultiMail } from '@/api/mail/index';

export default {
  props: {
    usersSelect: Array,
  },
  data: () => ({
    mail: {
      contenu: '',
      sujet: '',
      mails: [],
    },
    loading: false,
  }),
  methods: {
    async envoiMail() {
      this.loading = true;
      try {
        if (this.mail.sujet && this.mail.contenu) {
          this.mail.mails = this.usersSelect.map(el => el.email);
          await sendMultiMail(this.mail);
          this.$parent.$parent.$parent.showSnackMsg({
            msg: 'Les mails ont bien été envoyé',
            color: 'success',
          });
          this.$parent.$parent.$parent.showModal = false;
          this.loading = false;
          this.mail.mails = [];
          this.mail.sujet = '';
          this.mail.contenu = [];
          return '';
        }
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Les champs sont obligatoires',
          color: 'error',
        });
        this.loading = false;
        return '';
      } catch (error) {
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Problème lors de l\'envoi di mail',
          color: 'error',
        });
        this.$parent.$parent.$parent.showModal = false;
        this.loading = false;
        return '';
      }
    },
  },
};
</script>

<style>

</style>
