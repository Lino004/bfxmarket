 <template>
  <div style="width: 100%" class="ma-3">
    <v-row>
      <v-col>
        <h2>Liste des témoignage</h2>
      </v-col>
      <v-col class="text-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              color="primary"
              v-on="on"
              :disabled="!selected.length">
              Actions
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="suppMultiple">
              <v-list-item-title>Supprimer</v-list-item-title>
            </v-list-item>
            <v-list-item @click="validateComment">
              <v-list-item-title>Valider</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="">
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
          <template v-slot:item.contenu="{ item }">
            <div
              class="d-inline-block text-truncate"
              style="width: 250px">
              {{item.contenu}}
            </div>
          </template>
          <template v-slot:item.is_validate="{ item }">
            <v-chip
              class="ma-2"
              dark
              :color="item.is_validate ? 'success' : 'red'">
              {{item.is_validate ? 'Valider' : 'Non valider'}}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              @click="itemSelect = item"
              color="primary">mdi-eye</v-icon>
            <v-icon
              @click="supp(item.id)"
              color="red">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4" v-if="itemSelect.contenu">
        <v-alert
          dismissible
          transition="scale-transition"
          @input="itemSelect = {}"
        >
          {{itemSelect.contenu}}
        </v-alert>
      </v-col>
    </v-row>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
  </div>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { mapActions } from 'vuex';
import { listeComment, deleteComment, validateComment } from '@/api/comment/index';
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
      data: [],
      headers: [
        {
          text: 'Utilisateur',
          align: 'start',
          sortable: false,
          value: 'user_name',
        },
        { text: 'Contenu', value: 'contenu' },
        { text: 'Date de publication', value: 'created_date', width: 200 },
        { text: 'Status', value: 'is_validate' },
        { text: 'Actions', value: 'actions', align: 'end' },
      ],
      itemSelect: {},
      alert: false,
    };
  },
  conputed: {},
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    /* showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    }, */
    async getList() {
      this.isLoad = true;
      try {
        this.data = (await listeComment()).data;
        this.data.sort((a, b) => a.id - b.id);
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    async supp(id) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Voulez-vous vraiment supprimer cette élément?')) return;
      await deleteComment(id);
      await this.getList();
    },
    async suppMultiple() {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Voulez-vous vraiment supprimer les éléments selectionnés?')) return;
      const req = [];
      this.selected.forEach((el) => {
        req.push(deleteComment(el.id));
      });
      await Promise.all(req);
      await this.getList();
      this.showSnackMsg({
        msg: 'Suppression réussi',
        color: 'success',
      });
    },
    async validateComment() {
      const req = [];
      this.selected.forEach((el) => {
        req.push(validateComment(el.id));
      });
      await Promise.all(req);
      this.selected = [];
      await this.getList();
      this.showSnackMsg({
        msg: 'Oppération éffectué',
        color: 'success',
      });
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
