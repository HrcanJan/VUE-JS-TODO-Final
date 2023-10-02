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
        activeTab(state, identifier) {
		    const tabs = document.getElementsByTagName('li')
		    const activeTab = document.getElementById(identifier)

            for (let tab of tabs)
                tab.classList.remove('active')

            activeTab.classList.add('active')

            if(identifier === 'list')
                state.isDeleted = false
            else
                state.isDeleted = true
	    },

        getData(state, data) {
            data = data.map(obj => {
                const x = obj.isDeleted
                if(x === "true" || x === "True")
                    obj.isDeleted = true
                else
                    obj.isDeleted = false
                return obj
            })
            for(let i = 0; i < data.length; i++)
                state.items.push(data[i])
            this.commit('calculateAmount')
        },

        postData(state, itemId = 4, itemName = "Date", itemIsDeleted = false) {
            axios({
                method: 'post',
                url: 'https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/additems',
                data: {"id": itemId, "name": itemName, "isDeleted": itemIsDeleted}
                })
            .then(response => console.log(response.data))
        },

        putData(state, itemId, itemIsDeleted) {
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

        updateDeletedAmount(state, amount = 0){
            state.deletedItemsCount = amount
        },

        addItem(state) {
			if(state.input) {
				state.items.push({
					id: state.items.length + 1,
					name: state.input,
					isDeleted: false
				})
				this.commit('postData', state.items.length, state.input, false)
				state.input = ''
				this.commit('isInput')
				this.commit('calculateAmount')
			}
		},

		deleteItem(state, item) {
			item.isDeleted = true
			this.commit('putData', item.id, item.isDeleted)
			this.commit('calculateAmount')
		},

        undeleteItem(state, item) {
			item.isDeleted = false
			this.commit('putData', item.id, item.isDeleted)
			this.commit('calculateAmount')
		},

		isInput(state) {
			const button =  document.querySelector('button');
			if(state.input)
				button.disabled = false
			else
				button.disabled = true
		},

		calculateAmount(state) {
			let activeItems = 0
			let inactiveItems = 0
			for(let i = 0; i < state.items.length; i++){
				if(!state.items[i].isDeleted)
					activeItems++
				else
					inactiveItems++
			}
			this.commit('updateItemAmount', activeItems)
			this.commit('updateDeletedAmount', inactiveItems)
		}
    },
    actions: {
        getData() {
            axios.get('https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/items')
            .then(response => {
                const data = response.data
                console.log(data)
                this.commit('getData', data)
            })
        }
    },
    modules: {
    }
})
