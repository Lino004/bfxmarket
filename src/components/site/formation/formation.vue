<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="formation.nameFormation"/>
     <section>
        <v-container fill-height v-html="formation.content">
        </v-container>
     </section></div>
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
        text: 'Formation',
        disabled: true,
      },
    ],
    formation: {
      nameFormation: 'Formation Débutante',
      content: `<h1>Titre de ce que nous faisons1</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            Cras elementum ultrices diam. Maecenas ligula massa, varius a,
            semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
            enim est eleifend mi, non fermentum diam nisl sit amet erat.
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
            enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
            Cras vestibulum bibendum augue. Praesent egestas leo in pede.
            Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
            pellentesque fermentum.
            Maecenas adipiscing ante non diam sodales hendrerit.
            </p>`,
    },
    modules: [
      {
        title: 'Module 1',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        description: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
      },
      {
        title: 'Module 2',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        description: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
      },
    ],
  }),
  methods: {
  },
};
</script>

<style>

</style>
