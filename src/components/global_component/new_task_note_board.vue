<template>
    <div class="back-board" v-if="doesNewTaskBoardShow">
        <div class="container">

            <header class="head">
                <div class="title">New notes / to do list</div>
                <cross-icon class="cross icon" @iconClicked="endingAction(false)"></cross-icon>
            </header>

            <section class="typing-title-area">
                <input type="text" class="new-task-notes-title" placeholder="type the title..." v-model="title">
            </section>

            <section class="body">               
                <div class="datails-container row">
                    <details-icon class="details icon"></details-icon>
                    <textarea class="datalis-input-area" placeholder="type your appointment datails..." v-model="details"></textarea>
                </div>
                <div class="error-text-wrapper row" v-if="errorText != ''">
            
                    <div class="error-text">{{ errorText }}</div>
                </div>
            </section>

     
            <footer class="floor">
                <div class="btn-container">
                    <div class="save btn" @click="formatChecker">save</div>
                    <div class="cancel btn" @click="endingAction(false)">cancel</div>
                    
                </div>
            </footer>
     
        </div>

    </div>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'
export default {
    components:{
        'cross-icon':crossIcon,
        'details-icon':detailsIcon
    },
    computed:{
        ...mapState([
            'doesNewTaskBoardShow'
        ]),
    },
    filters:{

    },   
    data(){
        return{

            title:'',
            details:'',
            errorText:'',

        }
    },
    methods:{
        ...mapMutations([
           'toggleNewTaskState',
           'loading' 
        ]),
        ...mapActions([
            'getUserTask'
        ]),
        initializeData(){
            this.title = '',
            this.details = ''
        },

        formatChecker(){

            if(this.title.length > 25){
                this.errorText = 'title only can be 25 character'
                return
            }



            this.submitNewNotes();
            
        },
        submitNewNotes(){
            this.loading();

            var currentUser = firebase.auth().currentUser;
            db.collection('user-profile').doc(currentUser.uid).collection('user-task').add({
                isItFinished:false,
                title:this.title,
                content:this.details,
                
            }).then(() => {
                this.endingAction(true);
            }).catch(err => {
                console.log(err);
                this.errorText = err;
            });

        },
        endingAction(DidItNeedLoading){
            this.errorText = '';
            this.initializeData();
            this.getUserTask();
            this.toggleNewTaskState();
            if(DidItNeedLoading){
                this.loading();
            }
        }


    },
    created(){
      
        this.initializeData();
    
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
    width: 30rem;
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
.new-task-notes-title{
    width: 100%;
    border: none;
    border-bottom: 1.5px solid var(--gray-border);
    outline: none;
    font-size: 1.675rem;
    font-weight: 300;
    margin-top: 0.75rem;
    padding: 0.15rem 0;
}
.new-task-notes-title:focus{
   border-bottom: 1.5px solid var(--normal-blue);
}
.icon{
    width: 1.85rem;
    --icon-color:var(--dark-gray);
    margin-right: 1rem;
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

.btn:hover{
    background: var(--dark-gray);
    color: var(--white);
    border:0;
}

.body{
    display: grid;
    grid-template-columns: 1fr;
  
}

.row{
    padding: 0.5rem 0.75rem;
    display: flex; 
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
.btn.cancel:hover{
    color: var(--white);
    border:1px solid var(--dark-gray);
}
.btn.save{
    background: var(--normal-blue);
    color:var(--white);
    margin-right: 1rem;
  
}
.btn.save:hover{
    background: var(--dark-gray);
}
</style>