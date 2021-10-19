<template>
    <v-card
        elevation="2"
        class="preview mx-auto my-12"
        max-width="250"
    >
        <v-container fluid>
        <v-row class="d-flex justify-center">
            <svg id="barcode"></svg>
        </v-row>
        </v-container>
        <v-card-text class="preview-details">
            {{ item.description }}
            {{ item.price }}
            {{ item.code }}
        </v-card-text>
    </v-card>
</template>

<script>
import JsBarcode from "jsbarcode";

export default {
    name: 'PreviewCard',

    props: {
        item: {}
    },

    mounted: function () {
        this.$nextTick(function () {
            JsBarcode("#barcode", this.item.serial);
        })
    },
};


</script>

<style scoped>
.preview {
    font-family: 'Courier New', Courier, monospace;
}
</style>