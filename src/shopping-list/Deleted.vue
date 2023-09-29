<template>
    <h2>Zmazané položky</h2>
	<div v-for="item in $store.state.items" :key="`item-${item.id}`">
		<Item :item="item"/>
	</div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
	components: {
		Item
	}
}
</script>
  