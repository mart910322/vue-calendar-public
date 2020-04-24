<template>
    <div>
        <landing-header></landing-header>

        <main class="function-box">
            <transition name="fade-left">
                <router-view></router-view>
            </transition>
        </main>

        <nav class="nav-icons-container">
            <div v-for="(navIconName,index) in navIconsName" :key="index" class="nav-icon-wrapper">
                <component :is="navIcons(index)" class="nav-icon"></component>
                <span class="nav-icon-name">{{ navIconName }}</span>
            </div>
        </nav>
        <article>
            <landing-article :isContentFirst="false">
                <img src="../../assets/background_image/hourGlass.jpg" slot="picture">
                <span slot="title">Save your time</span>
                <span slot="content">
                    Manage and track your time effectively. Let you know where has the time gone. Then reduce unnecessary time spending. And get efficient lifestyle. Even do more work in a day                 
                </span>
            </landing-article>
            <landing-article :isContentFirst="true">
                <img src="../../assets/landing_content_image/wotk_to_do_list.jpg" slot="picture">
                <span slot="title">Task notes and to do list</span>
                <span slot="content">
                    Manage and track your time effectively. Let you know where has the time gone. Then reduce unnecessary time spending. And get efficient lifestyle. Even do more work in a day                 
                </span>
            </landing-article>
            <landing-article :isContentFirst="false">
                <img src="../../assets/landing_content_image/work_schedule.jpg" slot="picture">
                <span slot="title">Easy to use</span>
                <span slot="content">
                    You don't need any tutorials and instructions. It will come naturally to you and pick it up. It will not spend your time a lot as well. But it keeps its powerful function as the same                </span>
            </landing-article>
            <landing-article :isContentFirst="true"> 
                <img src="../../assets/landing_content_image/work_calendar.jpg" slot="picture">
                <span slot="title">Calendar and schedule</span>
                <span slot="content">
                    Manage and track your time effectively. Let you know where has the time gone. Then reduce unnecessary time spending. And get efficient lifestyle. Even do more work in a day                 
                </span>
            </landing-article>


        </article>
        <footer>

        </footer>
    </div>
</template>

<script>

import landingHeader from './component/landing_header.vue'
import landingArticle from './component/article_row.vue'

//icons
import clockIcon from '../svg_component/time_for_lane.vue';
import taskBorderIcon from '../svg_component/task_border_done.vue';
import appsIcon from '../svg_component/apps_square.vue';
import calendarIcon from '../svg_component/calendar_clock.vue';
//icons

export default {
    data(){
        return{
            navIconsName:['save your time','task notes','easy to use','calendar'],
        }
    },
    components:{
        'landing-header':landingHeader,
        'landing-article':landingArticle,

        'clock-icon':clockIcon,
        'task-border-icon':taskBorderIcon,
        'apps-icon':appsIcon,
        'calendar-icon':calendarIcon

    },
    computed:{
        


    },
    methods:{
        navIcons(index){
            switch(index){
                case 0: return clockIcon;
                case 1: return taskBorderIcon;
                case 2: return appsIcon;
                case 3: return calendarIcon;
            }

            return calendarIcon;
        },//variable for dynamic component


    }
}
</script>

<style>
main.function-box{
    width: 100%;

    height:calc(100vh - 8rem - 3.85rem);
    min-height: 500px;

    background-image:linear-gradient(rgba(0,33,48,0.5) 0%, rgba(0,33,48,0.5) 100%) ,url('../../assets/background_image/landing_page_background.jpg');
    background-size: cover ;
    background-position: center ;
}
.nav-icons-container{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(8rem,auto);
    background: var(--dark-blue);

    
}
.nav-icon-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    cursor: pointer;
    
}
.nav-icon-wrapper:hover{
    background: rgba(255,255,255,0.1);
}
.nav-icon-wrapper:hover .nav-icon{
    --icon-color:var(--white);
}
.nav-icon-wrapper:hover .nav-icon-name{
    color: var(--white);
}
.nav-icon{

    width: 2.85rem;
    margin-bottom: 0.25rem;
    --icon-color:var(--light-blue);
}
.nav-icon-name{
    color: var(--light-blue);
    font-weight: 400;
    font-size: 1.25rem;
}
@media screen and (max-width: 700px){
.nav-icons-container{
   
    grid-template-columns: repeat(2,1fr);
    grid-auto-rows: minmax(8rem,auto);

}

}
</style>