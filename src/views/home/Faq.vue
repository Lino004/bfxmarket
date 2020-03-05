<template>
  <div style="min-height: 100%" class="bg-white-5">
    <v-sheet
      tile
      :elevation="0"
      min-height="10vh">
      <v-container fill-height>
        <v-row>
          <v-col cols="12" class="d-bloc justify-center">
            <h2 class="title primary--text">
              FAQ
            </h2>
            <v-breadcrumbs class="pl-0 pt-2" :items="items"/>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
      <!-- <v-img :src="require('@/assets/img/stock.jpg')" max-height="20vh"></v-img> -->
    <section>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="title font-weight-black text-center pb-8">
              Questions frequemment posées
            </h2>
            <v-row justify="center">
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="(item,i) in 10"
                  :key="i"
                >
                  <v-expansion-panel-header class="border-blue-btm">Item</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'FAQ',
        disabled: true,
      },
    ],
  }),
};
</script>

<style>

</style>
