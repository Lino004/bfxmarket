<template>
  <v-app light>
    <div>
      <Drawer/>
      <TopBar/>
      <v-content v-resize="onResize" :style="`min-height: ${minHeight}px`">
        <router-view/>
      </v-content>
      <Footer/>
    </div>
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
      'setValueScroll',
    ]),
    onResize() {
      this.windowsSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    },
  },
  mounted() {
    this.onResize();
  },
  destroyed() {},
};
</script>

<style scoped>

</style>
