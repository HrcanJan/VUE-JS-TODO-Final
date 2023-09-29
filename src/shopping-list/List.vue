<template>
	<h2>Nová položka</h2>
	<div class="form">
		<input 
			@keyup.enter="$store.commit('addItem')" 
			@input="$store.commit('isInput')" 
			v-model="$store.state.input" 
			placeholder="Názov položky"
		>
		<button @click="$store.commit('addItem')" disabled>+</button>
	</div>
	<hr>
	<h2>Pridané položky</h2>
	<div v-for="item in $store.state.items" :key="`item-${item.id}`">
		<Item :item="item" />
	</div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
	components: {
		Item, 
	},
}
</script>