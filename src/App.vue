<template>
    <ul>
        <li class="active" id="list" @click="$store.commit('activeTab', 'list')">
            <router-link to="/">List({{ $store.state.activeItemsCount }})</router-link>
        </li>
        <li id="deleted" @click="$store.commit('activeTab', 'deleted')">
            <router-link to="/deleted">Deleted({{ $store.state.deletedItemsCount }})</router-link>
        </li>
        <li id="deleted" @click="$store.dispatch('getData')">
            <a>GET</a>
        </li>
        <li id="deleted" @click="$store.commit('postData')">
            <a>POST</a>
        </li>
    </ul>
    <div class="wrapper">
        <router-view />
    </div>
</template>

<script>
export default {
    async mounted() {
        try{
            this.$store.dispatch('getData')
        } catch (error) {
            console.error("Error fetching data:", error);
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
