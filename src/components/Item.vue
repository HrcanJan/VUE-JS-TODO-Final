<template>
    <div class="item" v-if="!item.deleted && !itemDeleted">
        <span @click="deleteItem(item)" style="margin-right: 15px" class="delete">X</span>
        <span>{{  item.text }}</span>
    </div>
    <div class="item" v-if="item.deleted && itemDeleted">
        <span>{{  item.text }}</span>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        item: Object,
        deleteItem: Function,
        itemDeleted: Boolean
    }
    
}
</script>
