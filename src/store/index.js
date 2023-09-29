import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        deletedItemsCount : 0,
        activeItemsCount : 0,
        items : [],
        input : '',
        isDeleted : false
    },
    getters: {
    },
    mutations: {
        activeTab(id) {
		    const tabs = document.getElementsByTagName('li')
		    const activeTab = document.getElementById(id)

            for (let tab of tabs)
                tab.classList.remove('active')

            activeTab.classList.add('active')
	    },

        getData(state, data) {
            state.items = data
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

        updateItemAmount(state, amount = 0){
            state.activeItemsCount = amount
        },

        updateDeletedAmount(amount = 0){
            state.deletedItemsCount = amount
        }
    },
    actions: {
        getData() {
            axios.get('https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/items')
            .then(response => {
                const data = JSON.parse(JSON.stringify(response.data))
                console.log(data)
                commit('getData', data)
            })
        }
    },
    modules: {
    }
})
