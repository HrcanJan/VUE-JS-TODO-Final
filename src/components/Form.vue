<template>
    <div class="form">
		<Input />
		<button @click="$store.commit('addItem')" disabled>+</button>
	</div>
</template>

<script>
import Input from './Input.vue'

export default {
    components: {
        Input
    }
}
</script>