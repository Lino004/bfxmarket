<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height bg-blue-grad"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
          >
            <div class="text-center mb-7">
              <strong
                v-for="(lettre, i) in title"
                :key="i"
                :class="`${sizeTitle} font-weight-black`"
                v-animate-css="{
                  classes: 'zoomInUp',
                  duration: i * 1000,
                }">
                {{lettre}}
              </strong>
            </div>
            <!-- <div>
              <flip-countdown
                deadline="2020-06-01 8:00:00"/>
            </div> -->
            <div class="text-center">
              <v-btn depressed class="mr-4" color="primary"
                href="https://t.me/Contactuswfxschool">
                Contactez nous sur Telegram
                <v-icon
                  right
                  dark
                >
                  mdi-telegram
                </v-icon>
              </v-btn>
              <v-btn depressed color="success"
                href="http://Wa.me/22996005153">
                Contactez nous sur Whatsapp
                <v-icon
                  right
                  dark
                >
                  mdi-whatsapp
                </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment';
// import FlipCountdown from 'vue2-flip-countdown';

moment.locale('fr');

export default {
  // components: { FlipCountdown },
  data: () => ({
    title: 'SITE-EN-MAINTENANCE',
  }),
  computed: {
    time() {
      return moment().format('LTS');
    },
    sizeTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'display-1';
        case 'sm': return 'display-2';
        case 'md': return 'display-2';
        case 'lg': return 'display-3';
        case 'xl': return 'display-3';
        default: return '';
      }
    },
  },
};
</script>
