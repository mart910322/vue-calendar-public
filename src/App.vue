<template>
    <div id="app">
        <router-view/>  
    </div>
</template>
<script>

export default {
    data(){
        return{
   
        }
    },
    methods:{
  
    },
    components:{

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
    --gray:#F9F9F9;



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
</style>
