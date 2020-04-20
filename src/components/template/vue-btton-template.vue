<template>
    <div class="btn-wrapper" @click="emitClick">
        <slot name="btn-name"></slot>
    </div>
</template>

<script>
export default {
    methods:{
        emitClick(){
            this.$emit('onClick')
        }
    }
}
</script>

<style scoped>
.btn-wrapper{
    
    padding: 0.2rem 0rem;
    cursor: pointer;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    
}
</style>