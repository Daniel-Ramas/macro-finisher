<template>
  <q-page class="row items-center window-height q-px-xl">
    <div class="col">
      <div class="row justify-center items-center q-pa-md">
        <div class="col-xs-auto">
          <div class="text-h4 text-bold text-primary">
            here are your results!
          </div>
        </div>
      </div>
      <div class="row items-center justify-center">
        <div class="col-2 text-center text-subtitle1">
          <q-icon name="place" /> {{ location }}
        </div>
        <div class="col">
          <q-select
            class="q-pa-md"
            id="qSelect"
            ref="qSelect"
            v-model="selectedBrandName"
            :options="names"
            filled
          />
        </div>
      </div>
      <div class="row q-pa-md">
        <div class="col-2 macro-card">
          <q-card class="my-card q-mx-sm q-pa-sm">
            <div class="row">
              <div class="col text-center text-h6">Your Macros</div>
            </div>
            <div class="row items-center">
              <div class="col text-subtitle1 text-bold">Calories:</div>
              <div class="col-xs-auto text-subtitle1 text-weight-bolder">
                {{ macros.calories }}
              </div>
            </div>
            <div class="row items-center">
              <div class="col text-subtitle1 text-bold">Proteins:</div>
              <div class="col-xs-auto">{{ macros.proteins }} g</div>
            </div>
            <div class="row items-center">
              <div class="col text-subtitle1 text-bold">Carbohydrates:</div>
              <div class="col-xs-auto">{{ macros.carbs }} g</div>
            </div>
            <div class="row items-center">
              <div class="col text-subtitle1 text-bold">Fats:</div>
              <div class="col-xs-auto">{{ macros.fats }} g</div>
            </div>
          </q-card>
        </div>
        <div class="col">
          <custom-table
            :selection="selectedBrandName"
            :data="results"
            @item-selected="addToArray"
          ></custom-table>
        </div>
      </div>
      <div class="row justify-center">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="col-xs-2 q-ma-sm"
        >
          <result-card
            :index="index"
            :item="item"
            @delete-card="addBackMacros"
          ></result-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CustomTable from '../components/CustomTable'
import ResultCard from '../components/ResultCard'
import nutrionix from '../api/nutritionix'
export default {
  components: {
    'custom-table': CustomTable,
    'result-card': ResultCard
  },
  computed: {
    macros() {
      /*
      {
        proteins:
        carbs:
        fats:
        calories:
      }
      */
      return this.$store.getters['macrostore/getMacros']
    },
    brandIds() {
      return this.$store.getters['macrostore/getBrandIds']
    },
    names() {
      return this.$store.getters['macrostore/getBrandNames']
    },
    location() {
      return this.$store.getters['macrostore/getLocation']
    }
  },
  data() {
    return {
      results: [],
      selectedBrandName: '',
      items: []
    }
  },
  watch: {
    selectedBrandName(val) {
      this.getMacros()
    }
  },
  methods: {
    addBackMacros(macros) {
      console.log(macros)
      this.$store.commit('macrostore/ADD_BACK_MACROS', macros)
      this.deleteResult(macros.index)
    },
    deleteResult(index) {
      this.items.splice(index, 1)
    },
    getMacros() {
      const { proteins, carbs, fats, calories } = this.macros
      nutrionix
        .post('/search/instant', {
          query: `${this.selectedBrandName}`,
          common: false,
          common_restaurant: true,
          self: false,
          branded: true,
          brand_ids: this.brandIds,
          branded_region: 1,
          branded_type: 1,
          branded_food_name_only: false,
          detailed: true,
          full_nutrients: {
            203: { lte: proteins },
            204: { lte: fats },
            205: { lte: carbs },
            208: { lte: calories }
          }
        })
        .then(res => {
          var results = res.data.branded
          results.sort(
            (a, b) => b.full_nutrients[3].value - a.full_nutrients[3].value
          )
          this.results = results
        })
        .catch(err => console.log(err))
    },
    addToArray(item) {
      this.items = [...this.items, item]
      // rerender the table based on new macros
      this.getMacros()
    }
  },
  mounted() {}
}
</script>

<style lang="scss"></style>
