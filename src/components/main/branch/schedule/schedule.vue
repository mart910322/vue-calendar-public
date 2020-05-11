<template>
    <div class="schedule-container">
        <title-header>
            <span slot="title">home</span>
        </title-header>
        <section class="content">
                
           <div class="schedule-board">
               <schedule-board></schedule-board>
           </div>

           <aside class="function-pieces-container">
               <div class="function-pieces-wrapper">
                    <div class="search-field">
                        <serach-piece></serach-piece>
                    </div>

                    <div class="date-selector">

                        <div class="date-selector-mobile"><!-- not ready yet-->
                            <div class="calendar-icon"></div>
                            <div class="inputDateWrapper"><input type="date" v-model="currentDate"></div>                          
                            <div classs="showDefaultBtn"></div>
                        </div>

                        <calendar @dayChanged="changeInputDateValue($event)" ref="calendar"></calendar>
                    </div>

                    <div class="notes-board">
                        <note-and-to-do></note-and-to-do>
                    </div>
               </div>
           </aside>


        </section>

    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import calendarTemplate from '../../../template/calendar.vue'
import noteAndToDoPiece from './components/notes_to_do_piece.vue'
import scheduleBoard from './components/schedule_borad.vue'
import serachPiece from './components/serach_piece.vue'

import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'


import db from '../../../../firebase/firebaseinit.js'
import firebase from 'firebase'
export default {
    components:{
        'title-header':titleHeader,
        'calendar':calendarTemplate,
        'note-and-to-do':noteAndToDoPiece,
        'schedule-board':scheduleBoard,
        'serach-piece':serachPiece
    },
    computed:{
        ...mapState([
            'timeTableData',
            

        ]),
        ...mapGetters([
            'secondsFormatCurrentDay',
            'secondsFormatEndDay'
        ])
    },
    data(){
        return{

            
            currentDate:null,

        }
    },
    watch:{
        currentDate(value){
     
            if(value != null || value != undefined || value != '' ){
                this.formatDateTitle(value);
                value = value.split('-');
                
                var [year,month,day] = [value[0],parseInt(value[1]) - 1,parseInt(value[2])];
               // this.$store.state.currentDay = {year,month,day};
  
                this.$refs.calendar.changeDay(year,month,day);    
                         
            }

        }//change the calendar when input[type:date].value is changed
    },
    methods:{
        ...mapActions([
            'getUserTimetable'
        ]),
        ...mapMutations([
            'formatDateTitle',
            'currentDayGetter'
        ]),
        changeInputDateValue({year,month,day}){

            this.fetchTimetable(year,month,day);
            this.currentDayGetter({year,month,day});

            month += 1;
            if(month < 10){
                month = '0' + month.toString();
            }
            if(day < 10){
                day = '0' + day.toString();
            }
            this.currentDate = year + '-' + month + '-' + day;
      

        },//change input[type:date].value when the calendar is changed 
        fetchTimetable(year,month,day){
            let startDate = new Date(year,month,day);
            let nextDate = new Date(year,month,day + 2);

            this.getUserTimetable({startDate:startDate, endDate: nextDate});
        },  
        
    },
    mounted(){
       
        
    }
}
</script>

<style scoped>

.schedule-container{
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    
    width:calc(100vw - 5.75rem);

    background: var(--gray-background);

}
.content{


    width: 100%;
    max-width: 1370px;
    margin: 2rem auto;
   
    
    display: grid;
    grid-template-columns: 3fr 19rem;
    grid-column-gap:3rem; 

}

.function-pieces-wrapper{
    
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-row-gap: 2rem;
    padding-top: 0.5rem;
   
}
.schedule-board{

    height: 50rem;
  
    
}
.search-field{

    height: 2rem;
    width: 100%;
   
}
.date-selector{

    

}
.date-selector-mobile{
    display: none;
}
.date-selector-mobile .calendar-icon{

}
.date-selector-mobile .inputDateWrapper{

}
.date-selector-mobile .showDefaultBtn{

}



.notes-board{

    width: 100%;
    height: 10rem;

}

</style>