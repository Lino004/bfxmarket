<template>
  <v-list dense>
    <div
      v-for="item in links"
      :key="item.title">
      <v-list-group
        v-if="item.hasOwnProperty('child') && item.show"
        :prepend-icon="item.icon"
        no-action
        class="test">
        <template v-slot:activator>
          <v-list-item-title class="white--text" v-text="item.text"/>
        </template>
        <v-list-item
          v-for="(child, index) in item.child.filter(el => el.show)"
          :key="index"
          :to="child.to"
          :disabled="child.disabled">
          <v-list-item-title class="white--text" v-text="child.text"/>
          <v-list-item-icon>
            <v-icon color="white"> {{child.icon}} </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item
        v-if="!item.hasOwnProperty('child') && item.show"
        :to="item.to"
        :disabled="item.disabled">
        <v-list-item-icon>
          <v-icon color="white">{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text" v-text="item.text"/>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import getMenu from '@/services/menuBackOffice';

export default {
  data() {
    return {
      links: [],
    };
  },
  mounted() {
    this.links = getMenu();
  },
};
</script>

<style>
.test > .v-list-item > .v-list-group__header__prepend-icon > i{
  color: white !important;
}
</style>
