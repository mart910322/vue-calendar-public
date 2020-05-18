<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 58.08 58.08" class="icon">
            <path d="M77.58,22.42a5,5,0,0,0-7.07,0L50,42.93,29.49,22.42a5,5,0,1,0-7.07,7.07L42.93,50,22.42,70.51a5,5,0,1,0,7.07,7.07L50,57.07,70.51,77.58a5,5,0,0,0,7.07-7.07L57.07,50,77.58,29.49A5,5,0,0,0,77.58,22.42Z" transform="translate(-20.96 -20.96)"/>
        </svg>
    </div>
</template>

<script>
import colorChanger from './color_changer_directive.js'
import hoveringColor from './hovering_color_change_directive.js'
export default {
    props:['color','hoveringColor'],
    directives:{
        color:colorChanger,
        'hovering-color':hoveringColor
    },
    methods:{
       emitClickEvent(){
           this.$emit('iconClicked');
        }
    }
}
</script>

<style scoped>
.wrapper{
    background: var(--icon-background-color)
}
.icon{
    width: var(--icon-width,100%);
    height: var(--icon-height,100%);    
    fill: var(--icon-color);
}
</style>