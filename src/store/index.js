import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        items : [],
        input : '',
        isDeleted : false
    },
    getters: {
    },
    mutations: {
        activeTab(state, identifier) {
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
            
            const itemNames = state.items.map(obj => obj.name);
            for(let i = 0; i < data.length; i++)
                if(itemNames.indexOf(data[i].name) === -1)
                    state.items.push(data[i])
        },

        postData(state, itemId = 4, itemName = "Date", itemIsDeleted = false) {
            axios({
                method: 'post',
                url: 'https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/additems',
                data: {"id": itemId, "name": itemName, "isDeleted": itemIsDeleted}
                })
            .then(response => console.log(response.data))
        },

        putData(state, item) {
            axios({
                method: 'put',
                url: 'https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/deleteitems',
                data: {"id": item.id, "isDeleted": item.isDeleted}
                })
            .then((response) => console.log(response.data))
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
			}
		},

		deleteItem(state, item) {
			item.isDeleted = true
			this.commit('putData', item)
		},

        undeleteItem(state, item) {
			item.isDeleted = false
			this.commit('putData', item)
		},

		isInput(state) {
			const button =  document.querySelector('button');
			if(state.input)
				button.disabled = false
			else
				button.disabled = true
		}
    },
    actions: {
        async getData({ commit }) {
            try {
                const response = await axios.get('https://28ad3fcf-e1e0-48be-b014-13f6120e1bc0.mock.pstmn.io/items');
                const data = response.data;
                console.log(data);
                commit('getData', data);
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        }
    },
    
    modules: {
    }
})
