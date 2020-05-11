<template>
    <div class="container">
        <div class="wrapper">
            <span class="title"><slot name="title"></slot></span>
            <span class="button"><slot name="button"></slot></span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    width: calc(100vw - 5.75rem);
    padding: 0.85rem 0.25rem;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    background: var(--white);
}
.wrapper{
    width: 100%;
    padding: 0.25rem 0.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    
}
.title{
    color:var(--normal-blue);
    font-weight: 400;
    font-size: 2.5rem;
}
.button{
    cursor: pointer;
}
</style>