<template>
    <transition name="propmt-list" mode="out-in" ><!-- last and first element animation -->
        <transition-group class="container" tag="div" name="propmt-list"  v-if="eachPrompt.length >= 1" mode="out-in">
            <div class="each-prompt" v-for="({success,msg},index) in eachPrompt" :key="index" >
                <component :is="success ? 'tick-icon' : 'cross-icon'" class="icon" :class="success ? 'tick' : 'cross'"></component>
                <span class="msg">{{ msg }} </span>
            </div>
        </transition-group>
    </transition>
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
    

}

@keyframes enterFade {
    0%{
        opacity: 0;
        transform: translateY(0%)
    }    
    100%{
        opacity: 1;
        transform: translateY(150%)
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
    word-wrap: none;
    font-size: 1.5rem;
    min-height: 4rem;
    color: var(--white);
    display: flex;
    align-items: center;
    white-space: nowrap;

}
.propmt-list-enter-active,.propmt-list-leave-active{
    transition: 0.5s;
}
.propmt-list-enter,.propmt-list-leave-to{
    transform: translateY(125%)
}
.propmt-list-enter-to,.propmt-list-leave{
    transform: translateY(0%)
}   
@media screen and (max-width:550px){
.container{


}   
}
</style>