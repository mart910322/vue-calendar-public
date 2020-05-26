<template>
    <div class="task-board-container">
        <title-header>
            <span slot="title">Task board</span>
        </title-header>
        <section class="body">
            <div class="head"></div>
            <div class="tasts-container">
                <div class="task-wrapper">
                    <div class="task-head">
                        <div class="task-title"></div>
                        <div class="task-check-box"></div>

                    </div>
                    <div class="task-body">

                    </div>
                    <div class="task-footer">
                        <div class="delect btn"></div>
                        <div class="edit btn"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
export default {
    components:{
        'title-header':titleHeader
    }
}
</script>

<style scoped>
.task-board-container{
    background: var(--gray-background);
    height: 100vh;
    width:var(--router-component-width);
    overflow-x: hidden;
    overflow-y: auto;   
}
.body{
    margin: 3rem auto;
    max-width:1024px ;
    background: var(--white);
    width: 100%;
    min-height: 40rem;
    padding: 1rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
}
.body .head{

}
</style>