<template>
  <section class="white" id="nous-contacter">
    <v-container grid-list-xl>
      <div class="barre bg-blue-grad mb-5"></div>
      <v-row>
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
import { mapActions } from 'vuex';


export default {
  components: {},
  data: () => ({
    ref: 'info-contact/',
    info: {
      intro: '',
      adresse: '',
      contact: '',
      email: '',
    },
  }),
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
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
