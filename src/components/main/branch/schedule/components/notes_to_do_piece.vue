<template>
    <div class="cotainer">
        <header class="title">
            <span class="title-text">Notes / To do list</span>
        </header>
        <section class="notes">
            <div class="note" v-for="(task,index) in taskData" :key="index" @click="finished(task.ref)">
                <span class="task-title">{{task.title}}</span>
                <div class="tick-box"><span class="tick-symbol">&#10003;</span></div>
            </div>
            <div class="have-no-note-text" v-if="taskData.length == 0">no result...</div>
        </section>
        <footer class="btn-container">
            <div class="btn" @click="toggleNewTaskStatus">+add a new note</div>
        </footer>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import db from '../../../../../firebase/firebaseinit.js'
import firebase from 'firebase'
export default {
    computed:{
        ...mapState([
            'taskData',

        ])
    },
    methods:{
        ...mapActions([
            'getUserTask',
            
        ]),
        ...mapMutations([
            'toggleNewTaskStatus' ,
            'loading'
        ]),
        finished(ref){
            this.loading();
            var currentUser = firebase.auth().currentUser;
            db.collection('user-profile').doc(currentUser.uid).collection('user-task').doc(ref).update({
                isItFinished:true
            }).then(() => {
                this.getUserTask().then(() => {
                    this.loading();
                });
                
                
            }).catch(err => {
                console.log(err);
                this.loading();
            })

        },

    },

    mounted(){
        this.getUserTask();
        
    }
}
</script>

<style scoped>

.cotainer{

    width: 100%;
    min-height: 20rem;
    background: var(--white);
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    border-radius: 6px;


    display: grid;
    grid-template-rows: 2.75rem 1fr 3rem;

    color:var(--black);

    
}

header.title{
    padding: 0.25rem 0rem 0rem 0.4rem;
    border-bottom: 1px solid var(--dark-gray);
}
.title-text{
    font-weight: 400;
    font-size: 1.65rem;
}
section.notes{
    display: grid;
    grid-auto-rows: 3rem;
    padding: 0 0.5rem;
  
    align-items: center;

}
div.note{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
 
}
div.note:hover{

}

.task-title{

    font-size: 1.45rem;
    font-weight: 300;
    margin-bottom: 0.25rem;
    position: relative;

}
div.note:hover .task-title{
    color:var(--normal-blue);
}
div.note:hover .task-title::before{
    content: '';
    position: absolute;

    top: 50%;

    left: -5%;

    width: calc(100% + 1rem);
    height: 0.15rem;
    border-radius: 2%;
    background: var(--normal-blue);
}
.tick-box{
    
    height: 1.2rem;
    width: 1.2rem;
    font-size: 1.05rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px solid var(--black);


}
div.note:hover .tick-box{
    border:1.5px solid var(--normal-blue);
}
.tick-symbol{
    display: none;
}
div.note:hover .tick-symbol{
    display: block;
    color: var(--normal-blue);
}
footer.btn-container{

    padding:0.55rem 0.5rem;
}
.btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--light-blue);
    color: var(--dark-blue);
    opacity: 0.8;
    font-size: 1.1rem;
    cursor: pointer;

    box-shadow: 0px 3px 6px  rgba(0,0,0,0.05);
}
.btn:hover{
    opacity: 1;
}
.have-no-note-text{
    font-size: 1.25rem;
    font-weight: 300;
}
@media screen and (max-width: 1065px){
header.title{
    border-bottom: 1px solid var(--light-gray);
    /*
    background: var(--light-blue);
    border-bottom: none;
    */
}    
.cotainer{

    box-shadow:none;
    min-height: 12.5rem;
    grid-template-rows: 2.75rem 1fr 3.25rem;

}
.btn{

    font-size: 1.25rem;

}

}

@media screen and (max-width: 550px){
.cotainer{


    grid-template-rows: 2.75rem 1fr 3.425rem;

}
header.title{


    background: var(--light-blue);
    border-bottom: none;
 
}  
.btn{
    padding: 0.5rem 0;
    font-size: 1.35rem;

}      
}
</style>