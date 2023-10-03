<template>
    <div class="form">
		<input 
            @keyup.enter="$store.commit('addItem')" 
            @input="$store.commit('isInput')" 
            v-model="$store.state.input" 
            placeholder="Názov položky"
            name="input1"
        >
		<button @click="$store.commit('addItem')" disabled>+</button>
	</div>
</template>

<script>
export default {

}
</script>