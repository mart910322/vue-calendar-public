<template>
    <div class="container">
        <header class="title">
            <div class="title-text">{{ titleDateLocal  }}'s schedule</div>
            <div class="booking-btn" @click="toggleBookingState">+ book appointment </div>
        </header>
        <section class="schedule-events-container">
            <div class="event-wrapper" v-for="({title,content,startTime,endTime,duringTime,ref,isItRegular},index) in handledTimeTableData" :key="index">
     
                <div class="event-date">
                    <div class="month-and-day">
                        <span class="month">{{ monthsName[startTime.getMonth()]  }}</span>
                        <span class="day">{{ startTime.getDate() }}</span>
                    </div>
                    <div class="during-time">
                        <span class="start-time">{{ startTime.getHours() | plusZero }}{{':'}}{{ startTime.getMinutes() | plusZero }}</span>
                        <span class="time-delimiter">-</span>
                        <span class="end-time">{{ endTime.getHours() | plusZero }}{{ ':' }}{{ endTime.getMinutes() | plusZero }}</span>
                    </div>
                    <div class="during-time-total">
                        <span class="during-time-hour">{{ duringTime.hour + 'hour' }}</span>
                        <span class="during-time-minute">{{ duringTime.minutes + 'min' }}</span>
                    </div>
                </div>
                <div class="event-content-wrapper">
                    <div class="event-title">{{ title }}<span v-if="duringTime.hour > 24" class="cross-day-end-time">{{" " + monthsName[endTime.getMonth()] + " " + endTime.getDate() + " end"}}</span></div>
                    <div class="event-datail">{{ content }}</div>
                </div>
                <div class="event-menu-btn-wrapper" :class="{'show':currentShowingMenu == index}">
                    <three-dots-icon class="event-menu-btn" @iconClicked="showMenu(index)" :class="{'show':currentShowingMenu == index}"></three-dots-icon>
             
                    <div class="menu-wrapper"  v-click-outside="showMenu" @click.self="showMenu(index)">
                        <div class="menu-option" v-for="(cell,optionIndex) in menuicons" :key="optionIndex" @click="menuEventsHandle(optionIndex,ref,isItRegular)">
                            <component :is="cell" class="menu-icon"></component>
                            <span class="menu-option-name">{{ menuNames[optionIndex] }}</span>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="handledTimeTableData.length == 0" class="no-event-propmt">no result...</div>
            <note-and-to-do class="note-mobile"></note-and-to-do>
            

        </section>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import threeDotsIcon from '../../../../svg_component/menu_three_dots.vue'

import cancelIcon from '../../../../svg_component/calendar_cancel.vue'
import rescheduleIcon from '../../../../svg_component/calendar_reschedule.vue'
import editScheduleIcon from '../../../../svg_component/edit_pan.vue'

