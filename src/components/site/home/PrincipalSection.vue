<template>
  <section>
    <v-carousel
      show-arrows-on-hover
      :show-arrows="false"
      hide-delimiter-background
      cycle>
      <v-carousel-item
        src="@/assets/img/slide1.jpg"
      >
        <v-sheet
          color="#00000082"
          height="100%">

          <v-row
            class="fill-height"
            align="center"
            justify="center">
            <div class="container text-center col-12">
              <p class="font-weight-black"
                :class="classText.title">
                TRADER EN TOUTE SIMPLICITE
              </p>
              <p :class="classText.subtitle" class="font-italic">
                Le Trading n’est pas sorcier, faut juste le comprendre.
              </p>
              <v-row
                no-gutters
                justify="center">
                <v-col cols="12" sm="4">
                  <v-btn large
                  class="my-2"
                  color="bg-blue-grad"
                  :to="{ name: 'bfx-formation', params: { idFormation: 9 }}">
                  Apprendre à trader
                </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn large
                    class="my-2"
                    color="bg-blue-grad"
                    @click="myScrollTo('nous-contacter')">
                    Nous Contacter
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-row>

        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        src="@/assets/img/slide2.jpg"
      >
        <v-sheet
          color="#00000082"
          height="100%">

          <v-row
            class="fill-height"
            align="center"
            justify="center">
            <div class="container text-center col-9">
              <p class="display-1 font-italic">
                ‘’Personne n'évolue seul et nul n'a le droit d'être heureux tout seul.’’
              </p>
            </div>
          </v-row>

        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import db from '@/plugins/firebase';

export default {
  components: {},
  data() {
    return {
      dataCarousel: [],
    };
  },
  computed: {
    ...mapGetters([
      'sizeTopBar',
    ]),
    classText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return {
          title: 'display-1',
          subtitle: 'subtitle-1',
        };
        case 'sm': return {
          title: 'display-1',
          subtitle: 'subtitle-1',
        };
        default: return {
          title: 'display-2',
          subtitle: 'display-1',
        };
      }
    },
  },
  methods: {
    get() {
      db.ref('slide/').on('value', (snap) => {
        if (snap.val()) {
          this.dataCarousel = Object.values(snap.val());
        } else {
          this.dataCarousel = [];
        }
      });
    },
    myScrollTo(id) {
      const e = document.getElementById(id);
      const box = e.getBoundingClientRect();
      const s = document.getElementById('scroll-target');
      s.scrollTop = box.y;
    },
    myLastScrollTo(id) {
      const e = document.getElementById(id);
      const box = e.getBoundingClientRect();
      window.scrollBy(0, box.top);
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref('slide/').off();
  },
};
</script>

<style>

</style>
