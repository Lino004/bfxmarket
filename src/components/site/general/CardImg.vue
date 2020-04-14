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
          :src="img"
          max-height="200"
          @error="imgError"
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
          <div v-html="data.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center class="ma-2">
            <v-btn
              small
              :color="data.active ? 'bg-blue-grad' : 'grey'"
              @click="$emit('action')"
              :disabled="!data.active">
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
  data: () => ({
    defaultImg: '',
  }),
  computed: {
    img() {
      if (this.defaultImg) return this.defaultImg;
      return this.data.img;
    },
  },
  methods: {
    imgError() {
      this.defaultImg = 'https://firebasestorage.googleapis.com/v0/b/wfxschool.appspot.com/o/Slide%2Fpexels-photo-186464.jpeg?alt=media&token=f68b8056-330b-4eaf-99f6-e9eec8f54018';
    },
  },
};
</script>
