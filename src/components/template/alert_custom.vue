<template>
    <div class="container" v-if="isCalledAlert">
        <div class="wrapper">
            <div class="msg-area">
                <div class="icon" ><svg viewBox="0 0 100 100" fill="currentColor"><path d="M50,7A43,43,0,1,1,7,50,43.06,43.06,0,0,1,50,7m0-7a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"/><path d="M75.3,35.8,42.1,69a3.54,3.54,0,0,1-2.6,1,3.7,3.7,0,0,1-2.6-1L24.7,56.8a3.44,3.44,0,0,1,0-4.8,3.25,3.25,0,0,1,2.4-1,3.1,3.1,0,0,1,2.4,1l10,10,31-31a3.25,3.25,0,0,1,2.4-1,3.1,3.1,0,0,1,2.4,1A3.44,3.44,0,0,1,75.3,35.8Z"/></svg></div>

                <span class="msg">{{ msg }}</span>
            </div>
            <div class="btn-area">
           
                <div class="ok btn" @click="isCalledAlert = false">ok</div>
            </div>
        </div>

    </div>
</template>

<script>
import {bus} from '../../main.js'
export default {
    data(){
        return{

            msg:'Create account successful. please verify your email before the first time login',
            isCalledAlert:false,//handle the page show or not

            showTickOrOther:false,//true = show tick,false = else
            showCancel:false,

        }
    },
    methods:{

    },
    created(){
        bus.$on('customAlert',({msg}) => {

            this.isCalledAlert = true;
            this.msg = msg;
   
        });
    }
}
</script>

<style scoped>
.container{
    position: fixed;
    z-index: 100000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper{
    width: 27.5rem;
    height: 20rem;
    background: white;
    border-radius: 10px;
}
.msg-area{
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 77.5%;
    padding: 0 5% 2.5% 5%;
    background: var(--normal-blue);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.icon{
    width: 5rem;
    color: white;
    margin-bottom: 1rem;
}
.msg{
    color: white;
    font-weight: 400;
    font-size: 1.25rem;
}
.btn-area{
    width: 100%;
    height: 22.5%;

    display: grid;
    grid-template-columns: repeat(1,1fr);
  


}
.btn{
    color:  var(--normal-blue);
    font-weight: 400;
    font-size: 1.65rem;

 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

}
.btn:hover{
    background: rgba(0,0,0,0.3);
    color: white
}


.ok{
 
    border-radius: 0 0 10px 0;
    border-left:0.5px solid rgba(0,0,0,0.3);

}
</style>