<template>
  <div>
    <v-container class="pa-0">
      <v-row no-gutters>
        <!-- <v-col
          cols="12"
          sm="2"
          class="d-none d-sm-block"
        >
          <v-card
            class="pa-2"
            outlined
            tile
            :style="`height: ${minSize}px`"
          >
            <app-menu/>
          </v-card>
        </v-col> -->
        <v-col>
          <v-card
            class="pa-2"
            flat
            color="transparent"
            :style="`height: ${minSize}px`"
          >
            <liste/>
          </v-card>
        </v-col>
        <!-- <v-col
          cols="12"
          sm="2"
          class="d-none d-md-block"
        >
          <v-card
            class="pa-2"
            outlined
            tile
            :style="`height: ${minSize}px`"
          >
            <pub/>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import liste from '@/components/site/blog/liste.vue';
// import menu from '@/components/site/blog/menu.vue';
// import pub from '@/components/site/blog/pub.vue';

export default {
  components: {
    liste,
    // appMenu: menu,
    // pub,
  },
  computed: {
    ...mapState([
      'minSize',
    ]),
  },
  mounted() {},
};
</script>

<style>

</style>
