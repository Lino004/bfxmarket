<template>
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
            <v-flex xs12 sm4>
              <v-layout justify-center>
                <v-card class="transparent" flat max-width="300">
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
                  <v-card-actions>
                    <v-layout justify-end>
                      <v-btn class="mx-2" fab dark small color="primary" @click="setEnDev(true)">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm4>
              <v-layout justify-center>
                <v-card class="transparent" flat max-width="300">
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
                  <v-card-actions>
                    <v-layout justify-end>
                      <v-btn class="mx-2" fab dark small color="primary" @click="setEnDev(true)">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm4>
              <v-layout justify-center>
                <v-card class="transparent" flat max-width="300">
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
                  <v-card-actions>
                    <v-layout justify-end>
                      <v-btn class="mx-2" fab dark small color="primary" @click="setEnDev(true)">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
  },
};
</script>

<style>

</style>
