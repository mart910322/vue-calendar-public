<template>
     <div class="main_container">
        <slide-nav></slide-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
 
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
    min-width: calc(100vw + 20rem);

    
}


</style>
