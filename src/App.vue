<template>
    <unordered-list />
    <div class="wrapper">
        <router-view />
    </div>
</template>

<script>
import UnorderedList from './components/UnorderedList.vue'

export default {
    async mounted() {
        try{
            this.$store.dispatch('getData')
        } catch (error) {
            console.error("Error fetching data:", error);
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
