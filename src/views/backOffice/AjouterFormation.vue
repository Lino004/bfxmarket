<template>
  <div style="width: 100%" class="ma-3">
    <v-row >
      <v-col>
        <h2>Ajout d'une formation</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary">
          Enregistrer
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col
        cols="12"
        sm="3"
      >
        <UploadImg/>
      </v-col>
      <v-col>
      <v-text-field
        label="Titre de la formation"
        outlined
        append-icon="card-text"
        v-model="formation.titre"
        hide-details
        class="mb-2"/>
      <v-textarea
        label="Description de la formation"
        outlined
        v-model="formation.description"
        hide-details
      ></v-textarea>
      </v-col>
    </v-row>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import SnackComp from '@/components/site/general/SnackComp.vue';
import UploadImg from '@/components/backOffice/general/UploadImg.vue';
// import createFormation from '@/api/formations/index';

export default {
  components: {
    SnackComp,
    UploadImg,
  },
  data() {
    return {
      valueSnack: false,
      colorSnack: '',
      message: '',
      formation: {
        titre: '',
        niveau: '',
        description: '',
        image: {
          code: '',
          ext: '',
        },
      },
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style>

</style>
