<template>
    <transition name="roll-up">
        <div class="back-board" >

        </div>
    </transition>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import calendarIcon from '../svg_component/calendar_reschedule.vue'
import clockIcon from '../svg_component/time_for_lane.vue'
import detailsIcon from '../svg_component/detail_article.vue'

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {bus} from '../../main.js'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'

export default {
    components:{
        //'cross-icon':crossIcon,
        //'calendar-icon':calendarIcon,
        //'clock-icon':clockIcon,
        //'details-icon':detailsIcon
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

</style>