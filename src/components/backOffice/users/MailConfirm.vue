<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Renvoi de mail de confirmation
    </v-card-title>

    <v-card-text class="pa-5 black--text">
      Vous êtes sur le point d'envoyer des mails de confirmation aux utilisateurs suivant:
      <ul>
        <li v-for="user in usersSelect" :key="user.identifiant">
          {{user.nom}} {{user.prenom}}
        </li>
      </ul>
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
        color="success"
        dark
        @click="sendMail"
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
    userAdmin: Object,
  },
  data: () => ({
    chapitreSelect: null,
    loading: false,
  }),
  methods: {
    async sendMail() {
      this.loading = true;
      try {
        if (this.usersSelect.length) {
          const req = [];
          this.usersSelect.forEach((user) => {
            const mail = {
              contenu: `Coucou.
                <br>
                Voici le lien de confirmation pour votre inscription. 
                <a href="https://wfxschool.com/home/confirmation-inscription/${user.identifiant}">
                  Cliquez ici
                </a>
                <br>
                Toute l'équipe de <span style="font-weight: bold">WFXSCHOOL</span> vous présente ces excuses pour le désagrément causé.
                <br>
                <span style="font-style: italic">Personne n’évolue seul et nul n'a le droit d’être heureux tout seul.</span>
                <br>
                Et c'est ça la force de notre équipe, merci pour votre confiance.
                <br>
                Cordialement <span style="font-weight: bold">WFXSCHOOL</span>.`,
              sujet: 'Reconfirmation d\'inscription',
              mails: [user.email],
            };
            req.push(sendMultiMail(mail));
          });
          const res = await Promise.all(req);
          console.log(res);
          this.$emit('resetUsersSelect');
          await this.$parent.$parent.$parent.getList();
          this.$parent.$parent.$parent.showModal = false;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async sendPerToPer(users) {
      const req = [];
      users.forEach((user) => {
        const mail = {
          contenu: `Coucou.
            <br>
            Voici le lien de confirmation pour votre inscription. 
            <a href="https://wfxschool.com/home/confirmation-inscription/${user.identifiant}">
              Cliquez ici
            </a>
            <br>
            Toute l'équipe de <span style="font-weight: bold">WFXSCHOOL</span> vous présente ces excuses pour le désagrément causer.
            <br>
            <span style="font-style: italic">Personne n’évolue seul et nul n'a le droit d’être heureux tout seul.</span>
            <br>
            Et c'est ça la force de notre équipe, merci pour votre confiance.
            <br>
            Cordialement <span style="font-weight: bold">WFXSCHOOL</span>.`,
          sujet: 'Reconfirmation d\'inscription',
          mails: [user.email],
        };
        req.push(sendMultiMail(mail));
      });
      await Promise.all(req);
      await this.pause(10000);
    },
    pause(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time, 'p1_resolution_retardee');
      });
    },
  },
};
</script>

<style>

</style>
