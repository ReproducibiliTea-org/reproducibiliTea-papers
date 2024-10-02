<template>
    <tr>
      <td>
        <v-btn
            :icon="expanded? 'mdi-menu-up' : 'mdi-menu-down'"
            size="small"
            variant="plain"
            @click="() => expanded = !expanded"></v-btn>
      </td>
      <td>{{ item.Order }}</td>
      <td>{{ item.Block }}</td>
      <td v-html="item.Paper"></td>
    </tr>
  <tr v-if="expanded">
      <td :colspan="4" class="expansion">
        <v-sheet :elevation="1" class="content">
          <p v-if="item.Summary">
            <strong>Summary:</strong> {{ item.Summary }}
          </p>
          <p v-if="item.Resource_url">
            <a :href="item.Resource_url" target="_blank">
              {{ item.Resource_description }}
            </a>
          </p>
          <v-chip-group class="tags" v-if="item.Keywords.length">
            <a v-for="kw in item.Keywords"
               :key="kw"
               :href="`https://www.zotero.org/groups/2354006/reproducibilitea/tags/${kw}/`"
               target="_blank"
               class="tag-anchor"
            >
              <v-chip>{{ kw }}</v-chip>
            </a>
          </v-chip-group>
        </v-sheet>
      </td>
    </tr>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "ReadingListRow",
  props: {
    item: {type: Object, required: true}
  },
  setup() {
    const expanded = ref(false);

    return {
      expanded
    };
  }
}
</script>

<style scoped>
td.expansion {
  padding: 0 !important;
  & v-sheet {
    padding: 1em 0;
  }
}
.tag-anchor {margin-right: .5em;}
</style>