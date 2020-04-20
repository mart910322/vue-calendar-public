<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            txt:'',
        }
    },
    mounted(){
        this.txt = this.$route.params.day+ ' ' + this.$route.params.month + ' ' +this.$route.params.year;
    }
}
</script>

<style>

</style>