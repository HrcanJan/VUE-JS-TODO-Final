<template>
    <input 
        @keyup.enter="$store.commit('addItem')" 
        @input="$store.commit('isInput')" 
        v-model="$store.state.input" 
        placeholder="Názov položky"
        name="input1"
	>
</template>

<script>
export default {

}
</script>