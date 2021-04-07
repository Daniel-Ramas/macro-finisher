<template>
  <q-page class="q-px-xl">
    <div class="row justify-center items-center window-height">
      <div class="col-xs-auto">
        <div class="text-h4 text-bold text-primary q-mb-sm">
          First, let's search for some places to eat
        </div>
        <q-input
          rounded
          outlined
          dense
          bg-color="white"
          v-model="address"
          type="text"
          placeholder="enter your location"
        >
          <template v-slot:append>
            <q-icon
              name="search"
              color="accent"
              class="cursor-pointer hover-bolder"
              @click="searchClicked"
            />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import nutritionix from '../api/nutritionix'
import geocode from '../api/geocode'

export default {
  name: 'PageIndex',
  data() {
    return {
      brandIds: [],
      coords: null,
      address: ''
    }
  },
  methods: {
    searchClicked() {
      this.$store.commit('macrostore/SET_ADDRESS', this.address)
      this.getCoords()
      this.nextPage()
    },
    nextPage() {
      this.$router.push('/macros')
    },
    getRestaurants() {
      nutritionix
        .get('/locations', {
          params: {
            ll: `${this.coords.lat},${this.coords.lng}`,
            distance: '50mi',
            limit: '10'
          }
        })
        .then(res => {
          this.brandIds = []
          const locs = res.data.locations

          locs.map(loc => {
            this.brandIds.push({
              brandId: loc.brand_id,
              name: loc.name,
              address: loc.address,
              address2: loc.address2,
              zip: loc.zip
            })
          })

          this.$store.commit('macrostore/PUSH_BRANDIDS', this.brandIds)
        })
        .catch(err => console.log(err))
    },
    getCoords() {
      geocode
        .get('/json', {
          params: {
            address: this.address
          }
        })
        .then(res => {
          this.coords = res.data.results[0].geometry.location
          this.getRestaurants()
        })
        .catch(err => console.log(err))
    }
  },
  watch: {
    coords(val) {
      this.getRestaurants()
    }
  },
  mounted() {}
}
</script>

<style>
.hover-bolder:hover {
  font-weight: bolder;
}
</style>
