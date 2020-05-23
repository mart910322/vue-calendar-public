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
                <div class="each-day" v-for="(e,iindex) in new Array(5)" :key="iindex">
                    <header class="each-day-title" >
                        <div class="month-date">
                            March 15
                        </div>
                        <div class="year">
                            2020
                        </div>
                    </header>
                    <div class="each-event"  v-for="(event,index) in new Array(4)" :key="index">
                        <div class="event-title">event title</div>
                        <div class="event-time">15:30-18:15</div>
                    </div>
                </div>
            </section>
            
 
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
    methods:{
        ...mapActions([
            'getUserTimetable'
        ]),

    },
    mounted(){
     


        let first = new Date();
        first.setDate(1);
        let totaldaysInMonth = 32 - new Date(first.getFullYear(),first.getMonth(), 32).getDate();
        let end = new Date(first.getFullYear(),first.getMonth(),totaldaysInMonth);

        this.getUserTimetable({startTimeLine:first,endTimeLine:end});


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
    padding-bottom: 1.5rem;
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
    grid-column-gap: 1.5rem;
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
.schedule-container{

    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-column-gap: 3vw;
}    
}
@media screen and (max-width:1065px){
.schedule-container{

    grid-template-columns: repeat(3,1fr);
    grid-auto-rows: minmax(15rem,auto);
    grid-column-gap: 4.5vw;
}    
}
@media screen and (max-width: 768px){
  
}
</style>