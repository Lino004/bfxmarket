<template>
  <v-layout justify-center>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        max-width="300"
        v-animate-css="{
          classes: 'zoomIn',
          duration: 4000 + index * 2000,
        }">
        <v-img
          class="align-end"
          :class="data.active ? 'white--text card-bg-img-black'
                                    : 'grey--text card-bg-img-grey'"
          :src="data.img"
          max-height="200"
        >
          <v-card-title class="title white--text">
            <v-row
              class="fill-height flex-column"
              justify="space-between"
            >
              <v-icon size="90" v-if="!data.active">mdi-lock</v-icon>
              <p class="mb-0 subheading text-center"
                  :class="{'grey--text': !data.active}">
                {{ data.title }}
              </p>
            </v-row>
          </v-card-title>
        </v-img>
        <v-card-text
          :class="data.active ? 'black--text' : 'grey--text'">
          {{data.content}}
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center class="ma-2">
            <v-btn
              small
              :color="data.active ? 'bg-blue-grad' : 'grey'"
              @click="$emit('action')">
              {{dataBtn}}
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-layout>
</template>

<script>
export default {
  props: {
    data: Object,
    dataBtn: String,
    index: Number,
  },
};
</script>
