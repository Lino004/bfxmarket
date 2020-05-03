<template>
  <section>
    <!-- <v-container class="is-scroll is-invisible-scroll my-5"
    :style="`max-height: ${s4Height};`">
      <v-card flat v-for="(etu, index) in etudiants" :key="index">
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-avatar color="black" class="mr-4">
               <img
                  v-if="etu.img"
                  :src="etu.img"
                >
              <span
                v-else
                class="white--text headline">
                {{ userAbb(etu.name) }}
              </span>
            </v-avatar>
            <strong class="title">{{ etu.name }}</strong>
            <v-spacer></v-spacer>
          </v-row>

          <p class="black--text mb-0"  v-html="etu.comment">
          </p>

        </v-card-text>
      </v-card>
    </v-container> -->
    <v-container>
      <div class="barre bg-blue-grad mb-5"></div>
      <h1 class="text-center" v-animate-css="'fadeInDown'">Pourquoi suivre nos formations ?</h1>
      <v-row class="my-5">
        <v-col cols="12" sm="6" md="4" v-for="(item, i) in items" :key="i">
          <v-avatar class="cercle-info pa-9">
            <div>
              <h3> {{item.titre}} </h3>
              {{item.contenu}}
            </div>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="5">
          <v-btn
            class="my-2"
            color="bg-blue-grad"
            v-if="userStatus === 'Online'"
            :to="{ name: 'bfx-nos-formations' }"
            block>
            Débutez dès maintenant vôtre formation
          </v-btn>
          <ModalAuth v-else
            justify=""
            custum-class="my-2 bg-blue-grad v-btn--block v-size--default"
            :type="'inscription'"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalAuth from '@/components/site/auth/ModalAuth.vue';

export default {
  components: { ModalAuth },
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
    items: [
      {
        titre: 'LA QUALITE',
        contenu: 'Toute nos formations vous apprennent à rentabilisez sur le marché. Nous vous formons à utiliser les méthodes professionnelles complètes et efficaces. A la fin, vous aurez votre propre stratégie gagnante.',
      },
      {
        titre: 'LE COACHING',
        contenu: 'Tout au long de nos formations vous aurez un coach personnel pour vous assister et répondre à vos préoccupations. Il sera avec vous après votre formation aussi. La mentalité étant importante pour le trader, vous aurez un psychologue personnel pour vous aider à gérer le mental ; les émotions et le stress dans votre parcours de trading.',
      },
      {
        titre: 'PERSONNEL',
        contenu: 'Nos formations sont adaptées à chaque profil et style de Trade. Vous avancerez en fonction de votre rythme d’évolution et d’assimilation : Suivez la formation en fonction de votre disponibilité',
      },
      {
        titre: 'Une communauté de traders',
        contenu: 'Peu importe la formation à laquelle vous souscrivez, vous intégrez une communauté d’élèves où vous pourrez échanger, partager vos analyses et commenter celles des autres.',
      },
      {
        titre: 'Accès illimité',
        contenu: 'Ayez un accès h24 et à vie aux formation auxquelles vous souscrivez',
      },
      {
        titre: 'Un Compte de trading réel',
        contenu: 'A la fin de la formation, nous offrons aux cinq meilleurs étudiants un compte réel d’une valeur de 100 à 500$.',
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
