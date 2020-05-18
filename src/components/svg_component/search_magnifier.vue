<template>
    <div class="wrapper">
        <svg viewBox="0 0 15.65 15.65" class="icon">
            <path d="M11,17.83A6.79,6.79,0,1,0,4.25,11,6.79,6.79,0,0,0,11,17.83Zm0-1.5A5.29,5.29,0,1,1,16.33,11,5.29,5.29,0,0,1,11,16.33Z" transform="translate(-4.25 -4.25)"/>
            <path d="M14.89,16.18l3.75,3.52a.75.75,0,1,0,1-1.09l-3.75-3.53a.75.75,0,0,0-1.06,0A.75.75,0,0,0,14.89,16.18Z" transform="translate(-4.25 -4.25)"/>
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

