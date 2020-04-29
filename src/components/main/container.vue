<template>
     <div class="main_container">
        <slide-nav></slide-nav>
        <router-view></router-view>
 
    </div>
</template>

<script>
import firebase from 'firebase'
import slideNav from './components/navigation_bar.vue'
export default {
    components:{
        'slide-nav':slideNav
    },
    mounted(){
  
        
    }
}
</script>

<style>
.main_container{
    display: flex;
    
}


</style>
