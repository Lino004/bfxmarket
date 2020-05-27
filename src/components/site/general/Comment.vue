<template>
  <div class="pb-8">
    <h4>Laisser un témoignage:</h4>
    <v-row no-gutters class="pt-4">
      <v-col cols="12">
        <v-textarea
          label="Entrez votre témoignage"
          outlined
          rows="3"
          hide-details
          v-model="contenu"
        ></v-textarea>
        <v-btn
          color="primary"
          class="mt-2"
          :disabled="!contenu"
          @click="create">
          Envoyer
        </v-btn>
      </v-col>
    </v-row>
     <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
// import AvatarUser from './AvatarUser.vue';
import { createComment } from '@/api/comment/index';
import { mapGetters } from 'vuex';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: { SnackComp },
  props: {
    idChap: Number,
  },
  data: () => ({
    contenu: '',
    isLoad: false,
    valueSnack: false,
    colorSnack: '',
    message: '',
  }),
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async create() {
      this.isLoad = true;
      try {
        const data = {
          contenu: this.contenu,
          chapitre: this.idChap,
          user: this.user.identifiant,
        };
        await createComment(data);
        this.contenu = '';
        this.showSnackComp('Témoignage enregistré', 'success');
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
};
</script>

<style>

</style>
