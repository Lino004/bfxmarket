<template>
  <section class="white">
    <Bande title="Qui Sommes-Nous?"/>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row align="center" class="fill-height">
            <v-col class="text-center">
              <p class="mb-0">
                Incididunt aliqua aute aute sunt velit commodo sunt eu in quis.
                In reprehenderit esse veniam consequat cupidatat ad esse veniam
                cupidatat consectetur. Tempor proident magna occaecat commodo fugiat
                laborum sit ex esse tempor adipisicing. Ad veniam voluptate pariatur
                culpa consectetur.
              </p>
              <v-btn
                small
                color="bg-blue-grad my-2"
                @click="setEnDev(true)">
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
import Bande from '@/components/site/general/Bande.vue';

export default {
  components: { Bande },
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
  },
};
</script>

<style>

</style>
