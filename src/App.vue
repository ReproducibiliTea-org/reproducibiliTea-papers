<template>
  <div id="app">
    <div v-if="!$store.state.items.length" class="retry">
      <b-button label="Load resource list"/>
    </div>
    <div v-else class="items">
      <h2>Expand any row to see more details...</h2>
        <b-table :data="items"
                 :columns="columns"
                 ref="table"
                 detailed
                 show-detail-icon
                 class="reading-list"
        >
          <template #detail="props">
            <div class="content">
              <p v-if="props.row.Summary.length">
                <strong>Summary:</strong> {{ props.row.Summary }}
              </p>
              <p v-if="props.row.Resource_url.length">
                <a :href="props.row.Resource_url" target="_blank">
                  {{ props.row.Resource_description }}
                </a>
              </p>
              <div class="tags" v-if="props.row.Keywords.length">
                <b-tag v-for="kw in props.row.Keywords" :key="kw">
                  {{ kw }}
                </b-tag>
              </div>
            </div>
          </template>
        </b-table>
    </div>
    <b-loading :active="$store.state.items_loading"/>
  </div>
</template>

<script>
import store from './store.js'

export default {
  name: 'App',
  data: function() {
    return {
      columns: [
        {field: 'Order', label: 'Order', numeric: true},
        {field: 'Block', label: 'Block'},
        {field: 'Paper', label: 'Paper'}
      ]
    }
  },
  components: {},
  computed: {
    items() {
      if(!this.$store.state.items.length)
        return [];
      const out = this.$store.state.items;
      out.sort((a, b) => a.Order < b.Order? -1 : a.Order === b.Order? 0 : 1);
      return out;
    }
  },
  methods: {},
  mounted: function() {
    this.$store.dispatch('findItems');
  },
  store: store
}

</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  margin: 1em auto;
}
.items > h2 {
  text-align: center;
}
.reading-list {
  width: 100%;
}
</style>
