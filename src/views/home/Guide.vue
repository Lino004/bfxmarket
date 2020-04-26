<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Guide gratuit pour debutant"/>
    <v-container class="d-flex justify-center">
      <content-guide></content-guide>
    </v-container>
  </div>
</template>

<script>
import ContentGuide from '@/components/site/ContentGuide.vue';
import PageTitle from '@/components/site/general/PageTitle.vue';

export default {
  components: { ContentGuide, PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Guide Trading',
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
