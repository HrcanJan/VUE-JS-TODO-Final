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
    computed: {
        activeItemsCount(){
            const data = this.$store.state.items
            let activeItems = 0

            for(let i = 0; i < data.length; i++)
				if(!data[i].isDeleted)
					activeItems++
			return activeItems
        },

        deletedItemsCount(){
            const data = this.$store.state.items
            let deletedItems = 0

            for(let i = 0; i < data.length; i++)
				if(data[i].isDeleted)
					deletedItems++
			return deletedItems

        }
    }
}
</script>