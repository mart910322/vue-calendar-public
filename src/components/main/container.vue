<template>
     <div class="main_container" :class="{'nav-show':mobileMenuShow}">
        <slide-nav></slide-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
 
    </div>
</template>

<script>
import firebase from 'firebase'
import slideNav from './components/navigation_bar.vue'
import {mapState} from 'vuex'
export default {
    components:{
        'slide-nav':slideNav
    },
    mounted(){
  
        
    },
     computed:{
        ...mapState([
            'mobileMenuShow'
        ])
    },
}
</script>

<style>
.main_container{
    display: flex;
    min-width: calc(100vw + 20rem);

    
}
@media screen and (max-width:768px){
.main_container{
    position: relative;
    left: -20rem;
    transition: 0.5s ease-out;
}
.main_container.nav-show{
    transition: 0.5s ease-in;
    left: -0rem;
}
}


</style>
