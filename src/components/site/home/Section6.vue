<template>
  <section class="white pb-5" id="nous-contacter">
    <v-container grid-list-xl>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">
        Newsletter
      </h1>
      <v-row>
        <v-col
          cols="12"
        >
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
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { sendMail } from '@/api/mail/index';
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
    noms: '',
    email: '',
    sujet: '',
    msg: '',
  }),
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
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
  },
  mounted() {},
  destroyed() {},
};
</script>

<style>

</style>
