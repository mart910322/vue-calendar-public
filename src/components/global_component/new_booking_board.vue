<template>
    <div class="back-board" v-if="doesBookingBoardShow">
        <div class="container">
            <header class="head">
                <div class="title">Booking appointment</div>
                <cross-icon class="cross icon" @iconClicked="cancelBooking"></cross-icon>
            </header>
            <section class="typing-title-area">
                <input type="text" class="appointment-title" placeholder="type the title..." v-model="title">
            </section>
            <section class="is-it-regular-question-area" v-if="!didYesOrNoClick">
                <calendar-icon class="calendar icon"></calendar-icon>
                <span class="question-text">Is it regular?</span>
                <div class="yes btn" @click="didYesOrNoClick = true;isItRegular = true;">Yes</div>
                <div class="no btn" @click="didYesOrNoClick = true;isItRegular = false;">No</div>
            </section>
            
            <transition name="fade">
                <section class="body" v-if="didYesOrNoClick">               
                    <div class="regular" v-if="isItRegular">
                        <div class="row">
                            <calendar-icon class="calendar icon"></calendar-icon>
                            <div class="regular-days-container">
                                <span v-for="({day,wasSelected},index) in dayNames" :key="index" class="regular-days" :class="{'selected' : wasSelected }" @click="selectingDays(index)">{{ day }}</span>

                            </div>
                        </div>
                        <div class="row">
                            <clock-icon class="clock icon"></clock-icon>
                            <select class="select-time start date-option" v-model="regularStartTime">
                                <option :value="time" v-for="(time,index) in timeSelection" :key="index">{{ time }}</option>
                            </select>  
                            <span class="separate-symbol">-</span>
                            <select class="select-time start date-option" v-model="regularEndTime">
                                <option :value="time" v-for="(time,index) in timeSelection" :key="index">{{ time }}</option>
                            </select> 
                        </div>
                    </div>
                    <div class="not-regular row" v-if="!isItRegular">
                        <clock-icon class="clock icon"></clock-icon>
                        <div class="date-picker-container">
                            <select class="select-year start date-option" v-model="notRegularStartTime.year">
                                <option :value="2020 + index" v-for="(year,index) in new Array(30)" :key="index" >{{ 2020 + index }}</option>
                            </select>

                            <select class="select-month start date-option "  v-model="notRegularStartTime.month">
                                <option :value="index" v-for="(month,index) in monthsName" :key="index" >{{ month}}</option>
                            </select>     

                            <select class="select-day start date-option" v-model="notRegularStartTime.day">
                                <option :value="index + 1" v-for="(day,index) in new Array(31)" :key="index">{{ index + 1 | plusZero}}</option>
                            </select>  

                            <select class="select-time start date-option" v-model="notRegularStartTime.time">
                                <option :value="time" v-for="(time,index) in timeSelection" :key="index">{{ time }}</option>
                            </select>  

                            <span class="separate-symbol">-</span>

                            <select class="select-time end date-option"  v-model="notRegularEndTime.time">
                                <option :value="time" v-for="(time,index) in timeSelection" :key="index">{{ time }}</option>
                            </select> 
                            

                            <select class="select-day end date-option" v-model="notRegularEndTime.day">
                                <option :value="index + 1" v-for="(day,index) in new Array(31)" :key="index">{{ index + 1 | plusZero}}</option>
                            </select>    
                            
                            <select class="select-month end date-option" v-model="notRegularEndTime.month">
                                <option :value="index" v-for="(month,index) in monthsName" :key="index" >{{  month }}</option>
                            </select>  

                            <select class="select-year-end date-option" v-model="notRegularEndTime.year">
                                <option :value="2020 + index" v-for="(year,index) in new Array(30)" :key="index">{{ 2020 + index }}</option>
                            </select>

                        </div>

                    </div>
                    <div class="datails-container row">
                        <details-icon class="details icon"></details-icon>
                        <textarea class="datalis-input-area" placeholder="type your appointment datails..." v-model="details"></textarea>
                    </div>
                    <div class="error-text-wrapper row" v-if="errorText != ''">
               
                        <div class="error-text">{{ errorText }}</div>
                    </div>
                </section>
            </transition>
            <transition name="fade">
                <footer class="floor" v-if="didYesOrNoClick">
                    <div class="btn-container">
                        <div class="save btn" @click="dataFormatErrorChecker">save</div>
                        <div class="cancel btn" @click="cancelBooking">cancel</div>
                        
                    </div>
                </footer>
            </transition>
        </div>

    </div>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import calendarIcon from '../svg_component/calendar_reschedule.vue'