import noteAndToDoPiece from './notes_to_do_piece.vue'
export default {
    components:{
        'three-dots-icon':threeDotsIcon,
        'note-and-to-do':noteAndToDoPiece,
        cancelIcon,
        rescheduleIcon,
        editScheduleIcon,


    },
    mounted(){
        
        let self = this;
        function myFunction(x) {
            if (x.matches) { // If media query matches
            
                self.titleDateLocal ='day';
            } else {
            
                self.titleDateLocal = self.titleDate;
            }
        }

        var x = window.matchMedia("(max-width: 550px)")
        x.addListener(myFunction);


    },
    data(){
        return{
            monthsName:["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEP","OCT","NOV","DEC"],
            menuicons:[cancelIcon,rescheduleIcon,editScheduleIcon],
            menuNames:['Cancel & Delete','Reschedule','Edit schedule'],
            titleDateLocal:'day', 

 
            currentShowingMenu:null,
           
        }
    },
    filters:{
        plusZero(val){
            if(val < 10){
                return '0' + val.toString();
            }
            return  val;
        }
    },

    computed:{
        ...mapState([
            'timeTableData',
            'titleDate'
        ]),
        ...mapGetters([
            'handledTimeTableData',
            'filteredTimeTableData'
        ]),

    },
    directives:{
        'click-outside': {
            bind: function (el, binding) {
                el.clickOutside = function(event){
                    
                    var menus = document.getElementsByClassName('menu-wrapper');
                    if(!(el == event.target || el.contains(event.target) )){

                        if(!(event.target.tagName == 'svg' || event.target.tagName == 'path' || event.target.classList == 'menu-option' || event.target.classList == 'menu-option-name') ){
                            binding.value(null);
                          
                        }   
                    }

                }/*it is a bug in here. the aim should have been the user clicked out of the area of menu , 
                then unshow the menu. but now the 'el.contains' can not match the 'event.target' which is 
                because the 'event.target' will return a element of svg  that is not under the 'el' 
                directly
                */
                document.body.addEventListener('click', el.clickOutside )
            },
            unbind: function (el) {

                document.body.removeEventListener('click', el.clickOutside )
            },
        }

    },
    methods:{
        ...mapMutations([
            'toggleBookingState',
            'showAlert'

        ]),
        ...mapActions([
            'cancelSchedule'
        ]),
        formatDate(date){
         
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');   

        },
        showMenu(index){

            if(this.currentShowingMenu == index){
                this.currentShowingMenu = null;
                return;
            }
            this.currentShowingMenu = index;
        },//the number of currentShowingMenu equal the number of a menu will show

        menuEventsHandle(index,ref,isItRegular){
            //this.showMenu(index); //clickout directive handle this
            

            if(index == 0){
                this.showAlert({msg:'Are you sure you are going to delete this?',needCancel:true,func:this.cancelSchedule,funcChild:{ref,isItRegular}});
                //                showing up the alert ,then execute the function which wrote in func ^ if user clicked  yes
            }
            if(index == 1){
                console.log(index,ref,isItRegular);
             
            }
            if(index == 2){
                console.log(index,ref,isItRegular);
            }


        },
        testingConsole(){
            console.log('asdasdasd');
        }


    }

}
</script>

<style scoped>
.container{
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    border-radius: 6px;
    background: var(--white);
    width: 100%;
    height: 100%;
    min-height: 50rem;
    padding-bottom: 6rem;
}
header.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 1rem 0 0.5rem;

    border-bottom: 1px solid var(--light-gray);

}
.title-text{
    font-size: 1.75rem;
 
}
.booking-btn{
   
    background: var(--light-blue);

    color: var(--dark-blue);
    font-size: 1.1rem;
    opacity: 0.7;

    padding: 0.2rem 2rem 0.3rem 2rem;
    margin-top: 0.5rem;

    cursor: pointer;

}
.booking-btn:hover{
    opacity: 1;
}
.schedule-events-container{
    display: flex;
    flex-direction: column;
}
.event-wrapper{
    display: grid;
    grid-template-columns: calc(6.25rem + 2px) 1fr 2.75rem;
    grid-auto-rows: minmax(6rem,auto);

    border-bottom: 1px solid var(--light-gray);
   
}
.event-date{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid var(--light-gray);
    border-top: none;
    border-bottom: none;
 
    padding: 0 3% 4% 3%;
}
.month-and-day{
    display: flex;
    justify-content: space-between;
    width: 73.5%;
    
    font-size: 1.25rem;
    font-weight: 400;
}
.day{
    display: block;
    text-align: center;
    min-width: 2rem;
    margin-bottom: 0.1rem;
}
.during-time{
    display: flex;
    justify-content: space-between;   
    width: 87.5%;
    font-weight: 300;
    font-size: 1rem;
    color: var(white);
    opacity: 0.825;
  
}
.during-time-total{
   
    color: var(--normal-blue);
    font-weight: 400;
    font-size:1rem;

    margin-top: 0.75rem;

}
.during-time-hour{
    margin-right: 0.2rem;
}

.event-content-wrapper{
    padding: 0.25rem 0.5rem;
    max-width: 47.5rem;
}

