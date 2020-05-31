<template>
  <section>
    <v-container>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Témoignages</h1>
      <v-window
        show-arrows
      >
        <v-window-item
          v-for="(etu, i) in etudiants"
          :key="i"
        >
          <v-card flat tile>
            <h3 class="text-center"> {{etu.name}} </h3>
            <v-card-text class="black--text text-justify">
              <div v-html="etu.comment"></div>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
// import { listeComment } from '@/api/comment/index';

export default {
  components: { },
  data: () => ({
    model: null,
    etudiants: [
      {
        img: '',
        name: 'Dieudonné S.',
        status: 'Trader Maser',
        comment: `Cher WfxSchool, <br/>
          Un ENORME merci pour votre formation précieuse, de qualité et structurante pour la suite de ma vie. <br/>
          Certains diront que j’y vais un peu fort, mais je le pense sincèrement ! <br/>
          L’école m’a permis de découvrir la meilleure stratégie d'intervention sur les machés financiers
          à travers  des vidéos très concrètes, des explications claires. <br/>
          Quel que soit votre niveau actuel , si vous voulez atteindre l'excellence en trading,
          je vous recommande vraiment d’investir dans une de ces formations proposées par WfxSchool,
          vous gagnerez du temps et vous comprendrez en très peu de temps  les mécanismes des marchés financiers.`,
      },
      {
        img: '',
        name: 'Jean-Michael GBENONZAN',
        status: 'Trader Maser',
        comment: `Je me nomme Jean-Michael GBENONZAN'
          l'un de des étudiant de WFxSchool. Bien avant de suivre la formation chez WFxSchool je vous note
          que j'ai suivi beaucoup de formations  chez d'autres traders qui se disent expert en la matière mais
          hélas je ne sors toujours gagnant de mes trades. Mes bilans étaient toujours négatifs.
          J'ai entendu parler de WFxSchool. Je me suis intéressé à eux et surtout à travers leur
          devise qui stipule que Personne n’évolue seule et nul n’a le droit d’être heureux tout seul et en plus
          leur formation était complètement gratuite ce qui n'est pas pareille avec mes précédents soit disant formateur en trading.
          Je me suis inscrit sur leur plateforme et j'ai suivi leur formation durant 3 mois.
          Une période au cours de laquelle j'ai côtoyé beaucoup d'expert en trading tel que notre formateur Mr Alao Fari Khalid.
          Un Mr très sympa, claire et très précis dans ses explications, un Mr qui prône le travail bien fait. En bref je peux
          vous dire grâce à WFxSchool et à ses formateurs je suis devenu un trader très rentable.
          Je vis maintenant et pleinement de trading. Je vous recommande WFxSchool`,
      },
      {
        img: '',
        name: 'The Light',
        status: 'Trader Maser',
        comment: `Ah la vie, qui pourrait croire qu'aujourd'hui, je pourrais parler de trading sans que mon coeur ne se mette à battre fort 😂. <br/>
          Encore merci coach, sans cette formation, je ne sais pas dans quel état d'âme je serai aujourd'hui. <br/>
          J'ai vu l'espoir sous Bluefx market.  Infiniment merci et que Dieu vous accorde la santé qu'il faut pour aider encore plus de personnes 😊`,
      },
    ],
    isClick: false,
  }),
  computed: {
    ...mapGetters([
      'userStatus',
    ]),
    /* currentClient() {
      if (this.model) return this.etudiants[this.model];
      return {
        img: '',
        name: '',
        status: '',
        comment: '',
      };
    },
    s4Height() {
      if (this.isClick) {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '500px';
          default: return '400px';
        }
      }
      return '400px';
    }, */
  },
  methods: {
    /* userAbb(name) {
      if (name) {
        const split = name.split(' ');
        return split[0][0] + split[1][0];
      }
      return '';
    }, */
  },
};
</script>

<style>

</style>
