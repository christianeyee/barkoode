<template>
  <v-app>
    <v-main>
      <div class="mx-16">
        <CreateForm @preview="onPreview"/>
        <v-divider></v-divider>
        <transition name="show-title" appear>
          <p class="text-h4 mt-3"># of barcodes: {{items.length}}</p>
        </transition>
        <transition name="show-preview">
          <Preview v-if="items.length > 0" :items="items"/>
        </transition>
      </div>
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
    items: []
  }),

  methods: {
    onPreview(items) {
      this.items = items;
    }
  }
};
</script>

<style scoped>
.show-title-enter-from,
.show-title-leave-to {
  opacity: 0;
}

.show-title-enter {
  transform: translateX(-200px);
}

.show-title-enter-active,
.show-title-leave-active {
  transition: all 0.5s ease-out;
}

.show-preview-enter-from,
.show-preview-leave-to {
  opacity: 0;
}

.show-preview-enter {
  transform: translateY(200px);
}

.show-preview-enter-active,
.show-preview-leave-active {
  transition: all 0.5s ease-out;
}
</style>
