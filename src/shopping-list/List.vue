<template>
	<h2>Nová položka</h2>
	<div class="form">
		<input @keyup.enter="addItem" @input="isInput" v-model="input" placeholder="Názov položky">
		<button @click="addItem()" disabled>+</button>
	</div>
	<hr>
	<h2>Pridané položky</h2>
	<div v-for="item in this.items" :key="`item-${item.id}`">
		<Item :item="item" :deleteItem="deleteItem" :itemDeleted="itemDeleted" />
	</div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
	data() {
		return {
			items: JSON.parse(sessionStorage.getItem("items")) ? JSON.parse(sessionStorage.getItem("items")) : [],
			input: '',
			itemDeleted: false
		}
	},

	props : {
        item_list: Object,
        putData: Function,
        postData: Function,
		itemAmount: Function,
		deletedAmount: Function
    },

	components: {
		Item, 
	},

	watch: {
		item_list() {
			let arr = JSON.parse(sessionStorage.getItem("items")) ? JSON.parse(sessionStorage.getItem("items")) : []
			let names = arr.map(item => item.text)
			for(let i = 0; i < this.item_list.length; i++){
				let new_item = this.item_list[i].name.toString()
				let new_item_deleted = this.item_list[i].isDeleted
				if(names.indexOf(new_item) === -1){
					arr.push({
					id: arr.length + 1,
					text: new_item,
					deleted: new_item_deleted === "True" ? true : false
					})
				}
			}
			this.items = arr
			this.calculateAmount()
		}
	},

	methods: {
		addItem() {
			if(this.input) {
				this.items.push({
					id: this.items.length + 1,
					text: this.input,
					deleted: false
				})
				this.postData(this.items.length, this.input, false)
				sessionStorage.setItem("items", JSON.stringify(this.items))
				this.input = ''
				this.isInput()
				this.calculateAmount()
			}
		},

		deleteItem(item) {
			item.deleted = true
			this.putData(item.id, item.deleted)
			sessionStorage.setItem("items", JSON.stringify(this.items))
			this.calculateAmount()
		},

		isInput() {
			const button =  document.querySelector('button');
			if(this.input)
				button.disabled = false
			else
				button.disabled = true
		},

		calculateAmount() {
			let activeItems = 0
			let inactiveItems = 0
			for(let i = 0; i < this.items.length; i++){
				if(!this.items[i].deleted)
					activeItems++
				else
					inactiveItems++
			}
			this.itemAmount(activeItems)
			this.deletedAmount(inactiveItems)
		}
	},
}
</script>