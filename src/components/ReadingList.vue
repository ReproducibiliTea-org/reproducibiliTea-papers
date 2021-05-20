<template>
    <b-table :data="items"
             :columns="columns"
             ref="table"
             detailed
             show-detail-icon
             class="reading-list"
    >
        <template #detail="props">
            <div class="content">
                <p v-if="props.row.Summary">
                    <strong>Summary:</strong> {{ props.row.Summary }}
                </p>
                <p v-if="props.row.Resource_url">
                    <a :href="props.row.Resource_url" target="_blank">
                        {{ props.row.Resource_description }}
                    </a>
                </p>
                <div class="tags" v-if="props.row.Keywords.length">
                    <a v-for="kw in props.row.Keywords"
                       :key="kw"
                       :href="`https://www.zotero.org/groups/2354006/reproducibilitea/tags/${kw}/`"
                       target="_blank"
                       class="tag-anchor"
                    >
                        <b-tag>{{ kw }}</b-tag>
                    </a>
                </div>
            </div>
        </template>
    </b-table>
</template>

<script>
export default {
    name: "ReadingList",
    props: {
        item: {type: Object, required: true}
    },
    data: function() {
        return {
            columns: [
                {field: 'Order', label: 'Order', numeric: true},
                {field: 'Block', label: 'Block'},
                {field: 'Paper', label: 'Paper'}
            ]
        }
    },
    computed: {
        items() {
            if(!this.item || !this.item.Content.length)
                return [];
            const out = this.item.Content;
            out.sort((a, b) => a.Order < b.Order? -1 : a.Order === b.Order? 0 : 1);
            return out;
        }
    }
}
</script>

<style scoped>
.tag-anchor {margin-right: .5em;}
</style>