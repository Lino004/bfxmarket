<template>
  <div class="content-img-default grey lighten-4"
  style="
    border-color: black !important;
  "
  @click="$refs.uploadImgFileInput.click()">
    <v-row
      align="center"
      justify="center"
      class="fill-height px-3"
      v-if="value.src">
      <v-img :src="value.src" height="200"></v-img>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class="fill-height"
      v-else>
      <v-icon size="50">mdi-file-image</v-icon>
    </v-row>
    <input
      type="file"
      class="d-none"
      accept=".jpeg, .jpg, .png"
      ref="uploadImgFileInput"
      @input="uploadImg"/>
  </div>
</template>

<script>
import getImgBase64 from '@/services/imgBase64';

export default {
  props: {
    value: Object,
  },
  data: () => ({
    img: '',
  }),
  methods: {
    getFileImg() {
      this.$refs.uploadImgFileInput.click();
    },
    uploadImg(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        this.img = event.target.result;
        this.$emit('input', {
          src: this.img,
          code: getImgBase64(this.img),
          ext: e.target.files[0].type.split('/')[1],
        });
      };
    },
  },
};
</script>

<style>

</style>
