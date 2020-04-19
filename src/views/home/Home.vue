<template>
  <div>
    <PrincipalSection/>
    <Section2/>
    <ChoixDuBroker/>
    <Section3/>
    <Section4/>
    <Section5/>
    <SnackComp/>
  </div>
</template>

<script>
import PrincipalSection from '@/components/site/home/PrincipalSection.vue';
import Section2 from '@/components/site/home/Section2.vue';
import Section3 from '@/components/site/home/Section3.vue';
import Section4 from '@/components/site/home/Section4.vue';
import Section5 from '@/components/site/home/Section5.vue';
import ChoixDuBroker from '@/components/site/home/ChoixDuBroker.vue';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    PrincipalSection,
    Section2,
    Section3,
    Section4,
    Section5,
    ChoixDuBroker,
    SnackComp,
  },
};
</script>

<style>

</style>
