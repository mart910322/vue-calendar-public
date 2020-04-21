<template>
    <div v-hovering-color="[color,hoveringColor]" @click="emitClickEvent">
        <svg viewBox="0 0 18 78"  v-color="color" >
            <path d="M54.5,40.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V45.2A4.33,4.33,0,0,0,54.5,40.9Z" transform="translate(-40.8 -10.9)"/>
            <path d="M54.5,10.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V15.2A4.33,4.33,0,0,0,54.5,10.9Z" transform="translate(-40.8 -10.9)"/>
            <path d="M54.5,70.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V75.2A4.33,4.33,0,0,0,54.5,70.9Z" transform="translate(-40.8 -10.9)"/>
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