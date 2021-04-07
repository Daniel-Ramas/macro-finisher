<template>
  <div>
    <q-card class="my-card q-mx-sm q-pa-sm cursor-pointer" @click="deleteCard">
      <div class="row">
        <div class="col text-center text-h6">{{ item.name }}</div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">Calories:</div>
        <div class="col-xs-auto text-subtitle1 text-weight-bolder">
          {{ item.calories }}
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">Proteins:</div>
        <div class="col-xs-auto">{{ item.proteins }} g</div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">Carbohydrates:</div>
        <div class="col-xs-auto">{{ item.carbs }} g</div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-bold">Fats:</div>
        <div class="col-xs-auto">{{ item.fats }} g</div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number
  },
  data() {
    return {}
  },
  methods: {
    deleteCard() {
      var payload = this.item
      payload.index = this.index
      this.$emit('delete-card', payload)
    }
  }
}
</script>
