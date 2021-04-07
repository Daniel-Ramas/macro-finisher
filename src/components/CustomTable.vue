<template>
  <div>
    <q-table
      :title="selection"
      :data="data"
      :columns="columns"
      row-key="name"
      color="amber"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="table-row cursor-pointer"
          @click="onRowClick(props)"
        >
          <q-td key="desc" :props="props">
            {{ props.row.brand_name_item_name }}
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.full_nutrients[3].value }}
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.full_nutrients[0].value }}
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.full_nutrients[2].value }}
          </q-td>
          <q-td key="fat" :props="props">
            {{ props.row.full_nutrients[1].value }}
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.full_nutrients[8].value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    selection: String,
    data: Array
  },
  data() {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Menu Item',
          align: 'left',
          field: row => row.brand_name_item_name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: row => row.full_nutrients[3].value,
          sortable: true
        },
        {
          name: 'protein',
          label: 'Protein (g)',
          field: row => row.full_nutrients[0].value,
          sortable: true
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: row => row.full_nutrients[2].value,
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: row => row.full_nutrients[1].value
        },

        {
          name: 'sodium',
          label: 'Sodium (mg)',
          field: row => row.full_nutrients[8].value
        }
      ]
    }
  },
  methods: {
    onRowClick({ row }) {
      console.log(row)
      const name = row.brand_name_item_name
      const proteins = row.full_nutrients[0].value
      const calories = row.full_nutrients[3].value
      const fats = row.full_nutrients[1].value
      const carbs = row.full_nutrients[2].value
      const sodium = row.full_nutrients[8].value
      const id = row.nix_item_id
      const data = { name, calories, proteins, carbs, fats, sodium, id }
      this.$store.commit('macrostore/SUBTRACT_SELECTION', data)
      this.$emit('item-selected', data)
    }
  }
}
</script>

<style lang="scss">
.table-row:hover {
  background-color: $secondary;
  color: #ffffff;
}
</style>
