<template>
  <div class="container text-right">
    <v-btn :disabled="items.length == 0" text color="primary" @click="printDocument">Export as PDF</v-btn>
    <div id="divToPrint">
      <PreviewCard v-for="item in items" :key="item.serial" :item="item"></PreviewCard>
    </div>
  </div>
</template>

<script>
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

import PreviewCard from "./PreviewCard";

export default {
  name: "Preview",

  props: {
    items: Array
  },

  components: {
    PreviewCard
  },

  methods: {
    printDocument() {
      const pdfTable = document.getElementById("divToPrint");
      var html = htmlToPdfmake(pdfTable.innerHTML);

      const documentDefinition = {
        content: html,
        pageMargins: [0, 0, 0, 0],
        pageBreakBefore: function(currentNode) {
          return (
            currentNode.style &&
            currentNode.style.indexOf("pdf-pagebreak-before") > -1
          );
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();
    }
  }
};
</script>

<style scoped>
#divToPrint {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
</style>

