<template>
    <div class="bg"></div>
    <ul>
        <li class="active" id="list" @click="activeTab('list')">
            <router-link to="/">List({{ this.itemAmount }})</router-link>
        </li>
        <li id="deleted" @click="activeTab('deleted')">
            <router-link to="/deleted">Deleted({{ this.deletedAmount }})</router-link>
        </li>
        <li id="deleted" @click="getData()">
            <a>GET</a>
        </li>
        <li id="deleted" @click="postData()">
            <a>POST</a>
        </li>
    </ul>
    <div class="wrapper">
        <router-view 
            :item_list="this.items"
            :postData="postData"
            :putData="putData"
            :itemAmount="updateItemAmount"
            :deletedAmount="updateDeletedAmount"
        />
    </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			items: [],
            deletedAmount: 0,
            itemAmount: 0
		}
	},

    async mounted() {
        try{
            this.getData()
        } catch (error) {
            console.error("Error fetching data:", error);
            }
    },

    methods: {
        activeTab(id) {
		    const tabs = document.getElementsByTagName('li')
		    const activeTab = document.getElementById(id)

	    for (let tab of tabs)
		    tab.classList.remove('active')

	    activeTab.classList.add('active')
	    },

        getData() {
            axios.get('https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/items')
            .then(response => {
                this.items = JSON.parse(JSON.stringify(response.data))
                console.log(response.data)
            })
        },

        postData(itemId = 4, itemName = "Date", itemIsDeleted = false) {
            axios({
                method: 'post',
                url: 'https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/additems',
                data: {"id": itemId, "name": itemName, "isDeleted": itemIsDeleted}
                })
            .then(response => console.log(response.data))
        },

        putData(itemId, itemIsDeleted) {
            axios({
                method: 'put',
                url: 'https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/deleteitems',
                data: {"id": itemId, "isDeleted": itemIsDeleted}
                })
            .then((response) => console.log(response.data))
        },

        updateItemAmount(amount = 0){
            this.itemAmount = amount
        },

        updateDeletedAmount(amount = 0){
            this.deletedAmount = amount
        }
    }
}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
