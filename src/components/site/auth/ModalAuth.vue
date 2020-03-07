<template>
  <v-row :justify="justify">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          v-on="on"
          small
          text
          v-if="type === 'connexion'"
          :class="custumClass">
          Connexion
        </v-btn>
        <v-btn
          dark
          v-on="on"
          small
          text
          v-if="type === 'inscription'"
          :class="custumClass">
          Inscription
        </v-btn>
      </template>
      <Connexion @annuler="dialog = false"  v-if="type === 'connexion'"/>
      <Inscription @annuler="dialog = false" v-if="type === 'inscription'"/>
    </v-dialog>
  </v-row>
</template>

<script>
import Connexion from '@/components/site/auth/Connexion.vue';
import Inscription from '@/components/site/auth/Inscription.vue';

export default {
  props: {
    type: String,
    custumClass: {
      type: String,
      default: '',
    },
    justify: {
      type: String,
      default: 'center',
    },
  },
  components: {
    Connexion,
    Inscription,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
