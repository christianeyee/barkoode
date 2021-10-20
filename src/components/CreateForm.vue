<template>
  <v-card flat>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row class="d-flex justify-center">
            <p class="text-h3 text-center mt-3">
                Print barcodes.
            </p>
        </v-row>
        <v-row>
          <v-col
            cols="8"
            sm="6"
          >
            <v-text-field
              v-model="form.code"
              :rules="rules.item"
              color="blue darken-2"
              label="Item Code"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="8"
            sm="6"
          >
            <v-text-field
              v-model="form.description"
              :rules="rules.item"
              color="blue darken-2"
              label="Item Description"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="8"
            sm="6"
          >
            <v-text-field
              v-model.number="form.price"
              :rules="rules.price"
              color="blue darken-2"
              label="Price"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.serials"
              color="teal"
              hint="One serial number per line"
              persistent-hint
              outlined
              required
            >
              <template v-slot:label>
                <div>
                  Serial Numbers
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          text
          @click="resetForm"
        >
          Reset
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >
          Print
        </v-btn>
      </v-card-actions>
    </v-form>

    <v-divider></v-divider>
    <p class="text-h4 mt-3">Generated tags: {{tags.length}}</p>
    <v-container fluid>
        <PreviewCard
          v-for="tag of tags"
          :key="tag.serial"
          :item="tag"
        ></PreviewCard>
    </v-container>
  </v-card>
</template>

<script>
import PreviewCard from "./PreviewCard";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
});

  export default {
    components: {
      PreviewCard,
    },

    data () {
      const defaultForm = Object.freeze({
        code: '',
        description: '',
        serials: '',
        price: null,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          price: [
            val => val > 0 || `Invalid price!`,
          ],
          item: [val => (val || '').length > 0 || 'This field is required.'],
        },
        defaultForm,
        tags: []
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.code &&
          this.form.description &&
          this.form.serials &&
          this.form.price > 0
        )
      },
    },

    methods: {
      resetForm () {
        this.$refs.form.reset()
        this.form = Object.assign({}, this.defaultForm)
        this.tags = []
      },
      submit () {
          const price = formatter.format(this.form.price)
          const description = this.form.description.toUpperCase();
          const code = this.form.code.toUpperCase();

          this.tags = []
          const serialNumbers = [...new Set(this.form.serials.split("\n"))]
          for (const serial of serialNumbers) {
              if (serial.trim().length > 0) {
                this.tags.push({
                  code,
                  description,
                  price,
                  serial
                })
              }
          }
          this.form.serials = ''
      },
    },
};
</script>