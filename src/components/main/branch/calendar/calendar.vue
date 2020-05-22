<template>
    <div class="calendar-container">
        <title-header>
            <span slot="title">Calendar</span>
        </title-header>
        <main class="body">
            <header class="head">
                <div class="">

                </div>
                <div class="selects-container">
                    <custom-select :options="options" :selectedOption.sync="selectedOption" :selectedNumber="selectedNumber"></custom-select>
                    {{selectedOption}}
                    <button @click="selectedOption += 10">++</button>
                </div>
            </header>
            
 
        </main>
   
    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import cusSelect from '../../../template/custiom_select.vue'
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'


export default {
    watch:{
        selectedOption(val){
            
            this.selectedNumber = this.options.indexOf(val);
            console.log(this.selectedNumber ,val);
        }
    },
    data(){
        return{
            options:[10,20,30,40,50],
            selectedOption:10,
            selectedNumber:0
        }
    },
    computed:{
        ...mapGetters([
            'handledTimeTableData'
        ])
    },
    components:{
        'title-header':titleHeader,
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

}
.body{

    margin: 3rem auto;
    max-width:1370px ;
    background: var(--white);
    height: 50vh;
    padding: 1rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

}
</style>