import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/firebaseinit.js'
import {bus} from '../main'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:{
            
        },
        fetchUserData:{

        },
        loading:false,
    },
    getters:{

    },
    mutations: {
        loading(state){
            state.loading = !state.loading;
            
        }//toggle loading state
    },
    actions: {
        login({commit,state},{email,password}){
          
            let loginState = new Promise((resolve,reject) => {
                commit('loading');//turn loading state to true
                firebase.auth().signInWithEmailAndPassword(email,password).then(userData => {
   
                    commit('loading');//turn loading state to false
                    if(userData.user.emailVerified){
                        resolve({state:'success',msg:'success'});
                    }else{
                        firebase.auth().signOut();
                        reject({state:'failed',msg:"your email hasn't verified yet"})
                    }
                    
                    
                }).catch(err => {
                    commit('loading');//turn loading state to false
                    reject({state:err.state,msg:err.message})
              
                });
            });
            return loginState;
        },

        register({commit,state},{email,password,username}){
            
            let registerState = new Promise((resolve,reject) => {
                commit('loading');//turn loading state to true
                firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                
                    firebase.auth().currentUser.sendEmailVerification().then(() => {

                        commit('loading');//turn loading state to false

                        bus.$emit('customAlert',{msg:'Create account successful. please verify your email before the first time login'});
              

                        firebase.auth().signOut();
                        resolve({state:'success',msg:'success'});
                        
                    }).catch(err => {

                        commit('loading');//turn loading state to false
                        firebase.auth().signOut();
                        reject({state:err.state,msg:err.message});

                    });

                    db.collection('user-profile').add({
                        email:email,
                        username:username
                    });//add new user profile document
                    
                }).catch(err => {
                    commit('loading');//turn loading state to false
                    reject({state:err.state,msg:err.message});
                });
            });
            return registerState;
        }
    },
    modules: {
    }
})
