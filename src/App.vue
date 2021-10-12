<template>
  <v-app>
    <v-main>
      <CreateForm/>
    </v-main>
  </v-app>
</template>

<script>
import CreateForm from './components/CreateForm';

export default {
  name: 'App',

  components: {
    CreateForm,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: 'code128';
  src: URL('assets/LibreBarcode128-Regular.ttf') format('truetype');
}
</style>
