<template>
  <section class="white">
    <Bande title="Plus d'information?"/>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm-4>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-center" v-animate-css="'fadeInDown'">
                <h2 class="headline font-weight-bold">
                  Ecrivez nous
                </h2>
              </div>
              <v-card
                class="pa-2"
                outlined
                tile
                color="transparent"
              >
                <v-form
                  ref="form"
                >
                  <v-text-field
                    label="Nom complet"
                    required
                    outlined
                    class="contact-form mb-2"
                    dense
                    append-icon="mdi-account"
                    v-model="noms"
                    hide-details
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    required
                    outlined
                    class="contact-form mb-2"
                    dense
                    append-icon="mdi-email"
                    v-model="email"
                    hide-details
                  ></v-text-field>

                  <v-text-field
                    label="Sujet"
                    required
                    outlined
                    class="contact-form mb-2"
                    dense
                    append-icon="mdi-text-subject"
                    v-model="sujet"
                    hide-details
                  ></v-text-field>

                  <v-textarea
                    outlined
                    label="Message"
                    rows="3"
                    class="contact-form mb-2"
                    dense
                    v-model="msg"
                    hide-details
                  ></v-textarea>
                  <v-btn
                    class="mr-4 bg-blue-grad"
                    block
                    @click="soumettre"
                  >
                    Soumettre
                  </v-btn>
                </v-form>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-center" v-animate-css="'fadeInDown'">
                <h2 class="headline font-weight-bold">
                  Contact Info
                </h2>
              </div>
              <v-card
                class="pa-2"
                outlined
                tile
                color="transparent"
              >
                <div class="ml-6">
                  {{info.intro}}
                </div>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-icon class="my-auto mr-3">
                      <v-icon class="display-2" color="primary">mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Adresse</v-list-item-title>
                      <v-list-item-subtitle>{{info.adresse}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon class="my-auto mr-3">
                      <v-icon class="display-2" color="primary">mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Contact</v-list-item-title>
                      <v-list-item-subtitle>{{info.contact}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon class="my-auto mr-3">
                      <v-icon class="display-2" color="primary">mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Email</v-list-item-title>
                      <v-list-item-subtitle>{{info.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
      <v-alert
        close-text="Close Alert"
        color="black" dark dismissible>
        <h3 class="headline">Avertissement au risque</h3>
        Le trading implique un risque élevé et ne convient
        pas à tous les investisseurs. Le degré élevé d’effet de levier
        peut opérer en votre faveur aussi bien que contre vous. Avant de
        décider de trader, vous devez attentivement considérer vos objectifs
        d’investissement, votre niveau d’expérience et votre appétit du risque.
        Pour cela, nous vous invitons à ne pas négliger de vous former avant
        d’investir des fonds. Il y a toujours une relation entre rémunération
        élevée et risque élevé. Tous types de marché ou de spéculation en trading,
        qui peut rapporter exceptionnellement un rendement élevé sur l’investissement,
        est soumis à un risque élevé exceptionnel, et le forex ne fait pas exception.
        Vous ne devez donc jamais investir des sommes d’argent dont vous pourriez avoir
        besoin pour vivre. Notez toutefois que la plupart des brokers disposent de règles
        de sécurité automatiques vous empêchant de perdre plus que les fonds investis.
      </v-alert>
    </v-container>
  </section>
</template>

<script>
import db from '@/plugins/firebase';
import Bande from '@/components/site/general/Bande.vue';
import { sendMail } from '@/api/mail/index';
import { mapActions } from 'vuex';


export default {
  components: { Bande },
  data: () => ({
    ref: 'info-contact/',
    info: {
      intro: '',
      adresse: '',
      contact: '',
      email: '',
    },
    noms: '',
    email: '',
    sujet: '',
    msg: '',
  }),
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    update() {
      if (!this.info.intro || !this.info.adresse || !this.info.contact || !this.info.email) return '';
      db.ref(this.ref).update({ ...this.info });
      this.dialog = false;
      return '';
    },
    async soumettre() {
      if (this.noms && this.email && this.msg) {
        const data = {
          sujet: this.sujet,
          contenue: `Nom complet: ${this.noms} Email:  ${this.email} Contenu du message: ${this.msg}`,
        };
        await sendMail(data);
        this.noms = '';
        this.email = '';
        this.sujet = '';
        this.msg = '';
        this.showSnackMsg({
          msg: 'Message envoyé avec succès',
          color: 'success',
        });
      }
    },
    get() {
      db.ref(this.ref).on('value', (snap) => {
        if (snap.val()) {
          this.info = snap.val();
        }
      });
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
