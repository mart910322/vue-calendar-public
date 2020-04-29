<template>
    <div class="container" >
        <header class="nav-header" @click="$router.push('/home')"><h1 class="logo-text">logo</h1></header>
        <section class="nav-body">
            <div v-for="(cell,index) in navNames" :key="index" class="nav-element-wrapper" @click="linkTo(index)">
                <component :is="navIcons(index)" class="nav-icon"></component>
                <span class="nav-name">{{cell}}</span>
            </div>
      
        </section>
        <footer class="nav-footer">
            <div class="nav-element-wrapper">
                <support-icon  class="nav-icon"></support-icon>
                <span class="nav-name">support</span>
            </div>
        </footer>
    </div>
</template>

<script>
import firebase from 'firebase'

import homeIcom from '../../svg_component/home.vue'
import calendarIcon from '../../svg_component/calendar_clock.vue'
import taskboardIcon from '../../svg_component/task_border_done.vue'
import settingIcon from '../../svg_component/setting_slim_line.vue'
import logoutIcon from '../../svg_component/logout_door.vue'
import supportIcon from '../../svg_component/support_question.vue'

export default {
    components: {
        'home-icom':homeIcom,
        'calendar-icon':calendarIcon,
        'taskboard-icon':taskboardIcon,
        'setting-icon':settingIcon,
        'logout-icon':logoutIcon,
        'support-icon':supportIcon

    },
    directives:{
    },
    data(){
        return{
            navNames:["home","calendar","task board","setting","log out"],
        }
    },
    computed:{

    },
    methods:{
        navIcons(index){
            switch(index){
                case 0 : return homeIcom;
                case 1 : return calendarIcon;
                case 2 : return taskboardIcon;
                case 3 : return settingIcon;
                case 4 : return logoutIcon;
            }
        },//variable for dynamic component,it used for nav-icon
        linkTo(index){

            let {$router:router} = this;

            switch(index){
                case 0 : router.push('/home');break;
                case 1 : router.push('/home/calendar');break;
                case 2 : router.push('/home/taskBoard');break;
                case 3 : router.push('/home/setting');break;
                case 4 : firebase.auth().signOut();router.push('/');break;
            }  

        }//when the nav element was clicked, this event redirect to next destination
    }
}
</script>

<style scoped>
.container{
    width: 5.75rem;
    height: 100vh;
    background: var(--dark-blue);
    display: grid;
    grid-template-rows: 1fr 10fr 1fr;

    overflow: hidden;
    transition: 0.5s;
   
}
.container:hover{
    width: 20rem;
}

.nav-header{
    width: 100%;
  
}
.logo-text{
    margin: 0;
    padding: 0.75rem 0 0.15rem 0.75rem;


    color: var(--brown);
    font-weight: 400;
    font-size: 1.9rem;

    cursor: pointer;
    
}
.nav-body{
  
    display: grid;
    grid-auto-rows: 6.5rem;

}
.nav-element-wrapper{
    width:20rem;
    height: 6.5rem;
    padding: 0 1.5rem;
    
    
    display: flex;
    align-items: center;

    cursor: pointer;

}
.nav-element-wrapper:hover{
    background: rgba(255,255,255,0.3);
}

.nav-icon{
    width: 2.35rem;
    margin-right: 3rem;
    --icon-color:var(--light-blue);
}
.nav-name{
    color: var(--light-blue);
    font-size: 1.65rem;
    font-weight: 300;
    transition: 0.5s;
    opacity: 0;
    padding-bottom: 0.125rem


}
.container:hover .nav-name{
    opacity: 1; 
}



.nav-footer{
 
    width: 100%;

}
</style>