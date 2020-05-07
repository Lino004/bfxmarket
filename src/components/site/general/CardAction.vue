<template>
  <v-card
    class="pa-2 text-center card-info"
    outlined
    tile
    v-animate-css="{
      classes: 'zoomIn',
      duration: 4000 + index * 2000,
    }"
  >
    <h2 class="text-center">
      {{titre}}
    </h2>
    <v-card-text class="black--text">
      {{description}}
    </v-card-text>
    <span>
      <v-btn
        class="my-2"
        color="bg-blue-grad"
        v-if="userStatus === 'Online'"
        :disabled="isLock"
        @click="$emit('action')">
        {{libelleBtn}}
      </v-btn>
      <ModalAuth v-else
        justify=""
        custum-class="my-2 bg-blue-grad v-size--default"
        :type="'inscription'"/>
    </span>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalAuth from '@/components/site/auth/ModalAuth.vue';

export default {
  components: {
    ModalAuth,
  },
  props: {
    titre: String,
    description: String,
    libelleBtn: String,
    isLock: Boolean,
    index: Number,
  },
  computed: {
    ...mapGetters([
      'userStatus',
    ]),
  },
};
</script>

<style>

</style>
