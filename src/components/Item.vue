<template>
    <div class="item" v-if="!item.isDeleted && !$store.state.isDeleted">
        <div class="topItem">
            <div v-if="this.isInputDiv">
                <input 
                    name="input" 
                    class="editInput"
                    @keyup.enter="saveItem" 
                    @input="isInput"
                    v-model="input"
                />
            </div>

            <span v-if="!this.isInputDiv">{{  item.name }}</span>
        </div>

        <div v-if="!this.isInputDiv">
            <div class="row">
                <button class="itemButton" id="deleteButton" @click="$store.commit('deleteItem', item)">
                    <span class="svgs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="margin-right: 5px;">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                        Delete
                    </span>
                </button>

                <button class="itemButton" id="editButton" @click="editItem">
                    <span class="svgs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style="margin-right: 5px;">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        Edit
                    </span>
                </button>
            </div>
        </div>

        <div class="row" v-if="this.isInputDiv">
            <button class="itemButton" id="saveButton" @click="saveItem" :disabled="isDisabled">Save</button>
            <button class="itemButton" id="cancelButton" @click="editDoneItem">Cancel</button>
        </div>
    </div>

    <div class="item" v-if="item.isDeleted && $store.state.isDeleted">
        <div class="topItem">
            <span>{{  item.name }}</span>
        </div>
        <button class="itemButton" @click="$store.commit('undeleteItem', item)">
            <span class="svgs">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16" style="margin-right: 5px;">
                    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                </svg>
                Undo delete
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Item',

    data() {
		return {
            input: this.item.name,
            isDisabled: false,
            isInputDiv: false
		}
	},

    props: {
        item: Object,
    },

    methods: {
		isInput() {
			if(this.input)
				this.isDisabled = false
			else
				this.isDisabled = true
		},

        editItem(){
            this.isInputDiv = true
        },

        editDoneItem(){
            this.isDisabled = false
            this.isInputDiv = false
            this.input = this.item.name
        },

        saveItem() {
			if(this.input) {
				this.item.name = this.input
				this.$store.commit('putData', this.item)
                this.editDoneItem()
			}
		},
    }
}
</script>
