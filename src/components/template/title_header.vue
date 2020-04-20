<template>
    <div class="mon">
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
.mon{
    width: 100%;
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
    font-size: 2rem;
}
.button{
    cursor: pointer;
}
</style>