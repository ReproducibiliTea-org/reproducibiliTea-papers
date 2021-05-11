import Vue
    from "vue";
import Vuex
    from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        filters: [],
        items: [],
        items_loading: false
    },
    mutations: {
        addFilter(state, {field, value}) {
            if(!field)
                throw new Error(`Filter requires a name.`);
            console.log({field, value})
            state.filters = [...state.filters.filter(f => f.field !== field)];
            if(value.length)
                state.filters = [...state.filters, {field, value}]
        },
        removeFilters(state) {state.filters = [];},
        toggleFilterTag(state, {field, value}) {
            const existing = state.filters.filter(f => f.field === field);
            if(existing.length) {
                if(!existing[0].value.includes(value))
                    existing[0].value.push(value);
                else {
                    if(existing[0].value.length === 1)
                        state.filters = state.filters.filter(f => f.field !== field);
                    else
                        existing[0].value = existing[0].value.filter(v => v !== value);
                }
            } else {
                state.filters.push({field, value: [value]});
            }
        },
        addItem(state, value) {
            state.items.push(value);
        },
        removeItems(state) {state.items = [];},
        setItemsLoading(state, value) {state.items_loading = value;}
    },
    getters: {
        uniqueFieldValues: state => field => {
            const out = [];
            state.items.forEach(I => {
                if(I[field] === null || !I[field].length)
                    return;
                if(typeof I[field] === 'string') {
                    if (!out.includes(I[field]))
                        out.push(I[field]);
                }
                else {
                    I[field].forEach(v => {
                        if(v !== '' && !out.includes(v))
                            out.push(v);
                    })
                }
            });
            return out;
        }
    },
    actions: {
        async findItems(context) {
            if(context.state.items_loading)
                return;
            context.commit('setItemsLoading', true);
            try {
                const response = await fetch('/.netlify/functions/sheets');
                const json = await response.json();
                context.commit('removeItems');
                json.forEach(item =>
                    context.commit('addItem', fixFields(item))
                );
                console.log({Entries: context.state.items})
            } catch(e) {
                console.error(e);
            }
            context.commit('setItemsLoading', false);
        }
    }
});

function fixFields(item) {
    const k = 'Keywords';
    if(Object.prototype.hasOwnProperty.call(item, k)) {
        item[k] = item[k].split(/, */).filter(x => x !== '');
    }
    item.Order = parseInt(item.Order);
    item.Paper = item.Paper.replace(
        /(https?:\/\/[^ ]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );
    return item;
}

export default store;