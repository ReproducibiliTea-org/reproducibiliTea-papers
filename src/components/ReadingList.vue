<template>
  <v-table ref="table"
           detailed
           show-detail-icon
           class="reading-list"
  >
    <thead>
    <tr>
      <th></th>
      <th v-for="col in columns" :key="col.field" :class="{numeric: col.numeric, header: true}">
        {{ col.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <ReadingListRow :item="item" v-for="item in items" :key="item.Paper" />
    </tbody>
  </v-table>
</template>

<script>
import { ref, computed } from 'vue';
import ReadingListRow from "@/components/ReadingListRow.vue";

export default {
  name: "ReadingList",
  components: {ReadingListRow},
  props: {
    item: {type: Object, required: true}
  },
  setup(props) {
    const columns = ref([
      {field: 'Order', label: 'Order', numeric: true},
      {field: 'Block', label: 'Block'},
      {field: 'Paper', label: 'Paper'}
    ]);

    const items = computed(() => {
      console.log("Computing ReadingList items", props.item);
      if(!props.item || !props.item.Content.length)
        return [];
      const out = props.item.Content;
      out.sort((a, b) => a.Order < b.Order? -1 : a.Order === b.Order? 0 : 1);
      return out;
    });

    return {
      columns,
      items
    };
  }
}
</script>

<style scoped lang="scss">
th {
  &.header {
    font-weight: bold !important;
  }
}
</style>