.event-title{
    font-weight: 400;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;

}
.cross-day-end-time{
    margin-left: 0.5rem;
    color: var(--normal-blue)
}
.event-datail{
    font-weight: 300;
    font-size: 1.175rem;
   
}

.event-menu-btn-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.event-menu-btn-wrapper.show .menu-wrapper{
    display: block;
}
.event-menu-btn{

    --icon-color:var(--normal-blue);
    opacity: 0.6;
    width: 0.65rem;
    cursor: pointer;
}
.menu-wrapper{
    position: absolute;
    z-index: 10;
    right: 0;
    transform: translateX(100%);
    width: 15rem;
 
    background: var(--white);
    box-shadow: 2px 3px 6px rgba(0,0,0,0.16);
    display: none;

}

.menu-option{
    cursor: pointer;
    /*
    display: flex;
    justify-content: space-between;
    align-items:center;
    */
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.25rem;

   
}

.menu-option:not(:last-of-type){
    border-bottom: 1px solid var(--light-gray);
}
.menu-option-name{
    font-size: 1.3rem;
    opacity: 0.8;
    
}
.menu-icon{
    --icon-color:var(--gray-border);
    width: 1.4rem;
}
.menu-option:hover .menu-icon{


    --icon-color:var(--normal-blue);
}
.menu-option:hover .menu-option-name{
    font-size: 1.4rem;
    opacity: 1;
}



.event-menu-btn.show{
    opacity: 1;
}
.event-menu-btn:hover{
    opacity: 1;
}
.no-event-propmt{
    height: 2.5rem;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0 0.5rem;
    color: var(--normal-blue);
}
.note-mobile{
    display: none;
}
@media screen and (max-width: 1065px){
.container{
    box-shadow:none;

}    
.event-menu-btn-wrapper.show .menu-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.menu-wrapper{
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);

    box-shadow: none;

    background: rgba(0,0,0,0.5);
 

}   
.menu-option{
    padding: 0 0.75rem;
    background: var(--white);
    height: 4.5rem;
    grid-template-columns: 3rem 1fr;
} 
.menu-option:not(:last-of-type){
    border-bottom: 1px solid var(--gray-border);
}
.menu-option-name{
    font-size: 1.5rem;

    
}
.menu-icon{
    --icon-color:var(--gray-border);
    width: 1.75rem;
}

.menu-option:hover .menu-option-name{
    font-size: 1.65rem;

}


.note-mobile{
    display: grid;
}

.menu-wrapper .menu-option{
 
}
.event-menu-btn-wrapper.show .menu-option{
    animation:  0.5s menuSliderTop ;


}
@keyframes menuSliderTop {
    0%{
        transform: translateY(300%);
    }
    100%{
        transform: translateY(0%);
    }
}

}
@media screen and (max-width: 768px){
header.title{

    padding: 0 0.25rem 0 0.25rem;



}

}
@media screen and (max-width: 550px){
.event-wrapper{

    grid-template-columns:  1fr 3rem;
    grid-auto-rows: 2.5rem minmax(7.25rem,7.25rem);

    border-bottom: 1px solid var(--light-gray);
   
}
.event-date{
    grid-column: 1 / 4;


    display: grid;
    grid-template-columns:5.25rem 1fr 7.5rem; 
    align-items: center;
    grid-column-gap: 0.5rem;

    border: none;


    padding: 0 1% 0 2%;    
    background: var(--light-blue);

}
.month-and-day{


    font-size: 1.5rem;


}

.during-time{


    justify-content:flex-start;   
    font-size: 1.325rem;

  
}
.day{
    margin-bottom: 0.15rem
}
.during-time-total{
   

    font-size:1.3rem;

    margin-top: 0rem;

}
.event-title{

    font-size: 1.425rem;
    margin-bottom: 0rem;
}
.event-datail{

    font-size: 1.2rem;
   
}
.event-menu-btn-wrapper{

    justify-content: center;


}
}
</style>
