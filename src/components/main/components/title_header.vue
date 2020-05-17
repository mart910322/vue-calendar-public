<template>
    <div class="container">
        <div class="wrapper">
            <div  class="separate">
                <component :is="mobileMenuShow ? 'cross-icon': 'menu-icon' " class="mobile-menu-btn" @iconClicked="toggleMobileMenuState"></component>
                <span class="title"><slot name="title"></slot></span>
            </div>
            <span class="button"><slot name="button"></slot></span>
        </div>
    </div>
</template>

<script>
import menuIcon from '../../svg_component/menu_three_line.vue'
import crossIcon from '../../svg_component/cross_normal.vue'
import {mapMutations,mapState} from 'vuex'
export default {
    components:{
        'menu-icon':menuIcon,
        'cross-icon':crossIcon
    },
    methods:{
        ...mapMutations([
            'toggleMobileMenuState'
        ])
    },
    computed:{
        ...mapState([
            'mobileMenuShow'
        ]),
    }
}
</script>

<style scoped>
.container{
    width: calc(100vw - 5.75rem);
    padding: 0.85rem 0.25rem;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    background: var(--white);
}
.container > .wrapper{
    width: 100%;
    padding: 0.25rem 0.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    
}
.separate{
    display: flex;
}
.title{
    color:var(--normal-blue);
    font-weight: 400;
    font-size: 2.5rem;
}
.button{
    cursor: pointer;
    
}
@media screen and (max-width: 768px){
.container{
    width: 100vw;

} 
.separate{
    justify-content: space-between;
    align-items: center;
    width: 50%;
}
.title{
    transform: translateX(50%)
}
.mobile-menu-btn{
    --icon-color: var(--normal-blue);
    width: 2rem;
    cursor: pointer;

}
.button{
    min-width: 2rem;
    
}
}
</style>