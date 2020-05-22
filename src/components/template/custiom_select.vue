<template>
    <div class="container" :class="{'extended' : extend }" v-click-outside="closeMenu">
        <header class="head" @click="extend = !extend">
            <span class="selected-option">{{  options[localSelectedNumber] }}</span>
            <go-arrow-icon class="arrow-icon" ></go-arrow-icon>
        </header>
        <transition name="fade-down">
            <ul class="options-container" v-if="extend">
                <li v-for="(option,index) in options " :key="index" class="each-option" @click="optionSelected(index)">
                    {{option}}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import goArrowIcon from '../svg_component/go_v.vue'
export default {


    props:{
        options:{

        },
        selectedNumber:{
            type:Number,
            default:0,
        },

        valueBinding:{

        }

    },
    watch:{
        valueBinding(val){
         
            this.getBindingValueIndex(val);
        }
    },
    components:{
        'go-arrow-icon':goArrowIcon
    },
    data(){



        return{
            localSelectedNumber:0,
            extend:false,
      
        }
    },
    directives:{
        'click-outside': {
            bind: function (el, binding) {
                el.clickOutside = function(event){
                    

                    if(!(el == event.target || el.contains(event.target) )){                 
                        binding.value();
                    }

                }
                document.body.addEventListener('click', el.clickOutside )
            },
            unbind: function (el) {

                document.body.removeEventListener('click', el.clickOutside )
            },
        }
    },
    methods:{
        initialize(){
       
            this.localSelectedNumber = this.selectedNumber;
            this.getBindingValueIndex(this.valueBinding);
        //    this.emitValue(this.selectedNumber);

        },
        getBindingValueIndex(val){
            this.localSelectedNumber = this.options.indexOf(val);
        },
        optionSelected(index){

            this.localSelectedNumber = index;
           // this.$emit('updateIndex',index);
            this.emitValue(index);
            this.closeMenu()
        },
        emitValue(index){
            this.$emit('input',this.options[index]);
        },
        closeMenu(){
            this.extend = false;
        },


    },
    mounted(){
        this.initialize();
        
    }
}
</script>

<style scoped>
.container{
   
    width: var(--custom-select-width,12.5rem);
    background: var(--normal-blue);
    position: relative;
    border-radius: 10rem;

    --option-font-size:1.35rem;
    --option-font-color:var(--white);
    --option-padding:0.25rem 1rem;

    

    transition: 0.5s linear;

    transition: 0s border-radius;
    animation: 1s border-radius-animation ;

}
@keyframes  border-radius-animation {
    0%{

        border-radius: 4px 4px 0 0;
    }
    50%{
        border-radius: 4px 4px 0 0;
        
    }
    100%{
       border-radius: 10rem;
    }
}
.head{
    display: flex;
    justify-content: space-between;
    padding:var(--option-padding);
    
    cursor: pointer;


    
}
.selected-option{
    font-size: var(--option-font-size);
    color: var(--white);

    transition: 0.5s;
    
}
.arrow-icon{
    --icon-color:var(--white);
    width: 0.65rem;
    
    transition: 0.5s;
    --icon-transition:0.5s;
}
.container.extended{
    border-radius: 0px;

    background: var(--white);


    

    border-radius: 4px 4px 0 0;
    animation: none;
}
.container.extended .selected-option{
    color: var(--black);
}
.container.extended .arrow-icon{
    --icon-color: var(--black);
    transform: rotate(90deg);
}
.container.extended .head{
    border: 1px solid var(--normal-blue);
    border-bottom: none;
}
.options-container{
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;

    width: var(--custom-select-width,100%);

    border: 1px solid var(--normal-blue);

    border-radius: 0 0 4px 4px;
 
}
.each-option{
    padding:var(--option-padding);
    width: 100%;

    background: var(--white);
    font-size: var(--option-font-size);
    color: var(--black);
    border-bottom: 1px solid var(--light-blue);

    cursor: pointer;
}
.each-option:hover{
    color: var(--normal-blue);
    
}
.fade-down-enter-active,.fade-down-leave-active{
    transition: 0.5s;
    overflow: hidden;
}
.fade-down-enter,.fade-down-leave-to{
    max-height: 0rem;
}
.fade-down-enter-to,.fade-down-leave{
    max-height: 20rem;
}
</style>