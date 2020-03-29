<template>
    <v-sheet height="80" tile>
      <div :class="`bande-bg ${position} bg-blue-grad`"></div>
      <div class="bande-bg">
        <v-container fill-height>
          <v-row>
            <v-col sm="6" cols="12" v-if="position === 'right'">
              <div class="text-center headline font-weight-bold">
                {{title}}
              </div>
            </v-col>
            <v-col sm="6" cols="12" offset-sm="6" v-if="position === 'left'">
              <div class="text-center headline font-weight-bold">
                {{title}}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-sheet>
</template>

<script>
export default {
  props: {
    title: String,
    position: {
      type: String,
      default: 'left',
    },
  },
};
</script>
