<template>
  <v-app>
    <v-main>
      <CreateForm @preview="onPreview"/>
      <v-divider></v-divider>
      <Preview v-if="tasks.length > 0" :items="tasks"/>
    </v-main>
  </v-app>
</template>

<script>
import CreateForm from "./components/CreateForm";
import Preview from "./components/Preview";

export default {
  name: "App",

  components: {
    CreateForm,
    Preview
  },

  data: () => ({
    tasks: []
  }),

  methods: {
    onPreview(tasks) {
      console.log(tasks);
      this.tasks = tasks;
    }
  }
};
</script>
