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
    <SnackComp/>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Drawer from '@/components/site/home/Drawer.vue';
import TopBar from '@/components/site/home/TopBar.vue';
import Footer from '@/components/site/home/Footer.vue';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  name: 'home',
  components: {
    Drawer,
    TopBar,
    Footer,
    SnackComp,
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
    ...mapMutations({
      setSizeWindows: 'SET_SIZE_WINDOWS',
    }),
    ...mapActions([
      'isConnect',
    ]),
    onResize() {
      this.windowsSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
      this.setSizeWindows({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    },
  },
  async mounted() {
    this.onResize();
    await this.isConnect();
  },
  destroyed() {},
};
</script>

<style scoped>

</style>
