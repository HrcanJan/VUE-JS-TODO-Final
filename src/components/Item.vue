<template>
    <div class="item" v-if="!item.isDeleted && !$store.state.isDeleted">
        <span @click="$store.commit('deleteItem', item)" style="margin-right: 15px" class="delete">X</span>
        <span>{{  item.name }}</span>
    </div>
    <div class="item" v-if="item.isDeleted && $store.state.isDeleted">
        <span>{{  item.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        item: Object,
    },
}
</script>
