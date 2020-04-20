<template>
    <div class="mother">
        <div class="title">
            <div class="year-and-month">{{ monthNames[currentMonth] + " " + currentYear }}</div>
            <div class="MonthBtn-container">
                <div class="prev-month-btn MonthBtn" @click="prevOrNextMonth(-1)"><svg height='100px' width='100px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.00024 47.99976" x="0px" y="0px"><path d="M4.00012,47.99976a4,4,0,0,1-2.82861-6.82862L18.34338,23.99976,1.17151,6.82837A4.00027,4.00027,0,0,1,6.82874,1.17114l20,20a4.00061,4.00061,0,0,1,0,5.65723l-20,20A3.98887,3.98887,0,0,1,4.00012,47.99976Z"></path></svg></div>
                <div class="next-month-btn MonthBtn"  @click="prevOrNextMonth(1)"><svg height='100px' width='100px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.00024 47.99976" x="0px" y="0px"><path d="M4.00012,47.99976a4,4,0,0,1-2.82861-6.82862L18.34338,23.99976,1.17151,6.82837A4.00027,4.00027,0,0,1,6.82874,1.17114l20,20a4.00061,4.00061,0,0,1,0,5.65723l-20,20A3.98887,3.98887,0,0,1,4.00012,47.99976Z"></path></svg></div>
            </div>
        </div>
        <div>
            <table>
         
                <tr class="dateHeader" >
                    <th v-for="(day,index) in dayNames" :key="index">{{ day }}</th>
                </tr>
               
                <tr class="dateBody">
                    <th v-for="(day,index) in dayNumbers" :key="index" @click="emitDate(index)" :class="[{today : initializeDay  == index - firstDay + 1 && isThisYearAndMonth },{dayOfNotBlank: index >= firstDay}]">{{ day }}</th>
                </tr>
          
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            initializeYear:null,
            initializeMonth:null,
            initializeDay:null, 
            

            currentYear:null,
            currentMonth:null,
            currentDay:null,

            firstDay:null,
            totaldaysInMonth:null,

            monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],
            dayNames:['su','mo','tu','we','th','fr','sa'],
            dayNumbers:[],

        }
    },
    computed:{
        isThisYearAndMonth(){
            return this.currentYear == this.initializeYear && this.currentMonth == this.initializeMonth;
            //checking Is the day in the mount and year of now
        },
    

    },
    methods:{
        
        emitDate(index){
            if(index >= this.firstDay){
                var whichDay = index - this.firstDay + 1;
                this.changeDay(this.currentYear,this.currentMonth,whichDay);//get the day when clicked
                this.$emit('dayChanged',{
                    year:this.initializeYear,
                    month:this.initializeMonth,
                    day:this.initializeDay
                })
            }
 
        },
        changeDay(year,month,day){

            this.initializeYear = year;
            this.initializeMonth = month;
            this.initializeDay = day;
            //here is for update the inital date to current
        

            if(this.initializeYear != this.currentYear){
                this.currentYear = this.initializeYear;
                this.showCalendar(year,month);
            }
            if(this.initializeMonth != this.currentMonth){
                this.currentMonth = this.initializeMonth;
                this.showCalendar(year,month);
            }//check has it updated
            

        },

        prevOrNextMonth(prevOrNext){
            this.currentMonth += prevOrNext;

            if(this.currentMonth > 11){
                this.currentYear += 1;
                this.currentMonth = 0;
            }
            if(this.currentMonth < 0){
                this.currentYear -= 1;
                this.currentMonth = this.monthNames.length - 1;
            }
            // update the current year and month then show on calendar

            this.showCalendar(this.currentYear,this.currentMonth);
        },
        showCalendar(year,month){

            this.dayNumbers = [];
            this.firstDay = (new Date(year, month)).getDay();
            this.totaldaysInMonth = 32 - new Date(year, month, 32).getDate();



            for( var i = 1 ; i <= this.firstDay ; i++ ){
                this.dayNumbers.push("");
            }// the blank space before first day
            for(var l = 1; l <= this.totaldaysInMonth; l++ ){
                this.dayNumbers.push(l);
            }//render the day

            
        }
    },
    created(){
        var today = new Date();

        this.initializeYear = today.getFullYear();
        this.initializeMonth = today.getMonth();
        this.initializeDay = today.getDate();
   

        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();

        //initialize the date

        this.showCalendar(this.currentYear,this.currentMonth);
   
    }
}
</script>

<style scoped>
/*
    body{
        background: #F9F9F9;
        font-family: "Segoe UI";
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
    }   
    *{
        box-sizing: border-box;
    }
*/
    .mother{
        width: 20rem;
        height: 20rem;
        background: white;
        padding:0.25rem 0.5rem;

        box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    
        width: 100%;
        padding: 0 0.5rem 0.15rem 0.5rem;
 
        border-bottom: 1px solid #707070;

    }
    .year-and-month{
        font-size: 1.7rem;
        font-weight: 400;
        
    }
    .MonthBtn-container{
        display: flex;
        align-items: center;
    }
    .MonthBtn{
        width: 1.25rem;
        height: 1.25rem;
        margin-left:0.5rem; 
        cursor: pointer;

    }
    .MonthBtn svg{
        height: 100%;
        width: 100%;
        fill: black;
       
    }
    .prev-month-btn{
        transform: rotate(180deg);

 
   
    }
    .next-month-btn{

    
    }
    table{
        width: 100%;
        display: block;
      
    }
    tr{
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-auto-rows: minmax(1rem,auto);
        grid-column-gap: 0rem;
        grid-row-gap: 0.5rem;

        justify-items: center;
        align-items: center;
        
  
    }
    .dateHeader{
        margin-bottom: 0.25rem;
    }
    th{
        font-weight: 400;
        font-size: 1.175rem;
        padding: 0.25rem;

        min-width: 2rem;
 
   
    }
    .today{
        background: #D2E0E9;
        color: white;
        border-radius: 999px;
    }
    th.dayOfNotBlank{
        cursor: pointer;
        font-weight: 300;
    }
    th.dayOfNotBlank:hover{
        background: #D2E0E9;
        color: white;
        border-radius: 999px;
    }
</style>