<template>
  <div id="app">
    <div class="retry">
      <div v-if="!store.items.length" @click="() => window.location.reload()">
        <v-btn :readonly="store.items_loading">Load resource list</v-btn>
      </div>
      <v-progress-circular v-if="store.items_loading" indeterminate></v-progress-circular>
    </div>
    <section v-if="store.items.length" class="main">
      <v-select
          expanded
          v-model="currentItemTitle"
          class="lists"
          :items="store.items.map(i => {
            return {title: `${i.Title} - ${i.Topic}`, value: i.Title};
          })"
      ></v-select>
      <div v-if="currentItem" class="items">
        <h2 class="hint">Expand any row to see more details...</h2>
        <ReadingList :item="currentItem"/>
        <footer>
          Contributors: {{ currentItem.Contributors }}
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from './store.js';
import ReadingList from "@/components/ReadingList.vue";

export default {
  name: 'App',
  components: { ReadingList },
  setup() {
    const store = useStore();
    const currentItemTitle = ref("");

    const currentItem = computed(() => {
      if (!currentItemTitle.value) return null;
      return store.items.find(i => i.Title === currentItemTitle.value);
    });

    onMounted(() => {
      store.findItems().then(() => {
        if (store.items.length > 0) {
          currentItemTitle.value = store.items[0].Title;
        }
      });
    });

    return {
      currentItemTitle,
      currentItem,
      store
    };
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 60vh;
  margin: 0 auto;
  padding: 0.5em;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: large;
}
.retry {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 1em;
  width: 100%;
  & > div {
    margin-right: 1em;
  }
}
h2.hint {
  font-size: medium;
  font-weight: normal;
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
