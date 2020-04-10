<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="my-4">Ajout / Modification des slides</h3>
      </v-col>
      <v-col class="text-end">
        <v-btn
          class="mx-2"
          fab dark
          color="primary"
          @click="dialog = true">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="slide in listSlide" :key="slide.id">
        <v-img :src="slide.src">
          <div
            class="d-flex bg-black-5"
            style="height: 100%;">
            <v-row
              class="fill-height white--text"
              align="center"
              justify="center">
              <div class="text-center">
                <h4>{{slide.title}}</h4>
                <h4>{{slide.subtitle}}</h4>
                <v-speed-dial
                  top right
                  direction="bottom"
                  open-on-hover
                  transition="slide-x-transition"
                  absolute>
                  <template v-slot:activator>
                    <v-btn color="blue darken-2" fab dark small>
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-btn fab dark small color="green" @click="update(slide)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="red" @click="supp(slide.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-speed-dial>
              </div>
            </v-row>
          </div>
        </v-img>
      </v-col>
    </v-row>
    <SnackComp
      :value="valueSnack"
      @change="valueSnack = $event"
      :text="message"
      :color="colorSnack"/>
    <v-dialog
      width="500"
      v-model="dialog">
      <v-card>
        <v-card-title
          class="headline bg-blue-grad"
          primary-title
        >
          Ajouter un slide
        </v-card-title>

        <v-card-text class="pa-5">
          <v-text-field
            label="Url de l'image"
            outlined
            append-icon="card-text"
            v-model="src"/>
          <v-text-field
            label="Text principal"
            outlined
            append-icon="card-text"
            v-model="title"/>

          <v-text-field
            label="Text secondaire"
            outlined
            append-icon="card-text"
            v-model="subtitle"/>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="init()"
          >
            Annuler
          </v-btn>
          <v-btn
            color="primary"
            @click="addSlide"
          >
            {{isUpdate ? 'Modifier' : 'Ajouter'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '@/plugins/firebase';
import { v1 as uuidv1 } from 'uuid';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    SnackComp,
  },
  data() {
    return {
      dialog: false,
      src: '',
      title: '',
      subtitle: '',
      valueSnack: false,
      colorSnack: '',
      message: '',
      listSlide: [],
      ref: 'slide/',
      id: '',
      isUpdate: false,
    };
  },
  methods: {
    addSlide() {
      if (!this.id) this.id = uuidv1();
      if (this.src && this.title && this.subtitle) {
        db.ref(`${this.ref}${this.id}`).set({
          src: this.src,
          title: this.title,
          subtitle: this.subtitle,
          id: this.id,
        });
        this.init();
      } else {
        this.showSnackComp('Veuillez remplir tout les champs', 'error');
      }
    },
    update(data) {
      this.isUpdate = true;
      this.src = data.src;
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.id = data.id;
      this.dialog = true;
    },
    supp(id) {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Etes vous sur de vouloir supprimer cette element?');
      if (result) db.ref(this.ref.split('/')[0]).child(id).remove();
    },
    showSnackComp(msg, color) {
      this.colorSnack = color;
      this.message = msg;
      this.valueSnack = true;
    },
    init() {
      this.src = '';
      this.title = '';
      this.subtitle = '';
      this.id = '';
      this.dialog = false;
      this.isUpdate = false;
    },
    get() {
      db.ref(this.ref).on('value', (snap) => {
        if (snap.val()) {
          this.listSlide = Object.values(snap.val());
        } else {
          this.listSlide = [];
        }
      });
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
