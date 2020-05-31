<template>
  <avatar :username="userName" :size="size"/>
</template>

<script>
import { mapGetters } from 'vuex';
import avatar from 'vue-avatar';

export default {
  props: {
    size: {
      type: Number,
      default: 50,
    },
  },
  components: { avatar },
  computed: {
    ...mapGetters([
      'user',
    ]),
    userName() {
      if (this.user) {
        return `${this.user.nom.split(' ')[0]} ${this.user.prenom.split(' ')[0]}`;
      }
      return '';
    },
  },
};
</script>

<style>

</style>
