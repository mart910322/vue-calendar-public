<template>
    <transition name="fade-up">
        <div class="container" v-if="doesPropmtShow">
            <component :is="promptShowTick ? 'tick-icon' : 'cross-icon'" class="icon" :class="promptShowTick ? 'tick' : 'cross'"></component>
            <span class="msg">{{ propmtMsg }} </span>
        </div>
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
    computed:{
        ...mapState([
            'doesPropmtShow',
            'propmtMsg',
            'promptShowTick'

        ]),

    },
    methods:{
        ...mapMutations([
            'showPropmt'
        ])
    }
}
</script>

<style scoped>
.container{
    position: fixed;
    bottom: 2.5%;
    right: 2.5%;
    min-width: 15rem;
    height: 4rem;
    background: var(--normal-blue);

    display: grid;
    grid-template-columns: 2rem 1fr;
    grid-column-gap: 1rem;
    align-items: center;

    padding: 0 1rem;

}
.icon{
    display: flex;
    align-items: center;
}
.icon.tick{
    --icon-color:var(--light-green)
}
.icon.cross{
    --icon-color:var(--normal-red)
}
.msg{
    font-size: 1.5rem;
    color: var(--white);
}
.fade-up-enter-active,.fade-up-leave-active{
    transition: 0.5s;
}
.fade-up-enter,.fade-up-leave-to{
    transform: rotateX(90deg);
    bottom: -5%;
    opacity:0.3;
}
.fade-up-enter-to,.fade-up-leave{
    transform:  rotateX(0deg);
    bottom: 2.5%;
    opacity: 1;
}
@media screen and (max-width:550px){
.container{


}   
}
</style>