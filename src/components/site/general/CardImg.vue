<template>
  <v-layout justify-center>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        max-width="300"
        v-animate-css="{
          classes: 'zoomIn',
          duration: 4000 + index * 2000,
        }"
        @click="showModal">
        <div
          class="p-absolute btn-souscription"
          v-if="canSouscrip">
          <v-btn color="red accent-2" @click="showModal">
            <p class="mb-0 white--text">
              {{data.price}} $ <span class="caption text-lowercase">le tout</span>
            </p>
          </v-btn>
        </div>
        <v-img
          class="align-end"
          :class="data.active ? 'white--text card-bg-img-black'
                                    : 'grey--text card-bg-img-grey'"
          :src="img"
          height="200"
          @error="imgError"
        >
          <v-card-title class="title white--text">
            <v-row
              class="fill-height flex-column"
              justify="space-between"
            >
              <v-icon size="90" v-if="!data.active">mdi-lock</v-icon>
              <p class="mb-0 subheading text-center"
                  :class="{'grey--text': !data.active}">
                {{ data.title }}
              </p>
            </v-row>
          </v-card-title>
        </v-img>
        <v-card-actions>
          <v-layout justify-center class="ma-2">
            <ModalAuth v-if="userStatus !== 'Online'"
              justify=""
              custum-class="mx-2 primary" :type="'connexion'"/>
            {{userStatus === 'Online' ? '' : '/'}}
            <ModalAuth v-if="userStatus !== 'Online'"
              justify=""
              custum-class="mx-2 primary" :type="'inscription'"/>
            <v-btn
              small
              v-else
              :color="colorBtn"
              @click.prevent="$emit('action')"
              :disabled="!(data.active && data.to_continue)">
              {{dataBtn}}
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-hover>
    <ModalSouscription
      v-model="modal"
      :service="data"
      :type-service="typeServiceModule"
      :id-module="data.id"
      :show-btn="false"/>
  </v-layout>
</template>

<script>
import ModalAuth from '@/components/site/auth/ModalAuth.vue';
import ModalSouscription from '@/components/site/formation/souscription.vue';
import { mapGetters } from 'vuex';
import {
  TYPE_SERVICE_MODULE,
} from '@/configuration/souscription';

export default {
  components: {
    ModalAuth,
    ModalSouscription,
  },
  props: {
    data: Object,
    dataBtn: String,
    index: Number,
  },
  data: () => ({
    defaultImg: '',
    user: JSON.parse(localStorage.getItem('user')),
    typeServiceModule: TYPE_SERVICE_MODULE,
    modal: false,
  }),
  computed: {
    ...mapGetters([
      'userStatus',
    ]),
    img() {
      if (this.defaultImg) return this.defaultImg;
      return this.data.img;
    },
    colorBtn() {
      if (this.data.active && this.data.to_continue) return 'bg-blue-grad';
      return 'grey';
    },
    canSouscrip() {
      return this.userStatus === 'Online' && !(this.data.active && this.data.to_continue) && this.data.price;
    },
  },
  methods: {
    imgError() {
      this.defaultImg = 'https://firebasestorage.googleapis.com/v0/b/wfxschool.appspot.com/o/Slide%2Fpexels-photo-186464.jpeg?alt=media&token=f68b8056-330b-4eaf-99f6-e9eec8f54018';
    },
    showModal() {
      if (this.canSouscrip) this.modal = true;
    },
  },
};
</script>

<style scoped>
.btn-souscription{
  z-index: 100;
}
</style>
