<template>
  <section class="white">
    <Bande title="Qui Sommes-Nous?"/>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row align="center" class="fill-height">
            <v-col class="text-center">
              <p class="mb-0">
                {{page.resume}}
              </p>
              <v-btn
                small
                color="bg-blue-grad my-2"
                :to="{ name: 'bfx-faisons' }">
                En savoir plus
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="d-none d-sm-flex">
          <v-row justify="center" class="fill-height">
            <v-img src="https://image.flaticon.com/icons/png/512/32/32441.png" max-width="250"></v-img>
          </v-row>
        </v-col>
      </v-row>
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
    get() {
      const key = 'que-faisons-nous';
      db.ref(this.ref).orderByKey().equalTo(key).once('value')
        .then((snap) => {
          this.page = snap.val()[key];
        });
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
