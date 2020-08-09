<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Détail utilisateur
    </v-card-title>

    <v-card-text class="pa-5">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>Noms:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            {{ userSelect.nom + ' ' + userSelect.prenom }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Email:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            <div style="width: 100%">
              {{ userSelect.email }}
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Téléphone:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            {{ userSelect.phone }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Pays:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            {{ $parent.$parent.$parent.getPays(userSelect.pays).nom }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Status:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            <div>
              <v-chip
                :color="$parent.$parent.$parent.getStatus(userSelect.status).couleur"
                dark>
                {{ $parent.$parent.$parent.getStatus(userSelect.status).libelle }}
              </v-chip>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Nombre de parrainage:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            {{ userSelect.downline }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Lien de parrainage:</v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            <div>
              <v-chip
                color="green" dark
                @click.prevent="copieLien(userSelect.identifiant_url)">
                Copier le lien
              </v-chip>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content style="align-self: start;">
            Liste des souscriptions
          </v-list-item-content>
          <v-list-item-content class="align-end" style="flex: 2">
            <div>
              <div v-for="(chap, i) in getChapSousUser(userSelect.subscribes)" :key="i">
                <span>{{chap.formation + ': ' + chap.chap}}</span> <br>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$parent.$parent.$parent.showModal = false"
      >
        Fermer
      </v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
  props: {
    userSelect: Object,
    chapitres: Array,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    async copieLien(id) {
      this.loading = true;
      try {
        const getUrl = window.location;
        await this.$copyText(`${getUrl.protocol}//${getUrl.host}/home/parrainage/${id}`);
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Lien de parrainage copié',
          color: 'success',
        });
        this.loading = false;
      } catch (error) {
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Problème lors de la copie',
          color: 'error',
        });
        this.loading = false;
      }
    },
    getChapSousUser(listeSous) {
      if (!listeSous) return [];
      const data = this.chapitres.filter(el => listeSous.includes(el.id));
      const result = cloneDeep(data.map(el => ({
        formation: el.module.titre,
        chap: el.titre,
        id: el.id,
      })));
      return result.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
    },
  },
};
</script>

<style>

</style>
