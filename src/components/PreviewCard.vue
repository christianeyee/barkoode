<template>
    <v-card
        elevation="2"
        class="preview mx-auto my-12"
        max-width="250"
    >
        <v-card-title class="preview-title">
            {{item.store}}
        </v-card-title>
        <v-container fluid>
        <v-row>
            <p class="barcode">
                {{ item.serial }}
            </p>
            <p class="barcode-readable">
                {{ item.serial }}
            </p>
        </v-row>
        </v-container>
        <v-card-text class="preview-details">
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
    letter-spacing: 0.15em;
}

.barcode {
    font-family: "code128";
    transform: scaleY(4);
    font-size: 48px;
    margin-top: 42px;
    margin-bottom: -16px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.barcode-readable {
    letter-spacing: 0.5em;
    margin: auto;
}
</style>