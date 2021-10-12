<template>
    <v-card
        elevation="2"
        class="preview mx-auto my-12"
        max-width="300"
    >
        <v-card-title class="preview-title">
            {{item.store}}
        </v-card-title>
        <v-img
            :src="require('../assets/barcode.png')"
            class="mx-auto"
            max-height="150"
            max-width="250"
        ></v-img>
        <v-card-text>
            {{ item.serial }}
            {{ item.description }}
            {{ item.price }}
            {{ item.code }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'PreviewCard',

    props: {
        item: {}
    }
}
</script>

<style scoped>
.preview {
    font-family: 'Courier New', Courier, monospace;
}

.preview-title {
    letter-spacing: 0.35em;
}
</style>