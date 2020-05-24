<template>
    <div class="calendar-container">
        <title-header>
            <span slot="title">Calendar</span>
        </title-header>
        <main class="body">
            <header class="head">
                <div class="date-title-container">
                    <go-arrow-icon class="left-side go-icon"></go-arrow-icon>
                    <go-arrow-icon class="right-side go-icon"></go-arrow-icon>
                    <span class="title-month">March</span>
                    <span class="title-year">2020</span>
                </div>
                <div class="selects-container">

                    <custom-select :options="monthOptions" v-model="monthSelectedOption" :valueBinding="monthSelectedOption" class="month-select selection"></custom-select>
                    <custom-select :options="yearOptions" v-model="yearSelectedOption" :valueBinding="yearSelectedOption" class="year-select selection"></custom-select>

                </div>
            </header>
            <section class="schedule-container">
                <div class="each-day" v-for="({date,month,year,events},index) in eachDay" :key="index">
                    <header class="each-day-title" >
                        <div class="month-date">
                            {{month + " " + date}}
                        </div>
                        <div class="year">
                            {{year}}
                        </div>
                    </header>
                    <div class="each-event" v-for="({startTime,title,duringTime},eventIndex) in events" :key="eventIndex">
                        <div class="event-title">{{ title }}</div>
                        <div class="event-time">{{ startTime.getHours() | plusZero }}{{':'}}{{ startTime.getMinutes() | plusZero }}</div>
                    </div>
                </div>
            </section>
            
            {{ handledTimeTableData.length }}
        </main>
   
    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import cusSelect from '../../../template/custiom_select.vue'
import goArrowIcon from '../../../svg_component/go_v.vue'
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'


export default {

    data(){
        let yearOptions = [];
        for(let i = 2020; i < 2050 ; i++){
            yearOptions.push(i);
        }
        let months = ['January','February','March','April','MAY','June','July','August','September','October','November','December'];
        return{ 
            months,

            monthOptions:months,
            monthSelectedOption:'January',

            yearOptions,
            yearSelectedOption:2020,


            eachDay:[],



        }
    },
    computed:{
        ...mapGetters([
            'handledTimeTableData'
        ])
    },
    components:{
        'title-header':titleHeader,
        'go-arrow-icon':goArrowIcon,
        'custom-select':cusSelect

    },
    filters:{
        //plusZero registered globally
    },
    methods:{
        ...mapActions([
            'getUserTimetable'
        ]),

        showCalendar(year,month){
            this.eachDay = [];
            let date = new Date(year, month);
     
            
            let totaldaysInMonth = 32 - new Date(year, month, 32).getDate();
            

            for(var l = 1; l <= totaldaysInMonth; l++ ){
                date.setDate(l);
           
                
                let dataTemp = [];

                this.handledTimeTableData.forEach(eachData => {
                    let resetTimeForCompare = new Date(eachData.startTime.getTime());
                    
                    resetTimeForCompare.setHours(0,0);

                    if(resetTimeForCompare.getTime() == date.getTime()){
                        
                        dataTemp.push(eachData);
                        
                        
                    }
                });
                
                
                let dayTemp = {
                    year:date.getFullYear(),
                    month:this.months[date.getMonth()],
                    date:date.getDate(),
                    events:dataTemp

                }
            

                this.eachDay.push(dayTemp);
                
            }//render the day   
      
            
        },
        fetchData(startTimeLine,endTimeLine){
            this.getUserTimetable({startTimeLine:startTimeLine,endTimeLine:endTimeLine}).then(() => {
        
                this.showCalendar(2020,4);
            });            
        }


    },
    mounted(){
     


        let first = new Date();
        first.setDate(1);
        let totaldaysInMonth = 32 - (new Date(first.getFullYear(),first.getMonth(), 32)).getDate();
  
        let end = new Date(first.getFullYear(),first.getMonth(),totaldaysInMonth + 1);

        this.fetchData(first,end )
        //bug:there can not print the event of the last day



        
 
        

        
    }
}
</script>

