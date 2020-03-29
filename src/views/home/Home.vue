<template>
  <div>
    <PrincipalSection/>
    <Section2/>
    <Section4/>
    <Section3/>
    <Section5/>
  </div>
</template>

<script>
import PrincipalSection from '@/components/site/home/PrincipalSection.vue';
import Section2 from '@/components/site/home/Section2.vue';
import Section3 from '@/components/site/home/Section3.vue';
import Section4 from '@/components/site/home/Section4.vue';
import Section5 from '@/components/site/home/Section5.vue';

export default {
  components: {
    PrincipalSection,
    Section2,
    Section3,
    Section4,
    Section5,
  },
};
</script>

<style>

</style>
