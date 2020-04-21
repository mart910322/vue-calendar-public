<template>
    <div class="wrapper" @click="emitClickEvent">
        <svg viewBox="0 0 60 60" >
            <g>
                <rect y="25" width="60" height="10"/>
            </g>
            <g>
                <rect x="25" width="10" height="60"/>
            </g>
        </svg>
    </div>
</template>

<script>

export default {
 
    methods:{
       emitClickEvent(){
           this.$emit('iconClicked');
        }
    }
}
</script>

<style>
.wrapper{
    width: 4rem;
    height: 4rem;
    background-color: var(--normal-blue);
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    
}
.wrapper svg{
    fill: white;
    width: 37.5%;
}
</style>