<template>
  <section class="white">
    <v-container grid-list-xl>
      <v-divider></v-divider>
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
                    class="contact-form"
                    dense
                    append-icon="mdi-account"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    required
                    outlined
                    class="contact-form"
                    dense
                    append-icon="mdi-email"
                  ></v-text-field>

                  <v-textarea
                    outlined
                    label="Message"
                    rows="3"
                    class="contact-form"
                    dense
                  ></v-textarea>
                  <v-btn
                    class="mr-4 bg-blue-grad"
                    block
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
    </v-container>
  </section>
</template>

<script>
import db from '@/plugins/firebase';

export default {
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
    update() {
      if (!this.info.intro || !this.info.adresse || !this.info.contact || !this.info.email) return '';
      db.ref(this.ref).update({ ...this.info });
      this.dialog = false;
      return '';
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
