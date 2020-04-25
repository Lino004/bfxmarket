<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Liste des utilisateurs</h2>
      </v-col>
      <v-col class="text-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              color="primary"
              :disabled="!usersSelect.length"
              v-on="on">
              Actions
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="modalSouscription = true" disabled>
              <v-list-item-title>Valider des souscriptions</v-list-item-title>
            </v-list-item>
            <v-list-item @click="modalEnvoiEmail = true" disabled>
              <v-list-item-title>Envoyer des e-mails</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      class="elevation-1 mt-4"
      :headers="headers"
      v-model="usersSelect"
      :items="liste"
      :items-per-page="10"
      :loading="isLoad"
      :search="search"
      show-select>
      <template v-slot:body.prepend="{  }">
        <tr>
          <td :colspan="5">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Recherche..."
              single-line
              hide-details
            ></v-text-field>
          </td>
          <td>
            <v-select
              v-model="statusSelect"
              :items="tabStatus"
              label="Status"
              item-value="type"
              item-text="libelle"
              hide-details
              multiple
            ></v-select>
          </td>
          <td></td>
        </tr>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img :src="`${base}${item.image}`" height="50" width="50"></v-img>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getStatus(item.status).couleur"
          dark style="width: 100%">
          {{ getStatus(item.status).libelle }}
        </v-chip>
      </template>
      <template v-slot:item.lien="{ item }">
        <v-chip
          color="green"
          dark style="width: 100%"
          @click.prevent="copieLien(item.identifiant_url)">
          Copier le lien
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog
      width="500"
      v-model="modalEnvoiEmail">
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
            @click="modalEnvoiEmail = false"
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
      </v-card>
    </v-dialog>

    <v-dialog
      width="500"
      v-model="modalSouscription">
      <v-card>
        <v-card-title
          class="headline bg-blue-grad"
          primary-title
        >
          Valider des souscriptions
        </v-card-title>

        <v-card-text class="pa-5">
            <v-select
              v-model="chapitreSelect"
              :items="chapitres"
              label="Choisissez le chapitre"
              item-value="id"
              item-text="titre"
              hide-details
            ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="modalSouscription = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="primary"
            @click="envoiSouscription"
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { getListUser, souscript } from '@/api/auth/index';
import { sendMultiMail } from '@/api/mail/index';
import { listeChapitre } from '@/api/chapitres/index';
import { BASE_HOST } from '@/api/config/config';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      valueSnack: false,
      base: BASE_HOST,
      colorSnack: '',
      message: '',
      users: [],
      isLoad: false,
      headers: [
        { text: 'Nom', value: 'nom' },
        { text: 'Prenom', value: 'prenom' },
        { text: 'Email', value: 'email' },
        { text: 'Nbr de parrainage', value: 'downline', width: 100 },
        { text: 'Status', value: 'status', width: 100 },
        { text: 'Lien parrai.', value: 'lien', width: 100 },
      ],
      tabStatus: [
        { type: 'Offline', libelle: 'Hors ligne' },
        { type: 'Online', libelle: 'En ligne' },
        { type: 'initial', libelle: 'Insc. en cours' },
      ],
      expanded: [],
      singleExpand: false,
      search: '',
      statusSelect: [],
      usersSelect: [],
      modalEnvoiEmail: false,
      modalSouscription: false,
      mail: {
        contenu: '',
        sujet: '',
      },
      loading: false,
      chapitres: [],
      chapitreSelect: null,
    };
  },
  computed: {
    ...mapGetters([
      'userAdmin',
    ]),
    liste() {
      let data = this.users;
      if (this.statusSelect.length) data = data.filter(el => this.statusSelect.includes(el.status));
      return data;
    },
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    async getList() {
      this.isLoad = true;
      try {
        this.users = (await getListUser(this.userAdmin.identifiant)).data;
        this.users.sort((a, b) => b.id - a.id);
        await this.getListChap();
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    getStatus(status) {
      if (status === 'Online') {
        return {
          libelle: 'En ligne',
          couleur: 'green',
        };
      }
      if (status === 'initial') {
        return {
          libelle: 'Insc. en cours',
          couleur: 'orange',
        };
      }
      return {
        libelle: 'Hors ligne',
        couleur: 'red',
      };
    },
    async copieLien(id) {
      this.loading = true;
      try {
        const getUrl = window.location;
        await this.$copyText(`${getUrl.protocol}//${getUrl.host}/home/parrainage/${id}`);
        this.showSnackMsg({
          msg: 'Lien de parrainage copié',
          color: 'success',
        });
        this.loading = false;
      } catch (error) {
        this.showSnackMsg({
          msg: 'Problème lors de la copie',
          color: 'error',
        });
        this.loading = false;
      }
    },
    async envoiMail() {
      this.loading = true;
      try {
        if (this.mail.sujet && this.mail.contenu) {
          this.mail.mails = this.usersSelect.map(el => el.email);
          await sendMultiMail(this.mail);
          this.showSnackMsg({
            msg: 'Les mails ont bien été envoyé',
            color: 'success',
          });
          this.modalEnvoiEmail = true;
          this.loading = false;
          return '';
        }
        this.showSnackMsg({
          msg: 'Les champs sont obligatoires',
          color: 'error',
        });
        this.loading = false;
        return '';
      } catch (error) {
        this.showSnackMsg({
          msg: 'Problème lors de l\'envoi di mail',
          color: 'error',
        });
        this.modalEnvoiEmail = false;
        this.loading = false;
        return '';
      }
    },
    async getListChap() {
      this.loading = true;
      try {
        this.chapitres = (await listeChapitre()).data;
        this.chapitres.sort((a, b) => a.id - b.id);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async envoiSouscription() {
      this.loading = true;
      try {
        if (this.chapitreSelect) {
          const requetes = [];
          this.usersSelect.forEach((user) => {
            requetes.push(souscript({
              chapitre: this.chapitreSelect,
              user: user.identifiant,
              admin: this.userAdmin.identifiant,
            }));
          });
          await Promise.all(requetes);
          this.showSnackMsg({
            msg: 'Souscriptions faites avec succès',
            color: 'success',
          });
          this.loading = false;
          this.envoiSouscription = false;
          return '';
        }
        this.showSnackMsg({
          msg: 'Veillez selectionner un chapitre',
          color: 'error',
        });
        this.loading = false;
        return '';
      } catch (error) {
        this.showSnackMsg({
          msg: 'Problème lors de validation',
          color: 'error',
        });
        this.loading = false;
        return '';
      }
    },
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style>

</style>