<style scoped>
.calendar-container{
    background: var(--gray-background);
    height: 100vh;
    width:var(--router-component-width);
    overflow-x: hidden;
    overflow-y: auto;

    
}
.body{

    margin: 3rem auto;
    max-width:1370px ;
    background: var(--white);
    width: 100%;
    min-height: 40rem;
    padding: 1rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
}
.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}
.date-title-container{
    display: grid;
    grid-template-columns: 2rem 3rem  5rem 5rem;

    justify-items: center;
    align-items: center;

    font-size: 1.75rem;
}
.go-icon{
    
    width: 0.75rem;
    height: 1.25rem;

    font-size: 1rem;

    cursor: pointer;
}
.go-icon:hover{
    --icon-color:var(--normal-blue)
}
.left-side.go-icon{
    transform: rotate(180deg)
}
.right-side.go-icon{

}
.date-title-container .title-month{

}
.date-title-container .title-year{

}

.selects-container{
    display: flex;
    padding:0 1rem; 
}
.selection{
    --option-font-size:1.25rem;
    --option-padding:0.25rem 1.25rem 0.3rem 1.25rem;


}
.month-select{

    --entire-select-width:12.5rem;
    margin-right: 1.5rem;
} 
.year-select{
    --entire-select-width:10rem;
}
.schedule-container{
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-gap: 1.5rem;


}
.each-day{
    width: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    border-radius: 4px;
   
}
.each-day-title{
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.625rem 0.25rem 0.625rem;
    font-size: 1.5rem;
    color: var(--normal-blue);
}
.each-day-title .month-date{

}
.each-day-title .year{

}
.each-event{
    display: flex;
    justify-content: space-between;
    font-size: 1.15rem;
    font-weight: 300;
    padding:0.35rem 0.25rem;
}
.each-event:nth-child(even){
    background: var(--light-blue);

    color:  var(--dark-blue);
}
.each-event:nth-child(odd){
    background: var(--normal-blue);
    color: var(--white);
}
.event-title{
    white-space: nowrap;
    overflow:hidden;
    width: 55%;
    text-overflow: ellipsis;
}
.event-time{

}
@media screen and (max-width:1370px){
.body{
    margin: 0rem auto;
    border-top: 1px solid var(--gray-border);
    border-radius: 0px;

}
.schedule-container{

    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-gap: 4vw;
}    
}
@media screen and (max-width:1065px){
.schedule-container{

    grid-template-columns: repeat(3,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-gap: 4.5vw;
}    
}
@media screen and (max-width: 768px){

.container{
    
}

.body{
    background: none;
    padding: 0rem;
 
}
.head{
    display: flex;
    justify-content: space-between;
    align-items: center;


    background: var(--white);

}    

.date-title-container{

    grid-template-columns:5rem 5rem;

    font-size: 1.75rem;
    padding: 1rem;
}
.go-icon{
    
    display: none;
}  
.schedule-container{

    grid-template-columns: repeat(2,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-gap: 5vw;
    padding:0 1rem;
} 
}
@media screen and (max-width: 550px){
.selects-container{
    display: flex;
    padding:0 0.25rem; 
}
.selection{
    --option-font-size:1.25rem;
    --option-padding:0.25rem 1.25rem 0.3rem 1.25rem;


}
.month-select{

    --entire-select-width:10rem;
    margin-right: 1.5rem;
} 
.year-select{
    --entire-select-width:6.75rem;
}

.schedule-container{

    grid-template-columns: repeat(1,20.5rem);
    grid-auto-rows: minmax(19rem,auto);
    grid-gap: 2.5rem;
    justify-content: center;
} 
.each-day-title{

    padding: 0.25rem 0.625rem 0.25rem 0.625rem;
    font-size: 1.75rem;

}

.each-event{
    display: flex;
    justify-content: space-between;
    font-size: 1.35rem;
    font-weight: 300;
    padding:0.5rem 0.325rem;
}
}
@media screen and (max-width: 410px){
.date-title-container{

    grid-template-columns:5rem 5rem;

    font-size: 1.75rem;
    padding:1rem 0rem 1rem 0.5rem;

}
.selects-container{
    display: flex;
    padding:0 0.25rem 0 0.25rem; 
}
.selection{
    --option-font-size:1.25rem;
    --option-padding:0.25rem 1.25rem 0.3rem 1.25rem;


}
.month-select{

    --entire-select-width:10rem;
    margin-right: 0.75rem;
} 
.year-select{
    --entire-select-width:6.75rem;
}
}
</style>