<template>
    <div class="form">
		<input 
            @keyup.enter="addItem" 
            @input="isInput" 
            v-model="input" 
            placeholder="Názov položky"
            name="input1"
        >
		<button @click="addItem" :disabled="isDisabled">+</button>
	</div>
</template>

<script>
export default {
    data() {
		return {
            input: '',
            isDisabled: true
		}
	},

    methods: {
        addItem() {
            if(this.input) {
                this.$store.commit('addItem', this.input)
                this.input = ''
            }
        },

        isInput() {
            if(this.input)
                this.isDisabled = false
            else
                this.isDisabled = true
        }
    }
}
</script>