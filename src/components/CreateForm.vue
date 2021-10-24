<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <transition name="show-title" appear>
            <p class="text-h3 text-center mt-3">Print barcodes.</p>
          </transition>
        </v-row>
        <transition name="show-form" appear>
          <v-row>
            <v-col cols="auto" sm="4">
              <v-text-field
                v-model="form.code"
                :rules="rules.item"
                color="blue darken-2"
                label="Item Code"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="auto" sm="4">
              <v-text-field
                v-model="form.description"
                :rules="rules.item"
                color="blue darken-2"
                label="Item Description"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="auto" sm="4">
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
                  <div>Serial Numbers</div>
                </template>
              </v-textarea>
            </v-col>
          </v-row>
        </transition>
      </v-container>
      <transition name="show-btns" appear>
        <v-card-actions>
          <v-btn text outlined @click="resetForm">Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text outlined color="primary" type="submit">Print</v-btn>
        </v-card-actions>
      </transition>
    </v-form>
  </v-card>
</template>

<script>
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP"
});

export default {
  data() {
    const defaultForm = Object.freeze({
      code: "",
      description: "",
      serials: "",
      price: null
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        price: [val => val > 0 || `Invalid price!`],
        item: [val => (val || "").length > 0 || "This field is required."]
      },
      defaultForm
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.code &&
        this.form.description &&
        this.form.serials &&
        this.form.price > 0
      );
    }
  },

  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.form = Object.assign({}, this.defaultForm);
      this.$emit("preview", []);
    },
    submit() {
      const price = formatter.format(this.form.price);
      const description = this.form.description.toUpperCase();
      const code = this.form.code.toUpperCase();

      const tags = [];
      const serialNumbers = [...new Set(this.form.serials.split("\n"))];
      for (const serial of serialNumbers) {
        if (serial.trim().length > 0) {
          tags.push({
            code,
            description,
            price,
            serial
          });
        }
      }
      this.form.serials = "";
      this.$emit("preview", tags);
    }
  }
};
</script>

<style scoped>
.show-title-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.show-title-enter-active {
  transition: all 0.5s ease-out;
}

.show-form-enter {
  transform: translateY(200px);
  opacity: 0;
}

.show-form-enter-active {
  transition: all 0.5s ease-out;
}

.show-btns-enter {
  transform: translateX(200px);
  opacity: 0;
}

.show-btns-enter-active {
  transition: all 0.5s ease-out;
}
</style>
