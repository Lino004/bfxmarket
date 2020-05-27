<template>
  <v-app id="inspire">
    <v-content>
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
            <div class="text-center">
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
            <div>
              <flip-countdown
                deadline="2020-05-27 14:00:00"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment';
import FlipCountdown from 'vue2-flip-countdown';

moment.locale('fr');

export default {
  components: { FlipCountdown },
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
