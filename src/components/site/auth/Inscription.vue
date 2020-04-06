<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      flat
      class="mb-5 bg-blue-grad"
    >
      <v-toolbar-title>Inscription</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text class="pb-0">
      <v-form v-model="valide">
        <v-container class="pb-0">
          <v-row class="pb-0">
            <v-col cols="12" sm="6">
              <v-text-field
                label="Nom*"
                required
                outlined
                append-icon="edit"
                v-model="nom"
                :rules="regleNom"/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Prenom(s)*"
                required
                outlined
                append-icon="edit"
                v-model="prenom"
                :rules="reglePrenom"/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="selectPays"
                :items="pays"
                hide-no-data
                hide-selected
                item-text="nom"
                item-value="codepays"
                label="Votre pays"
                placeholder="Rechercher un pays"
                outlined
                return-object
                :rules="reglePays"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Votre numéro*"
                outlined
                required
                type="number"
                :rules="regleNumero"
                hint="Numéro sans l'indicatif"
                v-model="numero"/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                outlined
                type="email"
                required
                append-icon="mail"
                v-model="email"
                :rules="regleEmail"/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Mot de passe*"
                outlined
                type="password"
                required
                append-icon="lock"
                v-model="password"
                :rules="reglePass"/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Confirmer mot de passe*"
                outlined
                type="password"
                required
                append-icon="lock"
                v-model="confPass"
                :rules="[...regleConfPass, testPass]"/>
            </v-col>
            <v-col cols="12" class="">
              <v-checkbox
                v-model="termes"
                hide-details
                class="mt-0"
                :rules="regleTermes"
              >
                <template v-slot:label>
                  <div @click.stop="">
                    Acceptez vous les
                    <a href="javascript:;" @click.stop="showModalTermes = true">
                      Politique de Confidentialité?
                    </a>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
            <v-col cols="12" class="">
              <v-checkbox
                v-model="conditions"
                hide-details
                class="mt-0"
                :rules="regleConditions"
              >
                <template v-slot:label>
                  <div @click.stop="">
                    Acceptez vous les
                    <a href="javascript:;" @click.stop="showModalCondition = true">
                      Conditions Générales de Vente?
                    </a>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="$emit('annuler')">Annuler</v-btn>
      <v-btn
        color="primary"
        :disabled="!valide"
        @click="createUser"
        :loading="createLoading">
        S'inscrire
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="showModalTermes" width="70%">
      <v-card>
        <v-card-title class="title">Terme</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="showModalTermes = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showModalCondition" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="showModalCondition = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import listePays from '@/services/pays';
import { create } from '@/api/auth/index';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    SnackComp,
  },
  data: () => ({
    nom: null,
    regleNom: [
      v => !!v || 'Votre nom est obligatoire',
      v => (v && v.length >= 3) || 'Plus de 3 carractère pour le nom SVP!!',
    ],
    prenom: null,
    reglePrenom: [
      v => !!v || 'Votre prenom est obligatoire',
      v => (v && v.length >= 3) || 'Plus de 3 carractère pour le prenom SVP!!',
    ],
    selectPays: null,
    reglePays: [
      v => !!v || 'Votre pays est obligatoire',
    ],
    numero: null,
    regleNumero: [
      v => !!v || 'Votre numéro est obligatoire',
    ],
    email: null,
    regleEmail: [
      v => !!v || 'Votre email est obligatoire',
      v => /.+@.+\..+/.test(v) || 'Entrez un email valide',
    ],
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
    termes: null,
    regleTermes: [
      v => !!v || 'Case obligatoire',
    ],
    conditions: null,
    regleConditions: [
      v => !!v || 'Case obligatoire',
    ],
    valide: null,
    pays: listePays,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    Class aptent taciti sociosquad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.
    Sed dignissim lacinia nunc.`,
    showModalTermes: false,
    showModalCondition: false,
    createLoading: false,
    valueSnack: false,
    colorSnack: '',
    message: '',
  }),
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'setUser',
    ]),
    testPass(v) {
      return (this.password === v) || 'Les mots de passe ne sont pas identiques';
    },
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async createUser() {
      try {
        this.createLoading = true;
        const infoUser = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          phone: this.numero,
          password: this.password,
          pays: this.selectPays.id,
        };
        const user = (await create(infoUser)).data;
        this.showSnackComp('Inscription réussi', 'success');
        user.password = '';
        this.setUser(user);
        this.createLoading = false;
        this.$emit('annuler');
      } catch (error) {
        this.showSnackComp('Erreur serveur', 'error');
        this.createLoading = false;
      }
    },
  },
};
</script>

<style>

</style>
