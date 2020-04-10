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
            <!-- <v-col cols="2">
              <v-img
                :src="require('@/assets/img/logo-white.png')"
                class="mr-5"/>
            </v-col> -->
            <div class="container text-center col-12">
              <p class="display-4 font-weight-black"> {{img.title}} </p>
              <p class="display-2"> {{img.subtitle}} </p>
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
