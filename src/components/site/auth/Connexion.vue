<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      flat
      class="mb-5 bg-blue-grad"
    >
      <v-toolbar-title>Connexion</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          name="email"
          outlined
          append-icon="person"
          type="text"
        />

        <v-text-field
          label="Mot de passe"
          name="password"
          outlined
          append-icon="lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="$emit('annuler')">Annuler</v-btn>
      <v-btn color="primary">Se connecter</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {

};
</script>

<style>

</style>
