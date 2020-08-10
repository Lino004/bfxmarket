<template>
  <v-app light>
    <div>
      <Drawer/>
      <TopBar/>
      <v-main v-resize="onResize" :style="`min-height: ${minHeight}px`">
        <router-view/>
      </v-main>
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
  watch: {
    currentRoute() {
      this.onResize();
    },
  },
  computed: {
    ...mapGetters([
      'sizeTopBar',
      'sizeFooter',
    ]),
    minHeight: {
      get() {
        if (!this.sizeFooter) return 0;
        if (!this.sizeTopBar) return 0;
        return this.windowsSize.y - (this.sizeTopBar.y + this.sizeFooter.y);
      },
      set(val) {
        this.setMinSize(val);
      },
    },
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapMutations({
      setSizeWindows: 'SET_SIZE_WINDOWS',
      setMinSize: 'SET_MIN_SIZE',
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
      this.setMinSize(this.minHeight);
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
