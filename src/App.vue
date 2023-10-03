<template>
    <unordered-list />
    <div class="wrapper">
        <router-view />
        <h1 v-if="!isMounted">Fetching data...</h1>
    </div>
    
</template>

<script>
import UnorderedList from './components/UnorderedList.vue'

export default {
    data() {
		return {
            isMounted: false
		}
	},

    async mounted() {
        try {
            await this.$store.dispatch('getData')
            this.isMounted = true
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    components: {
        UnorderedList, 
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
