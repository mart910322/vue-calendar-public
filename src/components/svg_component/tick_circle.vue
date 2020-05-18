<template>
    <div @click="emitClickEvent" class="wrapper">

        <svg viewBox="0 0 100 100" class="icon">
            <path d="M50,7A43,43,0,1,1,7,50,43.06,43.06,0,0,1,50,7m0-7a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"/>
            <path d="M75.3,35.8,42.1,69a3.54,3.54,0,0,1-2.6,1,3.7,3.7,0,0,1-2.6-1L24.7,56.8a3.44,3.44,0,0,1,0-4.8,3.25,3.25,0,0,1,2.4-1,3.1,3.1,0,0,1,2.4,1l10,10,31-31a3.25,3.25,0,0,1,2.4-1,3.1,3.1,0,0,1,2.4,1A3.44,3.44,0,0,1,75.3,35.8Z"/>
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