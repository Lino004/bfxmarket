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
    tabMeta: [
      {
        property: 'og:description',
        content: 'Gagner du temps et augmenter considérablement vos revenus grâce au trading. Prédire les quatre futurs mouvement des marchés financiers, c’est désormais possible grâce au programme de formation gratuite initié par WfxSchool. Rejoignez la formation en cliquant sur ce lien :',
      },
    ],
  }),
  methods: {
    ...mapMutations({
      setIdParrainage: 'SET_ID_PARRAINAGE',
    }),
    addMeta() {
      const htmlDoc = document.getElementsByTagName('head')[0];
      this.tabMeta.forEach((el) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', el.property);
        meta.setAttribute('content', el.content);
        htmlDoc.appendChild(meta);
      });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.setIdParrainage(id);
  },
};
</script>

<style>

</style>
