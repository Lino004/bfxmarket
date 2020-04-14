<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="modules.nameModule"/>
     <section>
        <v-container fill-height v-html="modules.content">
        </v-container>
        <v-container>
            <v-row class="justify-space-between">
                <v-col md="1">
                    <v-btn icon color="black">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col md="1" class="align-end">
                    <v-btn icon color="black">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
          <v-row justify="space-around">
            <v-col md="4" class="mb-3 mx-2" v-for="(chapitre, i) in chapitres" :key="i">
              <CardImg
                :data="chapitre"
                dataBtn="Lire le chapitre"
                :index="i"
                @action="startFormation"/>
            </v-col>
          </v-row>
        </v-container>
     </section>
    </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import CardImg from '@/components/site/general/CardImg.vue';

export default {
  components: { PageTitle, CardImg },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Formation',
        disabled: false,
        to: { name: 'bfx-formation', params: { idFormation: 1 } },
      },
      {
        text: 'Modules',
        disabled: true,
      },
    ],
    modules: {
      nameModule: 'Module 1',
      content: `<h1>Titre du module</h1>
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
    chapitres: [
      {
        title: 'Chapitre 1',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
      {
        title: 'Chapitre 2',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
      {
        title: 'Chapitre 3',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
      {
        title: 'Chapitre 4',
        img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
        active: true,
      },
    ],
  }),
  methods: {
    startFormation() {
      return this.$router.push({ name: 'bfx-chapitre' });
    },
  },
};
</script>

<style>

</style>
