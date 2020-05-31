 <template>
  <div style="width: 100%" class="ma-3">
    <v-row>
      <v-col>
        <h2>Liste des utilisateurs</h2>
      </v-col>
      <v-col class="text-end">
        <v-btn
          small
          color="primary"
          class="mr-2"
          :to="{ name: 'back-office-ajout-article' }">
          Ajouter
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              color="primary"
              v-on="on"
              disabled>
              Actions
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Valider des souscriptions</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Envoyer des e-mails</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Archiver des utilisateurs</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="data"
      show-select
      class="elevation-1 mt-4"
    >
      <template v-slot:item.created_date="{ item }">
        {{formatDate(item.created_date)}}
      </template>
      <template v-slot:item.description="{ item }">
        <div
          v-html="item.description"
          class="d-inline-block text-truncate"
          style="width: 100%"/>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          fab
          dark
          small
          color="green"
          class="mr-2"
          :to="{
            name: 'back-office-modifier-article',
            params: {
              id: item.id
            }
          }">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="supp(item.id)">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { listeArticle, deleteArticle, updateArticle } from '@/api/blog/index';
import SnackComp from '@/components/site/general/SnackComp.vue';
import { BASE_HOST } from '@/api/config/config';

export default {
  components: {
    SnackComp,
  },
  data() {
    return {
      valueSnack: false,
      base: BASE_HOST,
      colorSnack: '',
      message: '',
      selected: [],
      headers: [
        {
          text: 'Titre de l\'article',
          align: 'start',
          sortable: false,
          value: 'titre',
        },
        { text: 'Date de publication', value: 'created_date' },
        { text: 'Descriptions', value: 'description' },
        { text: 'Actions', value: 'actions', align: 'end' },
      ],
      data: [],
    };
  },
  conputed: {},
  methods: {
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    async getList() {
      this.isLoad = true;
      try {
        this.data = (await listeArticle()).data;
        this.data.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async supp(id) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Voulez-vous vraiment supprimer cette élément?')) return;
      await deleteArticle(id);
      await this.getList();
    },
    async uploadIsLock(data) {
      const dataClone = cloneDeep(data);
      const { id } = dataClone;
      await updateArticle(id, {
        is_lock: !dataClone.is_lock,
      });
      await this.getList();
    },
    formatDate(date) {
      return moment(date).format('L');
    },
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
};
</script>

<style>

</style>
