<template>
    <div v-hovering-color="[color,hoveringColor]" @click="emitClickEvent">
        <svg viewBox="0 0 85.92 80"  v-color="color" >
            <path d="M60.8,70a4,4,0,0,0-4,4v8H15V18H56.8v8a4,4,0,0,0,8,0V18a8,8,0,0,0-8-8H15a8,8,0,0,0-8,8V82a8,8,0,0,0,8,8H56.8a8,8,0,0,0,8-8V74A4,4,0,0,0,60.8,70Z" transform="translate(-7 -10)"/>
            <path d="M91.8,47.2,75.3,30.9a3.89,3.89,0,0,0-2.9-.9,4,4,0,0,0-2.7,1.4,4.12,4.12,0,0,0,.2,5.4l9.4,9.3H39.4a4,4,0,0,0,0,8H79.2l-9.2,9a4.2,4.2,0,0,0-1.4,2.7,3.76,3.76,0,0,0,.9,2.9,4.2,4.2,0,0,0,2.7,1.4h.3a4.11,4.11,0,0,0,2.6-.9.75.75,0,0,0,.3-.3L91.7,52.8A4,4,0,0,0,92.9,50,3.25,3.25,0,0,0,91.8,47.2Z" transform="translate(-7 -10)"/>
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