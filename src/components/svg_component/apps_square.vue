<template>
    <div  v-hovering-color="[color,hoveringColor]" @click="emitClickEvent">
        <svg viewBox="0 0 747.92 747.9"  v-color="color">
            <path d="M182.86,164.57h256a18.28,18.28,0,0,1,18.28,18.29v256a18.27,18.27,0,0,1-18.28,18.28h-256a18.28,18.28,0,0,1-18.29-18.28v-256a18.29,18.29,0,0,1,18.29-18.29ZM519.2,297.91l181-181a18.29,18.29,0,0,1,25.86,0l181,181a18.29,18.29,0,0,1,0,25.86l0,0-181,181a18.28,18.28,0,0,1-25.86,0l0,0-181-181a18.28,18.28,0,0,1,0-25.86l0,0Zm-336.34,269h256a18.27,18.27,0,0,1,18.28,18.28v256a18.28,18.28,0,0,1-18.28,18.29h-256a18.29,18.29,0,0,1-18.29-18.29v-256A18.28,18.28,0,0,1,182.86,566.86Zm402.28,0h256a18.28,18.28,0,0,1,18.29,18.28v256a18.29,18.29,0,0,1-18.29,18.29h-256a18.28,18.28,0,0,1-18.28-18.29v-256A18.27,18.27,0,0,1,585.14,566.86Zm-384-365.72V420.57H420.57V201.14ZM558,310.86,713.14,466,868.32,310.86,713.14,155.68ZM201.14,603.43V822.86H420.57V603.43Zm402.29,0V822.86H822.86V603.43Z" transform="translate(-164.57 -111.53)"/>
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