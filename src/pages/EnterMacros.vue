<template>
  <q-page class="q-px-xl row items-center window-height">
    <div class="col">
      <div class="row justify-center items-center">
        <div class="col-xs-auto">
          <div class="text-h4 text-bold text-primary q-mb-sm">
            now enter your macros for the day
          </div>
        </div>
      </div>
      <div class="row justify-center items-center input-border">
        <div class="col-2">
          <q-input
            class="protein-input q-px-md"
            dense
            type="text"
            placeholder="proteins"
            borderless
            v-model="proteins"
          >
            <template v-if="proteins.length > 0" v-slot:append>
              grams (p)
            </template>
          </q-input>
        </div>
        <div class="col-2">
          <q-input
            class="carbs-input q-px-md"
            type="text"
            dense
            placeholder="carbohydrates"
            borderless
            v-model="carbs"
          >
            <template v-if="carbs.length > 0" v-slot:append>
              grams (c)
            </template>
          </q-input>
        </div>
        <div class="col-2">
          <q-input
            dense
            class="fats-input q-px-md"
            type="text"
            placeholder="fats"
            borderless
            v-model="fats"
          >
            <template v-if="fats.length > 0" v-slot:append>
              grams (f)
            </template>
          </q-input>
        </div>
      </div>
      <div
        class="row q-pt-sm items-center justify-center"
        v-show="calories >= 0"
      >
        <div class="col-xs-auto text-h5 text-secondary">
          Remaining Calories: {{ calories }}
        </div>
        <div class="col-xs-auto q-mx-md">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Next"
            @click="nextButtonClicked"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      proteins: '',
      carbs: '',
      fats: ''
    }
  },
  methods: {
    nextButtonClicked() {
      const payload = {
        proteins: this.proteins,
        carbs: this.carbs,
        fats: this.fats,
        calories: this.calories
      }
      this.$store.commit('macrostore/SET_MACROS', payload)

      this.nextPage()
    },
    nextPage() {
      this.$router.push('/results')
    }
  },
  computed: {
    calories() {
      const calsFromProteins = parseInt(this.proteins) * 4
      const calsFromCarbs = parseInt(this.carbs) * 4
      const calsFromFats = parseInt(this.fats) * 9

      return calsFromProteins + calsFromCarbs + calsFromFats
    }
  }
}
</script>

<style lang="scss">
.protein-input {
  border-top: 1px solid $primary;
  border-left: 1px solid $primary;
  border-bottom: 1px solid $primary;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  background-color: white;
}

.carbs-input {
  border-top: 1px solid $primary;
  border-bottom: 1px solid $primary;
  border-left: 1px solid $primary;
  border-right: 1px solid $primary;
  background-color: white;
}

.fats-input {
  border-top: 1px solid $primary;
  border-right: 1px solid $primary;
  border-bottom: 1px solid $primary;
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  background-color: white;
}
</style>
