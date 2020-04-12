<template>
  <div style="min-height: 100%" class="bg-white-5">
    <PageTitle :breadcrumbs="breadcrumbs" title="Questions frequemment posées"/>
    <section>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-row justify="center">
              <v-expansion-panels >
                <v-expansion-panel
                  v-for="(faq,i) in dataFaq"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    <v-row align="center" justify="center">
                      <div class="pr-3">
                        <v-avatar
                          left
                          class="green white--text"
                          size="30">
                          {{i+1}}
                        </v-avatar>
                      </div>
                      <v-col class="pa-0">
                        <h2 class="title pr-3">
                          {{faq.titre}}
                        </h2>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{faq.content}}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
import moment from 'moment';
import PageTitle from '@/components/site/general/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'FAQ',
        disabled: true,
      },
    ],
    dataFaq: [],
    snackbar: false,
    ref: 'page/faq/',
  }),
  computed: {
    currentPage() {
      return this.breadcrumbs.filter(el => el.disabled).text;
    },
  },
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    get() {
      db.ref(this.ref).on('value', (snap) => {
        if (snap.val()) {
          this.dataFaq = Object.values(snap.val());
          this.dataFaq.sort((a, b) => {
            if (moment(a.date).isBefore(b.date)) return -1;
            if (moment(a.date).isAfter(b.date)) return 1;
            return 0;
          });
        } else {
          this.dataFaq = [];
        }
      });
    },
    getNumeroFaq(id) {
      return this.dataFaq.map(el => el.id).indexOf(id) + 1;
    },
  },
  mounted() {
    this.get();
  },
  destroyed() {
    db.ref(this.ref).off();
  },
};
</script>

<style>

</style>
