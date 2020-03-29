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
            <div class="container text-center">
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

export default {
  components: {},
  data() {
    return {
      dataCarousel: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/bluefxmarket.appspot.com/o/img%2Fbg001.png?alt=media&token=84c8a833-6e41-4584-87ba-930ad53a3e72',
          title: 'Un grand titre',
          subtitle: 'Un sous titre',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/bluefxmarket.appspot.com/o/img%2Fbg002.png?alt=media&token=92c15071-8fa3-420c-9605-92f2a0953a31',
          title: 'Un grand titre',
          subtitle: 'Un sous titre',
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'sizeTopBar',
    ]),
  },
};
</script>

<style>

</style>
