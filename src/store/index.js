import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/firebaseinit.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:{
            
        },
        currentDay:{},

        titleDate:'',
        timeTableData:[],
        searchKeyword:'',
        
        taskData:[],
        taskDataRefs:[],
        loading:false,


        doesAlertShow:false,
        alertMsg:'',

        doesBookingBoardShow:false,


        
    },
    getters:{

        
        secondsFormatCurrentDay({currentDay}){
            var dateTransition = new Date(currentDay.year,currentDay.month,currentDay.day);
            return dateTransition;

        },
        secondsFormatEndDay({currentDay}){
            var dateTransition = new Date(currentDay.year,currentDay.month,currentDay.day+ 2);
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

                var {title,content,startTime,endTime} = eachData ;
                
      
                startTime = new Date(eachData.startTime.seconds * 1000); 
                endTime = new Date(eachData.endTime.seconds * 1000);   

                

              
                var {hourPart,minutesPart} = convertTimeToClockFormat(startTime,endTime);
              

                function convertTimeToClockFormat(beginTime,stopTime){
                    var timeClockFormat =( stopTime.getTime() -  beginTime.getTime())/ 1000 / 60 / 60;
                
                    var hourPart = Math.floor(timeClockFormat);
                    var minutesPart = timeClockFormat % 1 * 60 ;
                 
                    if(minutesPart < 10){
                        minutesPart = '0' + minutesPart.toString();
                    }

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
        currentDayGetter(state,date){
            state.currentDay = date;
           
        },
        enterSearchKeyword(state,keyword){
        
            state.searchKeyword = keyword;
     
        },
        loading(state){
            state.loading = !state.loading;
            
        },//toggle loading state
        showAlert(state,msg){
            state.alertMsg = msg;
            state.doesAlertShow = true;

        },
        unshowAlert(state){
            state.doesAlertShow = false;
        },
        formatDateTitle(state,dateVal){
            var dayNames =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var dateValSplit = dateVal.split('-');
            var getDay = new Date(dateValSplit [0],parseInt(dateValSplit [1]) - 1,parseInt(dateValSplit [2]));

            state.titleDate = dateVal + ' ' + dayNames [getDay.getDay()];
        },
        toggleBookingState(state){
            state.doesBookingBoardShow = !state.doesBookingBoardShow;
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

                        commit('showAlert','Create account successful. please verify your email before the first time login')
            

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
        getUserTimetable({commit,state},{startDate,endDate}){//this jsut fetch data. then the data will sent to handledTimeTableData of getter

            state.timeTableData = [];//clean the variable
            let currentUser = firebase.auth().currentUser;

            let returnTimeTableData = new Promise((resolve,reject) => {

                db.collection('user-profile').doc(currentUser.uid).collection('user-timetable').get().then((snapshot) => {
                //fetch data from firebase   

                    let startTime,endTime;

                    snapshot.forEach(doc => {
           
                        startTime = doc.data().startTime.seconds * 1000;
                        endTime = doc.data().endTime.seconds * 1000;//turn the time to nanosecond
                     
                        if(startTime >= startDate &&  endTime  <= endDate){//filtering the data by time
                            
                            state.timeTableData.push(doc.data());
                        }
                
                    });



                    db.collection('user-profile').doc(currentUser.uid).collection('user-timetable-regular').get().then(snapshot =>{
                        
                        snapshot.forEach(doc => {
                            var data = doc.data();
                            var dateStartPoint = new Date(startDate);

                            data.days.forEach(regularDay => {

                                
                                if(regularDay == dateStartPoint.getDay()){

                                    var formatedStartTime = timeFormater(data.startTime,dateStartPoint.getFullYear(),dateStartPoint.getMonth(),dateStartPoint.getDate());
                                    var formatedEndTime = timeFormater(data.endTime,dateStartPoint.getFullYear(),dateStartPoint.getMonth(),dateStartPoint.getDate());
                                    
                                    var toNotRegularFormat = {
                                        startTime:{seconds:formatedStartTime.getTime() / 1000},
                                        endTime:{seconds:formatedEndTime.getTime() / 1000},
                                        content:data.content,
                                        title:data.title,
                                    }
                                    state.timeTableData.push(toNotRegularFormat);
                                }

                                function timeFormater(timeString,year,month,date){     
                                    var splitTime = timeString.split(':').map(toInt => {
                               
                                        return parseInt(toInt);
                                        
                                    });
                                    var dateTransition = new Date(year,month,date,splitTime[0],splitTime[1]);
                                    
                                    return dateTransition
                                    
                                } 

                            });
                      
                          
                        });



                    }).catch(err => {
                        console.log(err);
                    });


                    /*

                    */
                    resolve(state.timeTableData);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
                
            })
            return returnTimeTableData;//the promise is used for add some function after finish this function


        },
        getUserTask({commit,state}){
            state.taskData = [];//clean the variable
            let currentUser = firebase.auth().currentUser;

            let returnTaskData = new Promise((resolve,reject) => {

                db.collection('user-profile').doc(currentUser.uid).collection('user-task').get().then((snapshot) => {
                    //fetch data from firebase   
                 
                    snapshot.forEach(doc => {    
                        
                    
                        state.taskData.push(doc.data());  
                        state.taskDataRefs.push(doc.ref.id);

                    });
                    resolve(state.taskData);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
                
            })
            return returnTaskData;//the promise is used for add some function after finish this function


        },
    },
    modules: {
    }
})
