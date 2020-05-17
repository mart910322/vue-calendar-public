<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 50.33 50.9" class="icon">
            <path d="M54.42,20.87l-4.19,3.75A19.79,19.79,0,1,1,41.65,15l4.18-3.74a25.13,25.13,0,1,0,8.59,9.58Z" transform="translate(-6.83 -6.55)"/>
            <path d="M48.78,6.55,37,18.65l12.77.65Z" transform="translate(-6.83 -6.55)"/>
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
    
    fill: var(--icon-color);
}
</style>