<template>
	<h2>Nová položka</h2>
	<Form />
	<hr>
	<h2>Pridané položky</h2>
	<div v-for="item in $store.state.items" :key="`item-${item.id}`">
		<Item :item="item" />
	</div>
</template>

<script>
import Item from '../components/Item.vue'
import Form from '../components/Form.vue'

export default {
	components: {
		Item, Form
	},
}
</script>