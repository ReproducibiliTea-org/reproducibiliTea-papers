<template>
  <div id="app">
    <div v-if="!$store.state.items.length" class="retry">
      <b-button label="Load resource list"/>
    </div>
    <section v-else class="main">
      <b-select expanded v-model="currentItemTitle">
        <option v-for="item in $store.state.items"
                :key="item.Title"
                :value="item.Title"
                :title="item.Topic"
        >
          {{ item.Title }} - {{ item.Topic }}
        </option>
      </b-select>
      <div v-if="currentItem" class="items">
        <h2>Expand any row to see more details...</h2>
        <ReadingList :item="currentItem"/>
        <footer>
          Contributors: {{ currentItem.Contributors }}
        </footer>
      </div>
    </section>
    <b-loading :active="$store.state.items_loading"/>
  </div>
</template>

<script>
import store from './store.js'
import ReadingList from "./components/ReadingList";

export default {
  name: 'App',
  components: {ReadingList},
  data: function() {
    return {
      currentItemTitle: ""
    }
  },
  computed: {
    currentItem() {
      if(!this.currentItemTitle)
        return null;
      return this.$store.state.items.filter(i => i.Title === this.currentItemTitle)[0];
    }
  },
  methods: {},
  mounted: function() {
    const me = this;
    this.$store.dispatch('findItems')
      .then(() => me.currentItemTitle = me.$store.state.items[0].Title);
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
footer {
  text-align: right;
  margin-right: 1em;
  margin-top: .5em;
}
</style>
