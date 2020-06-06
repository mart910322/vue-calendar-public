<template>
    <div class="timetable-container">
        <title-header>
            <span slot="title">Timetable</span>
        </title-header>
        <section class="body">
            <header class="caption">
                <span class="caption">{{monthsName[$route.params.month - 1] + ' ' + $route.params.day + ' ' + $route.params.year  }}</span>
                <div class="book-appointment btn" @click="toggleBookingStatus">+ book appointment </div>
            </header>
            <main class="content">

                <div class="each-task" v-for="({time,title,content,category,ref,isItRegular},index) in splitData" :key="index" :class="{'end':!category}">
                    <div class="task-time-area">
                        <span class="task-time">
                            {{time.getHours() | plusZero }}:{{time.getMinutes() | plusZero }} 
                        </span>
                        <span class="task-time-category">
                            {{category ? 'start' : 'end'}}
                        </span>
                    </div>
                    <div class="time-line-area">
                        <div class="time-point"></div>
                        <div class="time-line"></div>
                    </div>
                    <div class="task-content-area">
                        <div class="task-content-wrapper">
                            <div class="task-title">{{title}}</div>
                            <div class="task-content">{{content}}</div>
                        </div>
    
                    </div>
                </div>

            </main>
        </section>
        {{ splitData.length }}
    </div>
</template>

<script>
import titleHeader from '../../../components/title_header.vue'
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {bus} from '../../../../../main.js'
export default {
    components:{
        'title-header':titleHeader,
    },
    data(){
        return{
            showingDate:null,
            monthsName:["January","February","March","April","May","June","July","August","September","October","November","December"],
        }
    },
    mounted(){
        this.initialize();


        bus.$on('addedAppointment',this.initialize);

    },
    beforeDestroy(){
        bus.$off('addedAppointment',this.initialize);        
    },
    computed:{
        ...mapGetters([
            'handledTimeTableData'
        ]),
        splitData(){
            let splitedData = [];
            this.handledTimeTableData.forEach(data => {
                
                let startTask = {

                    time:new Date(data.startTime),
                    title:data.title,
                    content:data.content,  
                    category:true,//true == 'start' false == 'end'
                    ref:data.ref,        
                    isItRegular:data.isItRegular,          
                }

                let endTask = {

                    time:new Date(data.endTime),
                    title:data.title,
                    content:data.content,  
                    category:false,//true == 'start' false == 'end'
                    ref:data.ref,        
                    isItRegular:data.isItRegular,          
                }
                splitedData.push(startTask);
                splitedData.push(endTask);
            });
            splitedData.sort((a,b) => {
             
                if(a.time > b.time){
                    return 1
                }
                if(a.time < b.time){
                    return -1
                }
                if(a.time == b.time){
                    return 0
                }
            });

            return splitedData
        }//split a data to two data of start and end
    },
    methods:{
        ...mapActions([
            'getUserTimetable'
        ]),
        ...mapMutations([
            'showPrompt',
            'toggleBookingStatus'
        ]),
        initialize(){
            this.showingDate = new Date(this.$route.params.year + '-' + this.$route.params.month + '-' + this.$route.params.day);
            let start= this.showingDate;
            let end = new Date(start.getFullYear(),start.getMonth(),start.getDate() + 1);

            this.getUserTimetable({startTimeLine:start,endTimeLine:end});
        }
    }
    
}
</script>

<style scoped>
.timetable-container{
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    
    width:var(--router-component-width);

    background: var(--gray-background);    
}
.body{
    margin: 3rem auto;
    max-width:1024px ;
    background: var(--white);
    width: 100%;
    min-height: 40rem;
    padding:0 0rem 20vh 0rem ;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
    position: relative; 
}
header.caption{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray-border);

    padding: 0.5rem 0.75rem;


}
span.caption{
    font-size: 1.75rem
}
.btn{

    background: var(--light-blue);
    color: var(--dark-blue);

    display: flex;
    align-items: center;
    justify-content: center;
    
    font-size: 1rem;
 
    height: 1.75rem;
    border-radius: 2px;

    cursor: pointer;
}
.book-appointment{
    width: 15rem;
  
}
main.content{
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
    margin-top: 1rem;
}
.each-task{
    display: grid;
    grid-template-columns: 7.5rem 3.5rem 1fr;
    grid-auto-rows: minmax(8rem,auto);

    justify-items: center;



}

.task-time-area{
    font-size: 1.5rem;
    color: var(--normal-blue);



    display: flex;

    width: 100%;


}
.task-time{
    margin-right: 0.5rem;
}
.task-time-category{

}
.end .task-time-area{
    color: var(--gray-border);
}

.time-line-area{
 


    position: relative;

    display: flex;
    justify-content: center;
    

    height: 100%;
}
.time-point{
    width: 2rem;
    height: 2rem;
    border: 4px solid var(--normal-blue);
    background: var(--white);
    border-radius: 50%;
    z-index: 1;
}
.end .time-point{
    border: 4px solid var(--gray-border);
    background: var(--gray-border);
}
.time-line{
    position: absolute;
    top: 0;
    left: 50%;

    width: 4px;
    height: 100%;
    background: var(--gray-border);

    transform: translateX(-50%);

    z-index: 0;
}
.task-content-area{


    width: 100%;

}

.task-content-wrapper{
 
    margin-right: 4%;
    cursor: pointer;
    padding:0rem 1% 0.5rem 0.5rem;

}
@media screen and (min-width: 768px){

.task-content-wrapper:hover{
    background: var(--light-gray);
}    

}

.task-title{
    
    color: var(--normal-blue);
    font-size: 1.5rem;
}
.end .task-title{
    color: var(--gray-border);
}
.task-content{
    font-size: 1.175rem;
    font-weight: 400;
    margin-left: 0.25rem;
    margin-top: 0.5rem;

    line-height: 27.5px;

 
}
.end .task-content{
    display: none
}
@media screen and (max-width: 1024px){
.body{
    border-top: 1px solid var(--gray-border);
    margin: 0rem auto;
    border-radius: 0px;
    
 
}    

}

@media screen and (max-width: 768px){
.timetable-container{

    background: var(--white);    
}    
.body{


    padding:0 0 20vh 0;
    box-shadow:none;

    

}  

main.content{

}
.each-task{
    display: grid;
    grid-template-columns: 4.25rem 3rem 1fr;
    grid-auto-rows: minmax(8rem,auto);

    justify-items: center;



}

.task-time-area{



    flex-direction: column;

    align-items: flex-end;



}
.task-time{
    margin-right: 0rem;
    margin-bottom: 0.25rem;



}
.task-time-category{
   
}
.task-content-wrapper{
    margin-top: 1.25rem;
    margin-right: 2%;
    cursor: pointer;
    padding:0.5rem 1% 0.5rem 0.5rem;

}  
.task-content{
    font-size: 1.175rem;
    font-weight: 400;
    margin-left: 0rem;
    
    

    line-height: 27.5px;
} 
}
@media screen and (max-width: 550px){

header.caption{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray-border);

    padding: 0.5rem 0.45rem;
}
.book-appointment{
    width: 13.5rem;
    font-size: 1.075rem;
    height: 2rem;;
  
}
}
@media not all and (hover:hover) {
.timetable-container{


    max-height: var(--mobile-height,100vh);
  
}
}
</style>