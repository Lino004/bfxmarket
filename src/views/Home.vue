<template>
  <v-app light>
    <v-app-bar color="white" fixed>
      <v-container mx-auto py-0>
        <v-layout align-center>
          <v-img
            :src="require('@/assets/logo.png')"
            class="mr-5"
            contain
            height="48"
            width="48"
            max-width="48"/>
        </v-layout>
      </v-container>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        text
        small
        color="primary"
        class="ml-0 hidden-sm-and-down">
        <span class="black--text">{{ link.text }}</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <section>
        <v-parallax src="../assets/bg001.png" height="600">
         <v-layout
            align-end
            justify-center
            class="white--text"
          >
            <v-card color="transparent"
                    class="white--text"
                    width="300"
                    flat>
              <v-img
                :src="require('@/assets/logo.png')"
                class="mr-5"
                contain
                height="200"/>
              <h1 class="white--text mb-2 display-1">
                Blue FxMarket <br> Incorporation
              </h1>
              <p>
                TRADEZ LES MARCHES FINANCIERS EN COPIANT LES SIGNAUX DONNES PAR NOTRE
                EQUIPE D'EXPERTS EN ANALYSE TECHNIQUE DANS NOTRE CANAL PUBLIC SUR TELEGRAM!
              </p>
            </v-card>
            <img src="../assets/screen.webp" height="500">
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        >
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="headline">Profitez en 3 étapes toutes simples!</h2>
              <span class="subheading">
                Rien de plus facile
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-start>
                <v-flex xs12 md4>
                  <v-card class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large color="primary">
                        mdi-numeric-1-circle
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Rejoignez-nous!</div>
                    </v-card-title>
                    <v-card-text>
                      Rejoignez notre canal telegram gratuit
                      pour bénéficier de nos signaux à plus de 90% de précision!
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large color="primary">
                        mdi-numeric-2-circle
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Copiez nos signaux!</div>
                    </v-card-title>
                    <v-card-text>
                      Nous faisons tout le travail pour vous!
                      Procédez par de simples "copier-coller" des signaux fournis!
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large color="primary">
                        mdi-numeric-3-circle
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Faites du profit!</div>
                    </v-card-title>
                    <v-card-text>
                      Faites des profits énormes en prenant de
                      faibles risques grâce à la performance de notre équipe!
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="../assets/bg2.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">
              Web development has never been easier
            </div>
            <em>Kick-start your application today</em>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra.
                  Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus
                  et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae
                  tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>777-867-5309</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-bus-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Chicago, US</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>john@vuetifyjs.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer color="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              Made with
              <v-icon class="red--text">heart</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      links: [
        {
          text: 'Accueil',
          to: '/',
        },
      ],
    };
  },
  methods: {},

  computed: {},

  mounted() {},
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
