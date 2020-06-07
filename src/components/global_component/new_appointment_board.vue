<template>
    <transition name="roll-up">
        <div class="back-board" >
            <div class="container">
                <header class="title">
                    <div class="title">book appointment</div>
                    <cross-icon class="cross icon"></cross-icon>
                </header>
                <main class="body">
                    <section class="page one" v-if="false">

                        <div class="each-wrapper">
                            <div class="index">1.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">does the appointment happen regularly?</div>
                                <div class="answer-wrapper checkbox">

                                    <div class="custom-checkbox">
                                        <div class="checkbox-box">
                                            <tick-icon class="tick"></tick-icon>
                                        </div>
                                        <span class="checkbox-text">Yes</span>
                                    </div>
                                    <div class="custom-checkbox">
                                        <div class="checkbox-box">
                                            <tick-icon class="tick"></tick-icon>
                                        </div>
                                        <span class="checkbox-text">No</span>
                                    </div>

                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">2.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">type task name</div>
                                <div class="answer-wrapper input-text">
                                    <title-icon class="icon"></title-icon>
                                    <input type="text" class="input-text">
                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">3.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">type task details</div>
                                <div class="answer-wrapper input-text">
                                    <details-icon class="icon"></details-icon>
                                    <input type="text" class="input-text">
                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                    </section>


                    <section class="page two reuglar">

                        <div class="each-wrapper">
                            <div class="index">4.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">pick days it will repeat</div>
                                <div class="answer-wrapper days-picker">


                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">5.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it start</div>
                                <div class="answer-wrapper input-text">
                                    <title-icon class="icon"></title-icon>
                                    <input type="datetime-local" class="input-text">
                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">6.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it end</div>
                                <div class="answer-wrapper input-text">
                                    <details-icon class="icon"></details-icon>
                                    <input type="datetime-local" class="input-text">
                                </div>
                                <div class="error-text">something wrong</div>
                            </div>
                        </div>

                    </section>


                </main>
                <footer class="buttons">
                    <div class="next btn">next</div>
                    <div class="prev btn">cancel</div>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import calendarIcon from '../svg_component/calendar_reschedule.vue'
import clockIcon from '../svg_component/time_for_lane.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import titleIcon from '../svg_component/headline.vue'
import tickIcon from '../svg_component/tick.vue'

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {bus} from '../../main.js'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'

export default {
    components:{
        'cross-icon':crossIcon,
        'title-icon':titleIcon,
        'tick-icon':tickIcon,
        //'calendar-icon':calendarIcon,
        //'clock-icon':clockIcon,
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
            'toggleBookingStatus',
            'loading',
            'showPrompt'

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
            if(this.title.length <= 0){
                this.errorText = 'title can not be emtpy';
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


           /* let endDay = new Date(this.dateFormatCurrentDay.getTime());
            endDay.setDate(endDay.getDate() + 1);       
            
            this.getUserTimetable({startTimeLine:this.dateFormatCurrentDay, endTimeLine: endDay});*/
            

            this.errorText = '';
            this.initializeAllData();
            this.toggleBookingStatus();
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
                    this.emitStatus(true);
      
                }).catch(err => {

                    this.endingAction(true);
                    

                    this.errorText = err;
                    console.log(err);
                    this.emitStatus(false);
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
                    this.emitStatus(true);
           
                }).catch(err => {
                    this.endingAction(true);
        
                    this.errorText = err;
                    console.log(err  );
                    this.emitStatus(false);
                })
   
            }

        },
        formatTime(time){
            var splitedTime = time.split(':');
   
            return [parseInt(splitedTime[0]),parseInt(splitedTime[1])]
        },
        emitStatus(doesItSuccess){
            let msg = '';
            if(doesItSuccess){
                msg = 'booked  anew appointment successful';
                bus.$emit('addedAppointment');
            }else{
                msg = 'failed to book appointment';
            }

            this.showPrompt({success:doesItSuccess,msg:msg});
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

    z-index: 100;
}
.container{
    background: var(--white);
    width: 35rem;
    min-height: 22.5rem;
    padding-bottom: 1rem;
    border-radius: 8px;



    display: grid;
    grid-row-gap: 0.75rem;
    grid-template-rows: 4rem 1fr 2rem;
}
header.title{
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    padding: 0 1rem 0 0.5rem;
    border-radius: 8px 8px 0 0;

    background-image:  linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),linear-gradient(var(--light-blue) , var(--light-blue));

  
}
div.title{
    font-size: 1.5rem;

}
.cross.icon{
    width: 1.45rem;
    cursor: pointer;
}
.cross.icon:hover{
    --icon-color:var(--normal-blue);
}


.body{
    padding: 0rem 0.75rem;
}
.page{
    display: grid;
    grid-template-columns:1fr;
    grid-template-rows: repeat(3,minmax(5rem)); 

    grid-row-gap: 1rem;
}
.page.one{

}
.each-wrapper{
    display: grid;
    grid-template-columns: 1.5rem 1fr;

}
.index{
    font-size: 1.5rem;
    font-weight: 300;
}
.q-and-a-wrapper{

}
.question{
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--normal-blue)
}
.answer-wrapper{
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
}

.answer-wrapper.checkbox{

}
.answer-wrapper.input-text{

    border: 1px solid var(--gray-border);
    padding:0.15rem 0.5rem;
    width: 85%;
}

.custom-checkbox{
    display: flex;
    align-items: center;
    margin-right: 1rem;

    cursor: pointer;
}
.checkbox-box{
    width: 1rem;
    height: 1rem;
    padding: 0.075rem;
    border: 1px solid var(--black);

    margin-right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
  
}
.tick{
    display: none;
    transform: scale(1) rotate(-5deg) translateY(-10%);
}
.tick.checked{
    display: inline;
}
.checkbox-text{
    
}
input.input-text{
    font-size: 1.25rem;
    border: none;
    
   -webkit-appearance:none;
   -moz-appearance:none;
   appearance:none;
   outline: none;

   width: 100%;
}
.error-text{
    color: var(--normal-red);

}
.body .icon{
    --icon-color: var(--gray-border);
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

.buttons{
    display: flex;
    justify-content: flex-end;
    padding: 0 1.5rem;

   
}
.buttons .btn{
    width: 7.5rem;
    height: 1.85rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.buttons .btn:hover{
    background: var(--light-blue);
    color: var(--normal-blue);
    border: 1px solid var(--light-blue)
}
.next{
    background: var(--normal-blue);
    color: var(--white);
 
    margin-right: 1.25rem;
}
.prev{

    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
}

</style>