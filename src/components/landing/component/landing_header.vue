<template>
    <header v-class-binding="alignRight" class="container">
        <section class="logo-area">
            <h1 class="logo-text">logo</h1>
        </section>
        <aside class="buttons-area">
            <email-icon class="icon" @iconClicked="test"></email-icon>
            <info-icon class="icon" @iconClicked="test"></info-icon>
            
        </aside>
    </header>
</template>

<script>
import emailIcon from '../../svg_component/emain_circle_fill'
import infoIcon from '../../svg_component/info_cicrle_fill'
export default {
    data(){
        return{
            
        }
    },
    props:['alignRight'],
    directives:{
        'class-binding':{
            /*
            bind(el,binding){
                binding.value ? el.classList.add('alignRightLayout') : el.classList.add('defaultLayout');    
            },
            */
        }
    },
    components:{
        'email-icon':emailIcon,
        'info-icon':infoIcon
    },
    computed:{
        
    },
    methods:{
        test(){
            console.log('asdasd')
        }
    }
}
</script>

<style scoped>
/*
.defaultLayout{
    background: red;
    width: 10rem;
    height: 10rem;
}
.alignRightLayout{
    background: blue;
    width: 10rem;
    height: 10rem;

}
*/

.container{
    width: 100%;
    height: 3.5rem;
    padding: 0 0 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--dark-blue);
}

.logo-text{
    margin: 0;
    padding: 0 0 0.25rem 0;


    color: var(--brown);
    font-weight: 500;
    font-size: 1.75rem;
    
}
.buttons-area{
    display: flex;
    justify-content: space-between;
}

.icon{
    
    width: 3.5rem;
    height: 3.5rem;
    padding:0.9rem ;

    cursor: pointer;
  
    --icon-background-color:transparent;
    --icon-color:var(--light-blue);
    

   
}
.icon:hover{
    
    --icon-background-color:var(--light-blue);
    --icon-color:var(--normal-blue);

}

</style>