<template>
  <div class="wrapper">
    <div ref="divToImg" id="divToImg">
      <div>
        <img class="barcode" :id="item.serial">
      </div>
      <div class="description">
        {{ item.description }}
        {{ item.price }}
        {{ item.code }}
      </div>
    </div>
    <!-- <img id="barcodeImg" :src="output" style="display:none">
    <canvas id="barcodeCanvas" style="display:none; width:400; height:198;"></canvas>-->
  </div>
</template>

<script>
import JsBarcode from "jsbarcode";
import { saveAs } from "file-saver";

export default {
  name: "PreviewCard",

  data() {
    return {
      output: null
    };
  },

  props: {
    item: {}
  },

  mounted: function() {
    this.$nextTick(function() {
      JsBarcode("#" + this.item.serial, this.item.serial, {
        width: 1.5,
        height: 75,
        font: "Courier New",
        fontSize: 15,
        margin: 4
      });
    });
  },

  methods: {
    async print() {
      const el = this.$refs.divToImg;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output = await this.$html2canvas(el, options);

      this.$nextTick(function() {
        var canvas = document.getElementById("barcodeCanvas");
        var context = canvas.getContext("2d");
        var img = document.getElementById("barcodeImg");

        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height, // source rectangle
          0,
          0,
          canvas.width,
          canvas.height
        ); // destination rectangle

        canvas.toBlob(function(blob) {
          saveAs(blob, "barcode.png");
        });
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1 0 32%;
  max-width: 32%;
  margin: 5px;
}

.description {
  font-size: 0.75em;
  margin-left: 12px;
  margin-right: 12px;
}

#divToImg {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
}
</style>