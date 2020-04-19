<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
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
      <Inscription
        @annuler="dialog = false"
        :parrainage="parrainage"
        v-if="type === 'inscription'"/>
    </v-dialog>
  </div>
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
    parrainage: Boolean,
  },
  components: {
    Connexion,
    Inscription,
  },
  data: () => ({
    dialog: false,
  }),
  mounted() {
    if (this.parrainage) this.dialog = this.parrainage;
  },
};
</script>
