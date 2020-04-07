<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" title="Que fait WFX School ?"/>
     <section>
        <v-container fill-height>
          <div v-html="page.content"></div>
        </v-container>
     </section>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
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
        text: 'Que Faisons nous',
        disabled: true,
      },
    ],
    page: {
      content: '',
      resume: '',
    },
    ref: 'page/',
  }),
  methods: {
    get() {
      const key = 'que-faisons-nous';
      db.ref(this.ref).orderByKey().equalTo(key).once('value')
        .then((snap) => {
          this.page = snap.val()[key];
        });
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
