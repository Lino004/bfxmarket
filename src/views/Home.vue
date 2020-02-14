<template>
  <v-app light>
    <TopBar/>
    <v-content>
      <PrincipalSection/>

      <Section2/>

      <Section3/>

      <Section4/>
    </v-content>
    <v-footer color="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-4">
            Made with
            <v-icon class="red--text">heart</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import TopBar from '@/components/site/home/TopBar.vue';
import PrincipalSection from '@/components/site/home/PrincipalSection.vue';
import Section2 from '@/components/site/home/Section2.vue';
import Section3 from '@/components/site/home/Section3.vue';
import Section4 from '@/components/site/home/Section4.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    PrincipalSection,
    Section2,
    Section3,
    Section4,
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
