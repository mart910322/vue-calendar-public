import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/firebaseinit.js'
import {bus} from '../main.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        mobileMenuShow:false,
        /* schedule borad */
        currentDay:{},

        titleDate:'',
        
        timeTableData:[],     
        searchKeyword:'',
        
        taskData:[],

        fetchingTimetable:false,
        fetchingTask:false,
        /* schedule borad */

        loading:false,

        /* custom Alert  */
        doesAlertShow:false,
        needCancel:false,
        alertMsg:'',
        funcContain:null,
        funcChild:null,

        /* custom Alert  */

        /* custom prompt */
        eachPrompt:[],
        doespromptShow:false,
        promptMsg:'',
        promptShowTick:false,
        /* custom prompt */


        
        doesBookingBoardShow:false,

        doesNewTaskBoardShow:false,
        enableEditTask:false,
        editingTaskTemp:{},
    

        
    },
    getters:{

        
        dateFormatCurrentDay({currentDay}){
            var dateTransition = new Date(currentDay.year,currentDay.month,currentDay.day);
            return dateTransition;

        },

        sortTimeTable({timeTableData}){
            return timeTableData.sort((a,b) => {
                if(a.startTime.seconds < b.startTime.seconds){
                    return -1

                }
                if(a.startTime.seconds > b.startTime.seconds){
                    return 1

                }             
                if(a.startTime.seconds == b.startTime.seconds){
                    return 0

                }                                  
            });
        },


        filteredTimeTableData({timeTableData,searchKeyword},{sortTimeTable}){
            
            var filteredTimeTableData;

            filteredTimeTableData = sortTimeTable.filter(eachData => {

                return eachData.title.includes(searchKeyword);

            });
        
   
            return filteredTimeTableData;
        },
        handledTimeTableData(state,getter){


     

            let handleTimeTableData = getter.filteredTimeTableData.map(eachData => {

                var {title,content,startTime,endTime,ref,isItRegular} = eachData ;
                
      
                startTime = new Date(eachData.startTime.seconds * 1000); 
                endTime = new Date(eachData.endTime.seconds * 1000);   

                

              
                var {hourPart,minutesPart} = convertTimeToClockFormat(startTime,endTime);
              

                function convertTimeToClockFormat(beginTime,stopTime){
                    var timeClockFormat =( stopTime.getTime() -  beginTime.getTime())/ 1000 / 60 / 60;
                
                    var hourPart = Math.floor(timeClockFormat);
                    var minutesPart = timeClockFormat % 1 * 60 ;
                 
                    /*if(minutesPart < 10){
                        minutesPart = '0' + minutesPart.toString();
                    }*/

                    return{
                        hourPart,
                        minutesPart
                    }
                }//convert the date from seconds format to clock format 

                
            
              
                return{
                    title:title,
                    content:content,
                    startTime:startTime,
                    endTime:endTime,
                    ref:ref,
                    isItRegular:isItRegular,
          
                    duringTime:{hour:hourPart,minutes:minutesPart}
                    /*
                    duringTime:{
                        startTime:{hour:,minutes:},
                        endTime:{hour:,minutes:},
                    }*/
                }

            })
            
            return handleTimeTableData;
        }
    },
    mutations: {
        toggleMobileMenuStatus(state){
            state.mobileMenuShow = !state.mobileMenuShow
        },
        emitCurrentDay(state,date){
            state.currentDay = date;
           
        },
        enterSearchKeyword(state,keyword){
        
            state.searchKeyword = keyword;
     
        },
        loading(state){
            state.loading = !state.loading;
            
        },//toggle loading state

        showAlert(state,{msg,needCancel,func,funcChild}){
            state.needCancel = needCancel;
            state.alertMsg = msg;
            state.doesAlertShow = true;
            state.funcContain = func;
            state.funcChild = funcChild;
            

        },//save the data to state and show the alert
        showprompt(state,{success,msg}){
         
            state.eachPrompt.push({success,msg});

            let timer = setTimeout(() => {
                state.eachPrompt.splice(0,1);
            }, 2500); 
        
         

        },
        alertEventHandle(state,{func,funcChild}){
     
            if(func != null && func != undefined){
                func(funcChild);
            }

            state.doesAlertShow = false;
        },//execute the function if user clicked yes


        formatDateTitle(state,dateVal){
            var dayNames =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var dateValSplit = dateVal.split('-');
            var getDay = new Date(dateValSplit [0],parseInt(dateValSplit [1]) - 1,parseInt(dateValSplit [2]));

            state.titleDate = dayNames [getDay.getDay()];
        },
        toggleBookingStatus(state){
            state.doesBookingBoardShow = !state.doesBookingBoardShow;
        },
        toggleNewTaskStatus(state){
            state.enableEditTask = false;
            state.doesNewTaskBoardShow = !state.doesNewTaskBoardShow;
        },
        toggleEditTaskStatus(state,...data){
            state.enableEditTask = true;
            state.doesNewTaskBoardShow = !state.doesNewTaskBoardShow;
       
            bus.$emit('injectData',...data);//export the editing data
        }        
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
                firebase.auth().createUserWithEmailAndPassword(email, password).then(({user}) => {

                    db.collection('user-profile').doc(user.uid).set({
                        email:email,
                        username:username
                    });//add new user profile document

                    user.sendEmailVerification().then(() => {

                        commit('loading');//turn loading state to false

                        commit('showAlert',{msg:'Create account successful. please verify your email before the first time login',needCancel:false})
            

                        firebase.auth().signOut();
                        resolve({state:'success',msg:'success'});
                        
                    }).catch(err => {

                        commit('loading');//turn loading state to false
                        firebase.auth().signOut();
                        reject({state:err.state,msg:err.message});

                    });


                    
                }).catch(err => {
                    commit('loading');//turn loading state to false
                    reject({state:err.state,msg:err.message});
                });
            });
            return registerState;
        },
        getUserTimetable({commit,state},{startTimeLine,endTimeLine}){//this jsut fetch data. then the data will sent to handledTimeTableData of getter

            if(!state.fetchingTimetable && startTimeLine!= undefined && endTimeLine != undefined){
                state.fetchingTimetable = true;

                let currentUser = firebase.auth().currentUser;

                let returnTimeTableData = new Promise((resolve,reject) => {

                    db.collection('user-profile').doc(currentUser.uid).collection('user-timetable').get().then((snapshot) => {
                    //fetch data from firebase   
                        state.timeTableData = [];//clean the variable
                        let startTime,endTime,indexCount = 0;

                        snapshot.forEach(doc => {
            
                            startTime = doc.data().startTime.seconds * 1000;
                            endTime = doc.data().endTime.seconds * 1000;//turn the time to nanosecond
                    
                            if(!(startTime < startTimeLine && endTime < startTimeLine || startTime > endTimeLine && endTime > endTimeLine) ){  //filtering the data by time  
                                state.timeTableData.push(doc.data());
                                state.timeTableData[indexCount].ref = doc.ref.id;
                                indexCount ++;
                            }
                    
                        });



                        db.collection('user-profile').doc(currentUser.uid).collection('user-timetable-regular').get().then(snapshot =>{
                            
                            snapshot.forEach(doc => {
                                let data = doc.data();
                            
                                let dateStartPoint = new Date(startTimeLine);
                                let dateEndPoint = new Date(endTimeLine);

                                let dateDifference = Math.ceil((dateEndPoint - dateStartPoint) / (1000 * 60 * 60 * 24));
                    
                                for(var i = 0; i < dateDifference ; i++ ){
                                    
                                    

                                    data.days.forEach(regularDay => {

                                        
                                        if(regularDay == dateStartPoint.getDay()){ 

                                            var formatedStartTime = timeFormater(data.startTime/* timetable-regular used (hour:minutes) and type = string as time format */,dateStartPoint);
                                            var formatedEndTime = timeFormater(data.endTime,dateStartPoint); /*keep it year,month,date as the same. because reuglar timetable just continue within a day */
                                            
                                            var toNotRegularFormat = {
                                                startTime:{seconds:formatedStartTime.getTime() / 1000},
                                                endTime:{seconds:formatedEndTime.getTime() / 1000},
                                                content:data.content,
                                                title:data.title,
                                                isItRegular:data.isItRegular
                                            }
                                            state.timeTableData.push(toNotRegularFormat);
                                            state.timeTableData[indexCount].ref = doc.ref.id;
                                            indexCount ++;    
                                            
                                            
                                                                    
                                        }


                                        function timeFormater(timeString,dateObj){     
                                            var splitTime = timeString.split(':').map(toInt => {
                                    
                                                return parseInt(toInt);
                                                
                                            });
                                            var dateTransition = new Date(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate(),splitTime[0],splitTime[1]);
                                            
                                            return dateTransition
                                            
                                        } 

                                    });
                                    dateStartPoint.setDate(dateStartPoint.getDate() + 1);
                                }
                        
                            
                            });
        

                            resolve(state.timeTableData);
                            state.fetchingTimetable = false;
                        }).catch(err => {
                            console.log(err);
                            reject(err);
                            state.fetchingTimetable = false;
                            commit('showprompt',{success:true,msg:'connect datebase error'})
                        });


                        /*

                        */
                        
                    }).catch(err => {
                        console.log(err);
                        state.fetchingTimetable = false;
                        reject(err);
                        commit('showprompt',{success:true,msg:'connect datebase error'})
                    });
                    
                })
                return returnTimeTableData;//the promise is used for add some function after finish this function
            }
            


        },
        getUserTask({commit,state}){
            
            if(!state.fetchingTask){
                state.fetchingTask = true;
                let currentUser = firebase.auth().currentUser;
                let indexCount = 0;
    
                let returnTaskData = new Promise((resolve,reject) => {
    
                    db.collection('user-profile').doc(currentUser.uid).collection('user-task').get().then((snapshot) => {
                        //fetch data from firebase   
                        state.taskData = [];//clean the variable
                        snapshot.forEach(doc => {    
                            
                            
                            state.taskData.push(doc.data());  
                            state.taskData[indexCount].ref = doc.ref.id;
                            indexCount++;
                          
    
        
    
                        });
                        resolve(state.taskData);
                        state.fetchingTask = false;
                    }).catch(err => {
                        state.fetchingTask = false;
                        console.log(err);
                        reject(err);
                        commit('showprompt',{success:true,msg:'connect datebase error'})
                    });
                    
                })
                return returnTaskData;//the promise is used for add some function after finish this function
            }



        },
        userTaskHaveFinished({state,commit,dispatch},{isItFinished,ref}){

            commit('loading');
            let currentUser = firebase.auth().currentUser;
            let updated = new Promise((resolve,reject) => {
                db.collection('user-profile').doc(currentUser.uid).collection('user-task').doc(ref).update({
                    isItFinished:!isItFinished
                }).then(() => {
             
                    dispatch('getUserTask').then(() => {
                        commit('loading');
                       
                
                        resolve('updated successful');

                        let msg = !isItFinished ? 'A task have finished' : 'Revert a task successful';
                        commit('showprompt',{success:true,msg})
    
                    });
                    
                }).catch(err => {
                    console.log(err);
                    reject(err);
                    commit('loading');
                    commit('showprompt',{success:false,msg:'error'})
                });  
            })
            return updated

        },
        deleteUserTask({state,commit,dispatch},ref){
            commit('loading');
            let currentUser = firebase.auth().currentUser;
            let deleted = new Promise((resolve,reject) => {
                db.collection('user-profile').doc(currentUser.uid).collection('user-task').doc(ref).delete().then(() => {
                    dispatch('getUserTask').then(() => {
                        commit('loading');
                        resolve('deleted successful');
                        commit('showprompt',{success:true,msg:'deleted a task successful' })
    
                    });
                }).catch(err => {
                    commit('loading');
                    reject(err);
                    commit('showprompt',{success:true,msg:'failed delete a task' })
                    console.log(err);
                })
            })
            return deleted
        },

        cancelSchedule({commit,getters,dispatch},{ref,isItRegular}){
            commit('loading');
            let deleteSchedule = new Promise((resolve,reject) => {
                let currentUser = firebase.auth().currentUser;
                let databaseDestination = isItRegular ? 'user-timetable-regular':'user-timetable';
                
    
                db.collection('user-profile').doc(currentUser.uid).collection(databaseDestination).doc(ref).delete().then(() => {

                    let endDay = new Date(getters.dateFormatCurrentDay.getTime());
                    endDay.setDate(endDay.getDate() + 1);
                                
                    dispatch('getUserTimetable',{startTimeLine:getters.dateFormatCurrentDay,endTimeLine:endDay}).then(() => {
                        commit('loading');
                        commit('showprompt',{success:true,msg:'canceled a appointment successful'})
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                        commit('loading');
                        commit('showprompt',{success:true,msg:'update schedule error'})
                    });

                }).catch(err => {
                    console.log(err);
                    reject(err);
                    commit('loading');
                    commit('showprompt',{success:true,msg:'connect datebase error'})
                })
            })

            return deleteSchedule;
        },

    },
    modules: {
    }
})
