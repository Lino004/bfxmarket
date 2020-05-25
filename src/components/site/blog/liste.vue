<template>
  <div class="liste-article-blog is-invisible-scroll">
    <v-row>
      <v-col>
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line
          placeholder="Recherche..."
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="n in 15"
        :key="n"
        cols="12"
        sm="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          v-ripple
          @click="$router.push({ name: 'bfx-article', params: { id: 0 } })"
        >
          <v-img
            class="white--text align-end"
            height="150px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <div class="pa-2">
              <h4>Top 10 Australian beaches</h4>
              <p class="mb-0 caption">Number 10</p>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
