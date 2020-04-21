<template>
    <div>
        <landing-header :alignRight="true"></landing-header>
        <router-view></router-view>

    </div>
</template>

<script>
import landingHeader from './component/landing_header.vue'
export default {
    data(){
        return{
           
        }
    },
    components:{
        'landing-header':landingHeader,
    },
    methods:{
       
    }
}
</script>

<style>

</style>