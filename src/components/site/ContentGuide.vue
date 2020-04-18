<template>
  <v-row align="center" justify="center">
    <v-window
      v-model="onboarding"
      class="elevation-0"
    >
      <v-window-item
        v-for="(chap) in chaps"
        :key="chap.id"
      >
        <v-card flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <strong class="title ml-3"> {{chap.titre}} </strong>
              <v-spacer></v-spacer>
              <v-btn fab dark small color="primary" @click="drawer = !drawer">
                <v-icon dark>mdi-menu</v-icon>
              </v-btn>
              <v-navigation-drawer v-if="drawer"
                v-model="drawer"
                absolute
                mobile-break-point="2710"
              >
                <v-list>
                  <v-list-item
                    v-for="(titre, i) in chaps.map(el => el.titre)"
                    :key="i"
                    @click="onboarding = i"
                  >
                    <v-list-item-title> {{titre}} </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-row>

            <v-sheet class="textguideScroll" :style="`height: ${heigthTextGuidContent - reduce}px`">
              <div v-html="chap.content"></div>
            </v-sheet>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn
              text
              @click="prev"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              text
              @click="next"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
// import moment from 'moment';
import db from '@/plugins/firebase';

export default {
  data: () => ({
    onboarding: 0,
    isClick: false,
    drawer: false,
    chaps: [],
    ref: 'page/',
  }),
  computed: {
    ...mapGetters([
      'sizeWindows',
      'sizeTopBar',
      'sizePageTitle',
      'sizeFooter',
    ]),
    heigthTextGuidContent() {
      if (!this.sizeWindows || !this.sizeTopBar
         || !this.sizePageTitle || !this.sizeFooter) return 0;
      return this.sizeWindows.y
        - (this.sizeTopBar.y + this.sizePageTitle.y + this.sizeFooter.y * 2);
    },
    reduce() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 100;
        case 'sm': return 100;
        default: return 0;
      }
    },
  },
  methods: {
    next() {
      this.onboarding = this.onboarding + 1 === this.chaps.length
        ? 0
        : this.onboarding + 1;
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
        ? this.chaps.length - 1
        : this.onboarding - 1;
    },
    async get() {
      try {
        const key = 'guide';
        const responce = await db.ref(this.ref).orderByKey().equalTo(key).once('value');
        this.chaps = Object.values(responce.val()[key]);
        this.chaps.sort((a, b) => a.titre.split(' ')[0] - b.titre.split(' ')[0]);
      } catch (error) {
        this.chaps = [];
      }
    },
  },
  async mounted() {
    await this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
