<template>
    <div id="app">
        <router-view/>  
    

    </div>
</template>
<script>

export default {
    data(){
        return{
            show:true,
            content:[],
        }
    },
    methods:{
  
    },
    components:{

    },
    computed:{
    
    },
    mounted(){
        this.content = new Array(20);
    
    }
}
</script>
<style>


:root{
    --dark-bule:#002130;
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

</style>
