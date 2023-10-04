<template>
    <ul>
        <li @click="$store.commit('activeTab', 'list')">
            <router-link to="/">List ({{ activeItemsCount }})</router-link>
        </li>
        <li @click="$store.commit('activeTab', 'deleted')">
            <router-link to="/deleted">Deleted ({{ deletedItemsCount }})</router-link>
        </li>
        <li @click="$store.dispatch('getData')">
            <a>GET</a>
        </li>
        <li @click="$store.commit('postData')">
            <a>POST</a>
        </li>
    </ul>
</template>

<script>
export default{
    data() {
		return {
            data: this.$store.state.items
		}
	},

    computed: {
        activeItemsCount(){
            let activeItems = 0

            for(let i = 0; i < this.data.length; i++)
				if(!this.data[i].isDeleted)
					activeItems++
			return activeItems
        },

        deletedItemsCount(){
            return this.data.length - this.activeItemsCount

        }
    }
}
</script>