<template>

    <transition-group class="container" v-if="eachPrompt.length >= 1" tag="div" name="propmt-list" @leave="leaveAnimation" @after-leave="cancelAnimation" :css="false">
        <div class="each-prompt" v-for="({success,msg},index) in eachPrompt" :key="index" :class="{'animation': triggerAnimation && index == 0}">
            <component :is="success ? 'tick-icon' : 'cross-icon'" class="icon" :class="success ? 'tick' : 'cross'"></component>
            <span class="msg">{{ msg }} </span>
        </div>
    </transition-group>

</template>

<script>
import {mapState,mapMutations} from 'vuex'
import tickIcon from '../svg_component/tick.vue'
import crossIcon from '../svg_component/cross_normal.vue'
export default {
    components:{
        'tick-icon':tickIcon,
        'cross-icon':crossIcon
    },
    data(){
        return{
            triggerAnimation:false
        }
    },
    computed:{
        ...mapState([
            'doespromptShow',
            'promptMsg',
            'promptShowTick',
            'eachPrompt'

        ]),


    },
    methods:{
        ...mapMutations([
            'showprompt'
        ]),
        leaveAnimation(el,done){
            console.log(el);
           // el.style.opacity = '0.3'
            done();
        
        },
        cancelAnimation(){
     
        }
    },
        
}
</script>

<style scoped>
.container{
    position: fixed;
    bottom: 2.5%;
    right: 2.5%;

    display: flex;
    flex-direction: column-reverse;
}

.each-prompt{
    display: inline-flex;
    min-width: 15rem;
    min-height: 4rem;
    padding: 0 1rem;
    margin-top: 1rem;
    background: var(--normal-blue);


    transition: 0.5s,0s min-width;
}

/*.each-prompt.animation{
    animation: leaveFade 0.5s ;
}*/
@keyframes leaveFade {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

.icon{
    display: flex;
    align-items: center;
    min-height: 4rem;
    width: 2rem;
    margin-right: 1rem
    
}
.icon.tick{
    --icon-color:var(--light-green)
}
.icon.cross{
    --icon-color:var(--normal-red)
}
.msg{
    font-size: 1.5rem;
    min-height: 4rem;
    color: var(--white);
    display: flex;
    align-items: center;


}


@media screen and (max-width:550px){
.container{


}   
}
</style>