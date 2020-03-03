<template>
  <v-app light>
    <video-bg :sources="[require('@/assets/video/video001.mp4')]" img="demo/assets/bg.jpg">
      <TopBar/>
      <v-content>
        <PrincipalSection/>

        <Section2/>

        <Section3/>

        <Section4/>

        <Section5/>
      </v-content>
      <v-footer color="primary">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              Made with
              <v-icon class="red--text">heart</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huag</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </video-bg>
  </v-app>
</template>

<script>
import TopBar from '@/components/site/home/TopBar.vue';
import PrincipalSection from '@/components/site/home/PrincipalSection.vue';
import Section2 from '@/components/site/home/Section2.vue';
import Section3 from '@/components/site/home/Section3.vue';
import Section4 from '@/components/site/home/Section4.vue';
import Section5 from '@/components/site/home/Section5.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    PrincipalSection,
    Section2,
    Section3,
    Section4,
    Section5,
  },
  data() {
    return {};
  },
  methods: {},

  computed: {},

  mounted() {},
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
