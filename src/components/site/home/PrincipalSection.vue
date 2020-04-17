<template>
  <section>
    <v-carousel
      show-arrows-on-hover
      :show-arrows="false"
      hide-delimiter-background
      cycle>
      <v-carousel-item
        v-for="(img,i) in dataCarousel"
        :key="i"
        :src="img.src"
      >
        <v-sheet
          color="#00000082"
          height="100%">

          <v-row
            class="fill-height"
            align="center"
            justify="center">
            <div class="container text-center col-12">
              <p
                class="font-weight-black"
                :class="classText.title"> {{img.title}} </p>
              <p :class="classText.subtitle"> {{img.subtitle}} </p>
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
          title: 'display-3',
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
