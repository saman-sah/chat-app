import { createStore } from "vuex";
import router from '../router/index'
import { 
  auth, 
  db, 
  ref, 
  onValue, 
  set,
  update,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '../firebase'
export default createStore({
  state: {
    base_url: "http://localhost:3000/",
    currentUser: {},
    userInfo: {},
    users: {}
  },
  getters: {
    users:state=> {
      return state.users
    }
  },
  mutations: {
    //SetUser 
    SET_USER(state, user) {
      state.currentUser= user;
    },
    //End--------- SetUser 
    
    SET_USERS(state, users){
      state.users= users;
      console.log('users');
      console.log(state.users);
    },

    //SetUserInfo 
    SET_USER_INFO(state, userInfo) {
      state.userInfo= userInfo;
      router.push({path:'/user-page'})
    },
    //End--------- SetUserInfo
  
    // ClearUser
    CLEAR_USER(state) {
        state.currentUser= {};
        state.userInfo= {};
    }, 
    //End--------- ClearUser 
  },
  actions: {
    // getData(){
    //   set(ref(db, 'users/'+ 123455), {
    //     name: 'saman',
    //     email: 'saman@gmail.com',
    //     online: true
    //   });
      // onValue(ref(db, 'users'), (snapshot) => {
      //   const data = snapshot.val();
      //   console.log('database users');
      //   console.log(data);
      // });
    // },
    register({  commit }, userData) {
      console.log('regist');
      console.log(userData);
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(response=> {
          let userId= auth.currentUser.uid     
          set(ref(db, 'users/'+ userId), {
            name: userData.name,
            email: userData.email,
            online: true
          });
          commit("SET_USER", response.user);
      })
      .catch(error=> {
          switch (error.code) {
              case 'auth/email-already-in-use':
                alert("Email already in use")
                break;
              case 'auth/invalid-email':
                alert("Invalid Email")
                break;
              case 'auth/operation-not-allowed':
                alert("Operation not allowes")
                break;
              case 'auth/weak-password':
                alert("Week Password")
                break;
            
              default:
                alert("Something went Wrong")
                
            }
            return
      })
      
    },
    login({ commit }, userData) {
      console.log('login');
      console.log(userData);
        signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(response=> {
          console.log('response login');
            commit("SET_USER", response.user);
        })
        .catch(error=> {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert("User not Found")
                    break;
                case 'auth/wrong-password':
                    alert("Wrong Password")
                    break;
                
                default:
                    alert("Something went Wrong")                      
              }
              return
        })
        
    },

    //Logout Firebase Auth
    logOut({ commit }) {
        signOut(auth).then(res=> {
            commit("CLEAR_USER");
        })    
    },
    //End--------- Logout Firebase Auth
    
    // Check User Logged In
    handleAuthStateChange({commit}, state) {
      auth.onAuthStateChanged(user=> {
        if(user) {
          let userId= auth.currentUser.uid  
          onValue(ref(db, 'users/' + userId), (snapshot) => {
            const data = snapshot.val();
            commit("SET_USER_INFO", data);
            this.dispatch('updateUser', {
              userId: userId,
              updates: {
                online: true
              }
            })
          });
         
          this.dispatch('getUsers');
          commit("SET_USER", user);              
        }else {
          if(this.state.currentUser.uid){
            this.dispatch('updateUser', {
              userId: this.state.currentUser.uid,
              updates: {
                online: false
              }
            })
          }
          
          commit("CLEAR_USER");
        }
      })
    },
    //End--------- Check User Logged In

    updateUser(dataUpdated) {
      // console.log('dataUpdated');
      // console.log(dataUpdated);
      update(ref(db, 'users/' + dataUpdated.userId), dataUpdated.updates);
    },
    getUsers({ commit }){
      onValue(ref(db, 'users'), (snapshot) => {
        const data = snapshot.val();
        commit("SET_USERS", data);
      });
    },
  },
  modules: {
  }
})
