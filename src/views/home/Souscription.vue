<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Souscription"/>
    <v-container class="d-flex justify-center">
      <v-card width="100%" max-width="800px" flat v-if="chapitres.length" class="pt-4">
        <v-select
          v-model="chapSelect"
          :items="chapitres"
          item-text="titre"
          label="Choisir un chapitre"
          return-object
          outlined
          hide-details
        ></v-select>
        <div class="my-5">
          Pour souscrire à ce chapitre, il vous suffit de:
          <strong v-if="chapSelect.downline">
            parrainer
            {{chapSelect.downline > 1 ? chapSelect.downline + ' personnes' : 'une (1) personne'}}
          </strong>
          {{chapSelect.downline && chapSelect.price ? 'ou' : ''}}
          <strong v-if="chapSelect.price">faire un don de {{chapSelect.price}} $</strong>
        </div>
        <v-select
          v-model="opSelect"
          :items="options"
          item-text="libelle"
          item-value="value"
          label="Choisissez une option de parrainage"
          outlined
        ></v-select>

        <v-card-actions class="pa-0">
          <v-btn
            v-text="'CONTINUER'"
            color="primary"
            :href="href"
            v-if="opSelect === 0"/>
          <v-btn
            v-text="'CONTINUER'"
            color="primary"
            @click="souscrire"
            v-if="opSelect === 1"/>
        </v-card-actions>
      </v-card>
      <v-card width="100%" max-width="800px" flat v-else>
        Vous avez déjà souscrit aux différents chapitres actifs.
        Veuillez patienter l'activation du prochain chapitre ou contacter notre support en ligne.
      </v-card>
    </v-container>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
// import Parrainage from '@/components/site/souscription/Parrainage.vue';
// import FaireUnDon from '@/components/site/souscription/FaireUnDon.vue';
import { listeChapitre } from '@/api/chapitres/index';
import { souscript } from '@/api/auth/index';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { PageTitle/* , Parrainage, FaireUnDon */ },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Souscription',
        disabled: true,
      },
    ],
    tab: null,
    opSelect: null,
    chapitres: [],
    isLoad: false,
    paiements: [
      'Paiement manuel',
    ],
    paiementSelect: 'Paiement manuel',
    chapSelect: null,
  }),
  computed: {
    ...mapGetters([
      'listeSouscript',
      'user',
    ]),
    href() {
      return `https://wa.me/22967328981?text=Je voudrais faire un don de ${this.chapSelect.price}$ pour chapitre intitulé : ${this.chapSelect.titre}`;
    },
    options() {
      if (!this.chapSelect.price) return [{ libelle: 'Souscription par parrainage', value: 1 }];
      if (!this.chapSelect.downline) return [{ libelle: 'Faire un don', value: 0 }];
      return [
        { libelle: 'Faire un don', value: 0 },
        { libelle: 'Souscription par parrainage', value: 1 },
      ];
    },
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
      'getUser',
    ]),
    async getList() {
      this.isLoad = true;
      try {
        const liste = (await listeChapitre()).data;
        liste.sort((a, b) => a.id - b.id);
        await this.getUser();
        this.chapitres = liste.filter(el => !this.listeSouscript.includes(el.id) && el.is_lock);
        [this.chapSelect] = this.chapitres;
        this.opSelect = this.options[0].value;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async souscrire() {
      this.isLoad = true;
      try {
        if (this.chapSelect) {
          await souscript({
            chapitre: this.chapSelect.id,
            user: this.user.identifiant,
          });
          await this.getUser();
          this.showSnackMsg({
            color: 'success',
            msg: 'Souscription réussie',
          });
          this.$router.push({
            name: 'bfx-chapitre',
            params: {
              idChapitre: this.chapSelect.id,
            },
          });
        } else {
          this.showSnackMsg({
            color: 'error',
            msg: 'Erreur: veuillez choisir un chapitre',
          });
        }
        this.isLoad = false;
        return '';
      } catch (error) {
        this.isLoad = false;
        if (error.response.status === 400) {
          this.showSnackMsg({
            color: 'error',
            msg: error.response.data.error,
          });
          return '';
        }
        if (error.response.status === 404) {
          this.showSnackMsg({
            color: 'error',
            msg: error.response.data.error,
          });
          return '';
        }
        this.showSnackMsg({
          color: 'error',
          msg: 'Erreur: la souscription n\'a pas aboutie',
        });
        return '';
      }
    },
  },
  async mounted() {
    await this.getList();
  },
};
</script>

<style>

</style>
