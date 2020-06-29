<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }" v-if="showBtn">
        <v-btn
          dark
          color="primary"
          v-on="on"
          :disabled="!chap.is_lock"
          v-text="'SOUSCRIRE'"/>
      </template>

      <v-card>
        <v-card-title
          class="bg-blue-grad"
          primary-title
        >
          Souscription
        </v-card-title>

        <v-card-text class="pa-6">
          <div v-if="this.chap.idFormation === 10">
            <v-alert
              dense
              type="info"
              dismissible
              border="left"
              icon="mdi-alert-decagram">
              NOUVEAU: Vous avez droit à <strong>40%</strong> de réduction pour 2 parrainages
            </v-alert>
          </div>
          <div class="black--text">
            Pour effectuer votre souscription vous devez
            <strong v-if="chap.downline">
              utiliser
              {{chap.downline > 1 ? chap.downline + ' parrainages' : 'un (1) parrainage'}}
            </strong>
            {{chap.downline && chap.price ? 'ou' : ''}}
            <strong v-if="chap.price">{{text}} {{chap.price}} $</strong>
          </div>
          <div class="black--text py-2">
            Choisissez le mode de votre choix:
          </div>
          <v-row justify="center">
            <v-col cols="4" v-if="chap.downline && this.chap.idFormation !== 10">
              <v-card
                class="border-20 curcor-pointer"
                elevation="7"
                @click="souscrire('parrainage')">
                <v-img
                  class="white--text black align-center text-center"
                  width="100%"
                  height="100"
                  src=""
                >
                  <div>
                    <img width="40" src="@/assets/img/parrainage.png">
                    <h2>Parrainage</h2>
                  </div>
                </v-img>
              </v-card>
            </v-col>
            <v-col cols="4" v-if="chap.price">
              <v-card
                class="border-20 curcor-pointer"
                elevation="7"
                @click="souscrire('transaction')">
                <v-img
                  class="white--text align-end"
                  width="100%"
                  height="100"
                  src="@/assets/img/mtn.png"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="4" v-if="chap.price">
              <v-card
                class="border-20 curcor-pointer"
                elevation="7"
                @click="souscrire('transaction')">
                <v-img
                  class="white--text align-end"
                  width="100%"
                  height="100"
                  src="@/assets/img/moov.png"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="4" v-if="chap.price">
              <v-card
                class="border-20 curcor-pointer"
                elevation="7"
                :href="href">
                <v-img
                  class="white--text primary align-center text-center"
                  width="100%"
                  height="100"
                  src=""
                >
                  <h2>Autre...</h2>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-overlay absolute :value="isLoad">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-dialog>
  </div>
</template>

<script>
import { souscript } from '@/api/auth/index';
import { createTransaction } from '@/api/transactions/index';
import { initPayement } from '@/api/payement/index';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    chap: Object,
    idModule: Number,
    showBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialog: false,
      isLoad: false,
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    href() {
      return `https://wa.me/22967328981?text=Je voudrais faire un don de ${this.chap.price}$ pour chapitre intitulé : ${this.chap.titre}`;
    },
    text() {
      if (this.chap.idFormation === 10) return 'payer';
      return 'faire un don de';
    },
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
      'getUser',
    ]),
    async souscrire(type) {
      this.isLoad = true;
      try {
        if (this.chap && type) {
          if (type === 'parrainage') {
            await souscript({
              chapitre: this.chap.id,
              user: this.user.identifiant,
            });
          }
          if (type === 'transaction') {
            const response1 = await createTransaction({
              chapitre: this.chap.id,
              user: this.user.identifiant,
            });
            const { data } = response1;
            data.callback_url = `${window.location.origin}/home/transaction-response/${data.id_transaction}/${this.idModule}/${this.chap.id}/${data.parrainage}`;
            const id = data.id_transaction;
            delete data.id_transaction;
            const response2 = await initPayement(id, data);
            const el = document.createElement('a');
            el.href = response2.data.url;
            el.click();
          }
          await this.getUser();
          this.showSnackMsg({
            color: 'success',
            msg: 'Souscription réussie',
          });
          this.$router.push({
            name: 'bfx-chapitre',
            params: {
              idChapitre: this.chap.id,
            },
          });
        }
        this.isLoad = false;
        return '';
      } catch (error) {
        this.isLoad = false;
        if (error.response.status === 400 || error.response.status === 404) {
          if (error.response.data.error) {
            this.showSnackMsg({
              color: 'error',
              msg: error.response.data.error,
            });
            return '';
          }
        }
        this.showSnackMsg({
          color: 'error',
          msg: 'Erreur: la souscription n\'a pas aboutie',
        });
        return '';
      }
    },
  },
};
</script>

<style>
.border-20{
  border-radius: 20px !important;
}
.curcor-pointer{
  cursor: pointer;
}
</style>
