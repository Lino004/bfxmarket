<template>
  <v-list dense>
    <div
      v-for="item in links"
      :key="item.title">
      <v-list-group
        v-if="item.hasOwnProperty('child')"
        :prepend-icon="item.icon"
        no-action>
        <template v-slot:activator>
          <v-list-item-title v-text="item.text"/>
        </template>
        <v-list-item
          v-for="(child, index) in item.child"
          :key="index"
          :to="child.to"
          :disabled="child.disabled">
          <v-list-item-title v-text="child.text"/>
          <v-list-item-icon>
            <v-icon> {{child.icon}} </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item
        v-else
        :to="item.to"
        :disabled="item.disabled">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="item.text"/>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import menu from '@/services/menuBackOffice';

export default {
  data() {
    return {
      links: menu,
    };
  },
};
</script>

<style>

</style>
