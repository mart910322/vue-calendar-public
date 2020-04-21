<template>
    <div v-hovering-color="[color,hoveringColor]" @click="emitClickEvent">
        <svg viewBox="0 0 16 13"  v-color="color" >
            <path d="M9,7a1,1,0,0,1,1,1v3a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V8A1,1,0,0,1,6,7H9M9,6H6A2,2,0,0,0,4,8v3a2,2,0,0,0,2,2H9a2,2,0,0,0,2-2V8A2,2,0,0,0,9,6Zm11,.5a.5.5,0,0,0-.5-.5h-6a.5.5,0,0,0,0,1h6a.5.5,0,0,0,.5-.5Zm0,3a.5.5,0,0,0-.5-.5h-6a.5.5,0,0,0,0,1h6a.5.5,0,0,0,.5-.5Zm0,3a.5.5,0,0,0-.5-.5h-6a.5.5,0,0,0,0,1h6a.5.5,0,0,0,.5-.5Zm0,3a.5.5,0,0,0-.5-.5H4.5a.5.5,0,0,0,0,1h15a.5.5,0,0,0,.5-.5Zm0,3a.5.5,0,0,0-.5-.5H4.5a.5.5,0,0,0,0,1h15a.5.5,0,0,0,.5-.5Z" transform="translate(-4 -6)"/>
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

<style>

</style>