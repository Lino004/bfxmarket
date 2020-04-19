<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Souscription"/>
    <v-container class="d-flex justify-center">
      souscription
    </v-container>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';

export default {
  components: { PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Souscription',
        disabled: true,
      },
    ],
  }),
  methods: {
  },
};
</script>

<style>

</style>