import clockIcon from '../svg_component/time_for_lane.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'

export default {
    components:{
        'cross-icon':crossIcon,
        'calendar-icon':calendarIcon,
        'clock-icon':clockIcon,
        'details-icon':detailsIcon
    },
    computed:{
        ...mapState([
            'doesBookingBoardShow',
            'currentDay'
        ]),
        ...mapGetters([
            'dateFormatCurrentDay',
  
        ]),
        timeSelection(){
            let timeSelection = [],handledTimeSelection = [];

            for(var i = 0; i <= 48 ;i++){
                timeSelection.push(i * 0.5);
            }

            timeSelection.map(eachTime => {
                var [hour,minute] = [Math.floor(eachTime),eachTime % 1 * 60];
                minute = this.$options.filters.plusZero(minute);
                hour = this.$options.filters.plusZero(hour);
                
                eachTime = hour + ':' +  minute;
                handledTimeSelection.push(eachTime);
             

            });

            return handledTimeSelection ;
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
    data(){
        return{
            didYesOrNoClick:false,
            isItRegular:false,
      

            title:'',
            details:'',
            regularStartTime:'00:00',
            regularEndTime:'00:00',

            notRegularStartTime:{
                year:2020,
                month:0,
                day:0,
                time:'00:00'
            },
            notRegularEndTime:{
                year:2020,
                month:0,
                day:0,
                time:'00:00'
            },
            errorText:'',

            monthsName:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
            dayNames:[{ day:'SUN', wasSelected:false },{ day:'MON', wasSelected:false },
                      { day:'TUE', wasSelected:false },{ day:'WED', wasSelected:false },
                      { day:'THU', wasSelected:false },{ day:'FRI', wasSelected:false },
                      { day:'SAT', wasSelected:false }],
            

        }
    },
    methods:{



        ...mapMutations([
            'toggleBookingState',
            'loading'
        ]),
        ...mapActions([
            'getUserTimetable'
        ]),
        initializeAllData(){
            this.didYesOrNoClick = false;
            this.isItRegular = false;

            this.title = '';
            this.details = '';
            this.regularStartTime = '00:00';
            this.regularEndTime = '00:00';

            this.notRegularStartTime = initializeDate();
            this.notRegularEndTime = initializeDate();


            function initializeDate(){
                var getToday = new Date();

                return{
                    year:getToday.getFullYear(),
                    month:getToday.getMonth(),
                    day:getToday.getDate(),
                    time:'00:00'
                }
            }
            
            this.dayNames=[{ day:'SUN', wasSelected:false },{ day:'MON', wasSelected:false },
                            { day:'TUE', wasSelected:false },{ day:'WED', wasSelected:false },
                            { day:'THU', wasSelected:false },{ day:'FRI', wasSelected:false },
                            { day:'SAT', wasSelected:false }];            
        },
        cancelBooking(){
            this.endingAction();
        },
        selectingDays(index){

            this.dayNames[index].wasSelected = !this.dayNames[index].wasSelected ;
     
        },
        dataFormatErrorChecker(){
            let formatedStartDate,formatedEndDate,startTime,endTime ;


            if(this.title.length > 25){
                    this.errorText = 'title only can be 25 character';
                    return
            }
       
            if(this.isItRegular){
                
                var daySelectedChecker = this.dayNames.filter(eachDay => {
                    return eachDay.wasSelected;
                })
        
                if(daySelectedChecker.length == 0){
                    this.errorText = 'you have not selected any day';
                    return
                }

                [startTime,endTime ] = [this.formatTime(this.regularStartTime),this.formatTime(this.regularEndTime)];
              


                if(startTime[0] + startTime[1] > endTime[0] + endTime[1]){
                    this.errorText = 'time format error'
                    return                    
                }

                [formatedStartDate,formatedEndDate] = [this.regularStartTime,this.regularEndTime];

            }else{
                startTime = this.notRegularStartTime;
                endTime = this.notRegularEndTime;

                var formatedStartTime = this.formatTime(startTime.time);
                var formatedEndTime = this.formatTime(endTime.time);
     
                [formatedStartDate,formatedEndDate] = [new Date(startTime.year,startTime.month,startTime.day,formatedStartTime[0],formatedStartTime[1] ),new Date(endTime.year,endTime.month,endTime.day,formatedEndTime[0],formatedEndTime[1] )];
            
                if(formatedStartDate.getTime > formatedEndDate.getTime()){
                    this.errorText = 'time format error'
                    return                         
                }
            
                
            }


            this.errorText = '';
            this.newAppointment(formatedStartDate,formatedEndDate);
        },
        endingAction(DidItNeedLoading){
            let endDay = new Date(this.dateFormatCurrentDay.getTime());
            endDay.setDate(endDay.getDate() + 1);       

            this.errorText = '';
            this.getUserTimetable({startTimeLine:this.dateFormatCurrentDay, endTimeLine: endDay});
            this.initializeAllData();
            this.toggleBookingState();
            if(DidItNeedLoading){
                this.loading();
            }
        },//this a funtion for after the add new booking appointment has finished
        newAppointment(startTime,endTime){



            this.loading();
            var currentUser = firebase.auth().currentUser;





            if(this.isItRegular){//true == is regular

                var days = [];
                this.dayNames.forEach((eachDay,index) => {
                    if(eachDay.wasSelected){
                        days.push(index);
                  
                    }
                })
               
                db.collection('user-profile').doc(currentUser.uid).collection('user-timetable-regular').add({
                    title:this.title,
                    content:this.details,
                    startTime:startTime,
                    endTime:endTime,
                    isItRegular:this.isItRegular,
                    days:days,
            
                 
                }).then(() => {

                    this.endingAction(true);
      
                }).catch(err => {

                    this.endingAction(true);
                    

                    this.errorText = err;
                    console.log(err);
                });

            }else{

     

                db.collection('user-profile').doc(currentUser.uid).collection('user-timetable').add({
                    title:this.title,
                    content:this.details,
                    startTime:startTime,
                    endTime:endTime,
                    isItRegular:this.isItRegular,


                }).then(() => {
                    this.endingAction(true);
           
                }).catch(err => {
                    this.endingAction(true);
        
                    this.errorText = err;
                    console.log(err  );
                    console.log(err  );
                })
   
            }

        },
        formatTime(time){
            var splitedTime = time.split(':');
   
            return [parseInt(splitedTime[0]),parseInt(splitedTime[1])]
        }

    },
    created(){
        this.initializeAllData();
      
    
    }
}
</script>
 
<style scoped>
.back-board{
    position:fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);


    display: flex;
    justify-content: center;
    align-items: center;
}
.container{
    width: 34.5rem;
    background: var(--white);
    padding: 0.75rem 0.65rem 0.75rem 0.5rem;
}
.head{
  

    display: grid;
    grid-template-columns: 1fr 1.45rem;
    align-items: center;

    padding-right: 0.15rem;
    width: 100%;
}
.title{
    font-size: 1.75rem;
    font-weight: 400;
    color: var(--normal-blue);
    margin: 0;
    padding: 0;
  
}
.icon.cross{
       
    width:1.45rem;
  
    --icon-color: var(--black);
    cursor: pointer;


}
.icon.cross:hover{
    --icon-color: var(--normal-blue);
}
.typing-title-area{
    width: 100%;
    padding: 0 0.75rem;
    margin-bottom: 0.75rem;
}
.appointment-title{
    width: 100%;
    border: none;
    border-bottom: 1.5px solid var(--gray-border);
    outline: none;
    font-size: 1.675rem;
    font-weight: 300;
    margin-top: 0.75rem;
    padding: 0.15rem 0;
}
.appointment-title:focus{
   border-bottom: 1.5px solid var(--normal-blue);
}
.is-it-regular-question-area{
    display: grid;
    grid-template-columns: 2.25rem 3.25fr 3fr 3fr;
    grid-column-gap: 0.75rem;
    padding: 0 0.75rem;
    height: 3.5rem;

    align-items: center;
}   
.icon{
    width: 1.85rem;
    --icon-color:var(--dark-gray);
    margin-right: 1rem;
}
.calendar{
    /*
    width: 2rem;
    --icon-color:var(--dark-gray);
    */
}
.question-text{
    font-size: 1.55rem;
    font-weight: 400;
    color: var(--dark-gray);
    margin-bottom: 0.25rem;
}
.btn{
    width: 8.5rem;
    padding: 0.15rem 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    justify-self: center;
    font-size: 1.15rem;

    cursor: pointer;
    transition: 0.25s;
        

}
.btn.yes{
    background: var(--normal-blue);
    color: var(--white);
    opacity: 0.8;
}

.btn.no{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
    
}
.btn.yes:hover{
    opacity: 1;
}
.btn.no:hover{
    background: var(--normal-blue);
    color: var(--white);
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s ease-in;
}
.fade-enter,.fade-leave-to{
    opacity: 0;

}
.fade-enter-to,.fade-leave{
    opacity: 1;

}



.body{
    display: grid;
    grid-template-columns: 1fr;
  
    
  
}

.row{
    padding: 0.5rem 0.75rem;
    display: flex;
  



    
}
.row.regular{
   
}
.regular-days-container{
    margin-left: 0.25rem;
    display: flex;
    align-items: center;
}
.regular-days{
    margin-right: 0.75rem;
    color:var(--gray-border);
    font-size: 1.25rem;
    font-weight: 500;
    cursor: pointer;
}
.regular-days:hover{
    color:var(--normal-blue);
}
.regular-days.selected{
    color:var(--normal-blue);
}

.row.not-regular{
    display: grid;
    grid-template-columns: 3rem 1fr;
}
.icon.clock{
    margin-top: 0.25rem;
}
select.date-option{
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    padding: 0 0.25rem;
   

    margin-right: 0.25rem;
    

    border: none;

    cursor: text;
    font-size: 1.325rem;
    color:var(--dark-gray);

    outline-color: var(--normal-blue);


 
    

}
select.date-option:focus{
    color: var(--normal-blue);
}
select.date-option::-ms-expand {
    display: none;
}
.date-picker-container{
    display: flex;
}
.separate-symbol{
    font-size: 1.5rem;
    width:0.85rem;
    height: 100%;
    display: flex;
    align-items: center;


}
.icon.details{
    margin-top: 0.15rem
}
.datalis-input-area{
    margin-left: 0.35rem;
    width: calc(100% - 3rem);
    height: 7.5rem;

    font-size: 1.25rem;
    font-weight: 300;
    padding: 0.15rem 0.25rem;

    outline-color: var(--normal-blue);
}
.error-text{
    margin-left: 3.25rem;
    font-size: 1.25rem;
    color: red;
}

.floor{
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  
}
.btn-container{

    display: flex;
    padding: 0 0.75rem;
  
}
.btn.cancel{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
    
    
}
.btn.save{
    background: var(--normal-blue);
    color:var(--white);
    margin-right: 1rem;
    opacity: 0.8;
  
}
.btn.save:hover{
    opacity: 1;
}
.btn.cancel:hover{
    background: var(--normal-blue);
    color: var(--white);
}
@media screen and (max-width:550px) {
.back-board{
 
    background: var(--gray-background);

    align-items: flex-start;
}
.container{
    width: 100%;
    height: auto;

    padding: 0rem;

}  
.head{
  


    grid-template-columns: 1fr 2rem;
    align-items: center;

    padding:0 0.5rem;
    width: 100%;
    height: 4rem;

    border-bottom: 1px solid var(--gray-border);
}  
.icon.cross{
       
    width:1.45rem;
  
    --icon-color: var(--black);
    cursor: pointer;
    display: flex;
    align-items: center;

}
.title{
    font-size: 2rem;

}
.typing-title-area{
    width: 100%;
    padding: 0 0.75rem;
    margin-bottom: 0rem;    

    border-bottom: 1px solid var(--gray-border);
}
.appointment-title{
    width: 100%;
    height: auto;

    border: none;

    font-size: 1.75rem;

    margin: 0;
    padding:1rem 0;
}
.appointment-title:focus{
   border-bottom: none;
}
.is-it-regular-question-area{
    display: grid;
    grid-template-columns: 3rem 1fr 3rem 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
   


    padding: 1rem 0.75rem;
    height:auto;

    border-bottom: 1px solid var(--gray-border);
} 
.calendar{
    
}
.icon{
    width: 2.5rem;

    margin-right: 1rem;
} 
.question-text{
    font-size: 1.85rem;
    grid-column: 2 / 5;
    margin-bottom: 0rem;
    
} 
.btn{
    width: 100%;
    padding: 0.15rem 0;

    font-size: 1.325rem;

    cursor: pointer;
    transition: 0.25s;



}
.btn.yes{

    grid-column: 1 / 3;
    opacity: 1;

        
}

.btn.no{

    grid-column: 3 / 5;
}

.btn.no:hover{
    background: none;
    color: var(--normal-blue)
}

.body{
    display: grid;
    grid-template-columns: 1fr;

  
    
  
}

.row{
    padding: 1rem 0.75rem;
    display: flex;
    border-bottom: 1px solid var(--gray-border);
}
.regular.row{
   
}
.regular-days-container{
    margin-left: 0.25rem;
    
    
}
.regular-days{
    margin-right: 0.75rem;

    font-size: 1.35rem;

}


.not-regular.row {

    grid-template-columns: 3.75rem 1fr;
}

.icon.clock{
    margin-top: 0.15rem;
    height: 3.25rem;


    
}

select.date-option{

    padding: 0 0.25rem;
   

    margin-right: 0.5rem;
    border: none;


    font-size: 1.5rem;
    outline-color: var(--normal-blue);

}
.select-time.end{
    order: 6;
}
.select-day.end {
    order: 5;
}
.select-month.end {
    order: 4;
}

.row.not-regular select.date-option{
    padding: 0 0.15rem;
    margin-right: calc(4.5% + 0.25rem);
}
select.date-option:focus{
    color: var(--normal-blue);
}


.separate-symbol{
    font-size: 2rem;
    width:auto;
    margin-right: 0.5rem;


}
.date-picker-container{

    
    display: flex;
    flex-flow: wrap;

}
.not-regular  .separate-symbol{
    width: calc(100% - 22.5rem);
  
}
.icon.details{
    margin-top: 0.15rem;
}
.datalis-input-area{
 
    width: 85%;
    height: 9rem;

    font-size: 1.35rem;


    outline-color: var(--normal-blue);

    border-radius: 0;
    border:1px solid var(--gray-border);

}
.error-text{
    margin-left: 3.25rem;
    font-size: 1.25rem;
    color: red;
}

.floor{
    display: flex;
    justify-content: center;
    margin-top: 0rem;
    padding: 1rem 0;
  
}
.btn-container{


    width: 100%;
  
}
.btn-container .btn{
    
    width: 100%;
}
.btn.cancel{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
    
    
}
.btn.save{

    margin-right: 1rem;
    opacity:1;
  
}
.btn.save:hover{
    opacity: 1;
}
.btn.cancel:hover{
    background: none;
    color: var(--normal-blue);
}
}

</style>