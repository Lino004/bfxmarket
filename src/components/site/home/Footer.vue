<template>
  <v-footer :fixed="isFixed" v-resize="onResize" class="bg-blue-grad">
    <v-container class="pa-0" v-if="isFixed">
      <v-card
        flat
        tile
        class="white--text text-center"
        color="transparent">
        <v-btn
          class="white--text"
          icon
          small
          @click="showFooter = !showFooter">
          <v-icon> {{showFooter ? 'mdi-chevron-down' : 'mdi-chevron-up'}} </v-icon>
        </v-btn>
      </v-card>
    </v-container>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      :duration="500"
      appear>
      <v-container v-if="showFooter" grid-list-xl>
        <div class="d-block d-sm-none">
          <v-divider></v-divider>
          <h2 class="title text-center" v-animate-css="'fadeInDown'">
            A propos
          </h2>
          <v-divider></v-divider>
        </div>

        <!-- Affichage info wfxschool sur tablet, pc -->
        <v-row class="d-none d-sm-flex">
          <v-col cols="12" sm="4">
            <v-card flat tile
              class="white--text text-center"
              color="transparent">
              <h2 class="title text-center">Notre Bureau</h2>
              <v-card-text class="white--text pa-0">
                {{info.adresse}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card flat tile
              class="white--text text-center"
              color="transparent">
              <h2 class="title text-center">Contactez-Nous</h2>
              <v-card-text class="white--text pa-0">
                {{info.email}} <br/>
                {{info.contact}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card flat tile
              class="white--text text-center"
              color="transparent">
              <h2 class="title text-center">Suivez-Nous</h2>
              <v-card-text class="white--text pa-0">
                <v-btn
                  v-for="(link, i) in links"
                  :key="i"
                  class="mx-4 white--text"
                  icon
                  :href="link.link"
                >
                  <v-icon size="24px">{{ link.icon }}</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Affichage info wfxschool sur mobile -->
        <v-row class="d-block d-sm-none">
          <v-col cols="12" sm="4" class="pb-0">
            <v-card flat tile
              class="white--text text-center"
              color="transparent">
              <v-card-text class="white--text pa-0">
                <v-btn class="mx-4 white--text" icon @click="showInfo = 0">
                  <v-icon size="24px">
                    mdi-map-marker
                  </v-icon>
                </v-btn>
                <v-btn class="mx-4 white--text" icon @click="showInfo = 1">
                  <v-icon size="24px">
                    mdi-contacts
                  </v-icon>
                </v-btn>
                <v-btn class="mx-4 white--text" icon @click="showInfo = 2">
                  <v-icon size="24px">
                    mdi-share
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">

            <v-card flat tile
              class="white--text text-center"
              color="transparent"
              v-if="showInfo === 0">
              <h2 class="title text-center">Notre Bureau</h2>
              <v-card-text class="white--text pa-0">
                {{info.adresse}}
              </v-card-text>
            </v-card>

            <v-card flat tile
              class="white--text text-center"
              color="transparent"
              v-if="showInfo === 1">
              <h2 class="title text-center">Contactez-Nous</h2>
              <v-card-text class="white--text pa-0">
                {{info.email}} <br/>
                {{info.contact}}
              </v-card-text>
            </v-card>

            <v-card flat tile
              class="white--text text-center"
              color="transparent"
              v-if="showInfo === 2">
              <h2 class="title text-center">Suivez-Nous</h2>
              <v-card-text class="white--text pa-0">
                <v-btn
                  v-for="(link, i) in links"
                  :key="i"
                  class="mx-4 white--text"
                  icon
                  :href="link.link"
                >
                  <v-icon size="24px">{{ link.icon }}</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </transition>
  </v-footer>
</template>

<script>
import { mapActions } from 'vuex';
import db from '@/plugins/firebase';

export default {
  components: {},
  data: () => ({
    links: [
      { icon: 'mdi-telegram', link: 'https://t.me/wfxschool' },
      { icon: 'mdi-facebook', link: 'https://www.facebook.com/100881411604853/posts/103241474702180/?d=n' },
      { icon: 'mdi-youtube', link: 'https://www.youtube.com/channel/UCeE5e8iDE_ZmI87AVYBrx6A' },
    ],
    showFooter: true,
    ref: 'info-contact/',
    info: {
      intro: '',
      adresse: '',
      contact: '',
      email: '',
    },
    showDev: 0,
    showInfo: 0,
  }),
  watch: {
    isFixed: {
      handler(val) {
        if (val) this.showFooter = false;
        else this.showFooter = true;
      },
      immediate: true,
    },
  },
  computed: {
    isFixed() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
        default: return false;
      }
    },
  },
  methods: {
    ...mapActions([
      'setSizeFooter',
    ]),
    onResize() {
      this.setSizeFooter({
        x: document.querySelector('.v-footer').clientWidth,
        y: document.querySelector('.v-footer').clientHeight,
      });
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
    this.onResize();
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
