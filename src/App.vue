<template>
    <div id="app">
        <router-view/>  

        <custom-alert></custom-alert>
        <loading></loading>
        <booking-board></booking-board>

    </div>
</template>
<script>
import customAlert from './components/template/alert_custom.vue'
import loading from './components/template/loading_animated_component.vue'
import bookingBoard from './components/global_component/new_booking_board.vue'
export default {
    data(){
        return{
   
        }
    },
    methods:{
  
    },
    components:{
      'custom-alert':customAlert,
      'loading':loading,
      'booking-board':bookingBoard,
    },
    computed:{
    
    },
    mounted(){
   
    
    }
}
</script>
<style>



:root{
    --dark-blue:#002130;
    --light-blue:#D2E0E9;

    --normal-blue:#4579A0;
    --brown:#A35D22;
    --gray-background:#F9F9F9;
    --gray-border:#C7C7C7;
    --light-gray:#EBEBEB;
    --dark-gray:#707070;



    --white:#ffffff;
    --black:#000000;

}
*,*::before,*::after{
    box-sizing: border-box;
    font-family: "Segoe UI",'Microsoft JhengHei','Apple LiGothic Medium';
}
body,html{
    
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;


}
@media screen and (min-width: 2750px){
html{
  font-size: calc(20.5px + 0.25vw);
} 
}
@media screen and (min-width: 2250px) and (max-width: 2750px){
html{
  font-size: calc(17.5px + 0.15vw);
} 
}
@media screen and (min-width: 1850px) and (max-width: 2250px)  {
html{
  font-size: 17.5px;
}
}
@media screen and (max-width: 1680px){
html{
  font-size: 16px;
}
}
@media screen and (max-width: 1370px){
html{
  font-size: 14.5px;
}
}
@media screen and (max-width: 1024px){
html{
  font-size: 13.75px;
}
}
@media screen and (max-width: 550px){
html{
  font-size: 12.5px;
}
}
</style>
