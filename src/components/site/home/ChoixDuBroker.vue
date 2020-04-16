<template>
  <section class="white">
    <Bande title="Choix du broker"/>
    <v-container>
      <div v-html="page.content"></div>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import db from '@/plugins/firebase';
import Bande from '@/components/site/general/Bande.vue';

export default {
  components: { Bande },
  data: () => ({
    page: {
      content: '',
      resume: '',
    },
    ref: 'page/',
  }),
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
    async get() {
      try {
        const key = 'guide';
        const responce = await db.ref(this.ref).orderByKey().equalTo(key).once('value');
        const chaps = Object.values(responce.val()[key]);
        chaps.sort((a, b) => a.titre.split(' ')[0] - b.titre.split(' ')[0]);
        // eslint-disable-next-line prefer-destructuring
        this.page = chaps[0];
      } catch (error) {
        this.chaps = [];
      }
    },
  },
  async mounted() {
    await this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
