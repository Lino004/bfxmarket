<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Parrainage"/>
    <v-container class="d-flex justify-center">
      <ModalAuth
        justify=""
        :parrainage="true"
        custum-class="mx-2 hidden-sm-and-down" :type="'inscription'"/>
    </v-container>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import ModalAuth from '@/components/site/auth/ModalAuth.vue';
import { mapMutations } from 'vuex';

export default {
  components: { PageTitle, ModalAuth },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Parrainage',
        disabled: true,
      },
    ],
  }),
  methods: {
    ...mapMutations({
      setIdParrainage: 'SET_ID_PARRAINAGE',
    }),
  },
  mounted() {
    const { id } = this.$route.params;
    this.setIdParrainage(id);
  },
};
</script>

<style>

</style>
