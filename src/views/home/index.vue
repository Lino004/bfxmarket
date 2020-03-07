<template>
  <v-app light>
    <video-bg :sources="[videoSrc]"
      :img="require('@/assets/img/stock.jpg')">
      <div>
        <Drawer/>
        <TopBar/>
        <v-content v-resize="onResize" :style="`min-height: ${minHeight}px`">
          <router-view/>
        </v-content>
        <Footer/>
      </div>
    </video-bg>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Drawer from '@/components/site/home/Drawer.vue';
import TopBar from '@/components/site/home/TopBar.vue';
import Footer from '@/components/site/home/Footer.vue';

export default {
  name: 'home',
  components: {
    Drawer,
    TopBar,
    Footer,
  },
  data() {
    return {
      windowsSize: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    ...mapGetters([
      'sizeTopBar',
      'sizeFooter',
    ]),
    videoSrc() {
      /* if (this.currentRoute === 'bfx-home') {
        return require('@/assets/video/video001.mp4'); // eslint-disable-line global-require
      } */
      return require('@/assets/video/video001.mp4'); // eslint-disable-line global-require
    },
    minHeight() {
      if (!this.sizeFooter) return 0;
      if (!this.sizeTopBar) return 0;
      return this.windowsSize.y - (this.sizeTopBar.y + this.sizeFooter.y);
    },
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions([
      'setValueScrollVideo',
    ]),
    onResize() {
      this.windowsSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    },
    onScroll(e) {
      this.setValueScrollVideo(e.target.scrollTop);
    },
    addEvent() {
      const element = document.querySelector('.VideoBg__content');
      element.addEventListener('scroll', this.onScroll);
    },
    removeEvent() {
      const element = document.querySelector('.VideoBg__content');
      element.removeEventListener('scroll', this.onScroll);
    },
  },
  mounted() {
    this.onResize();
    this.addEvent();
  },
  destroyed() {

  },
};
</script>

<style scoped>

</style>
