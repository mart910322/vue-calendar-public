<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg  viewBox="0 0 80.06 60" class="icon">
            <path d="M87.6,30.8,42.7,77.5a6.17,6.17,0,0,1-9,0L11.3,54a6.83,6.83,0,0,1,0-9.4,6.17,6.17,0,0,1,9,0l18,18.8,40.4-42a6.17,6.17,0,0,1,9,0A6.93,6.93,0,0,1,87.6,30.8Z" transform="translate(-9.43 -19.45)"/>
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