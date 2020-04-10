<template>
  <v-sheet
    tile
    :elevation="0"
    min-height="10vh"
    color="grey lighten-2"
    v-resize="onResize"
    id="pageTitle">
    <v-container fill-height>
      <v-row>
        <v-col cols="12" md="4" class="hidden-sm-and-down">
          <h2 class="title primary--text">
            {{currentPage}}
          </h2>
          <v-breadcrumbs light class="pl-0 pt-2" :items="breadcrumbs"/>
        </v-col>
        <v-col cols="12" md="5" class="d-flex align-center justify-center">
          <h2 class="display-1 text-center font-weight-bold text-uppercase">
            {{title}}
          </h2>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    breadcrumbs: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  computed: {
    currentPage() {
      const find = this.breadcrumbs.find(el => el.disabled);
      return find.text;
    },
  },
  methods: {
    ...mapMutations({
      setSizePageTitle: 'SET_SIZE_PAGE_TITLE',
    }),
    onResize() {
      this.setSizePageTitle({
        x: document.querySelector('#pageTitle').clientWidth,
        y: document.querySelector('#pageTitle').clientHeight,
      });
    },
  },
};
</script>

<style>

</style>
