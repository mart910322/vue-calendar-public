<template>
    <div v-hovering-color="[color,hoveringColor]" @click="emitClickEvent">
        <svg viewBox="0 0 54 38"  v-color="color" >
            <path d="M26,31a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Zm0,16a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Zm0,16a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Z" transform="translate(-23 -31)"/>
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

</style>