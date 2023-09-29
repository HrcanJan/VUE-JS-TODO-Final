<template>
    <div class="item" v-if="!item.isDeleted && !$store.state.itemDeleted">
        <span @click="$store.commit('deleteItem', item)" style="margin-right: 15px" class="delete">X</span>
        <span>{{  item.text }}</span>
    </div>
    <div class="item" v-if="item.deleted && $store.state.itemDeleted">
        <span>{{  item.text }}</span>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        item: Object,
    }
    
}
</script>
