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
</template>

<script>
export default{
    
}
</script>