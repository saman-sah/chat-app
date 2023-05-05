import { createStore } from "vuex";
import router from '../router/index'
import { 
  auth, 
  db, 
  ref, 
  onValue, 
  set,
  off,
  push,
  update,
  get,
  child,
  onChildAdded,
  onChildChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  storageRef,
  storage,
  uploadBytes,
  getDownloadURL,
} from '../firebase'
let messagesRef
export default createStore({
  state: {
    base_url: "http://localhost:3000/",
    currentUser: {},
    userInfo: {},
    users: {},
    messages: {}
  },
  getters: {
    users:state=> {
      let usersFiltered= {};
      Object.keys(state.users).forEach(key=> {
        if(key!== state.userInfo.userId) {
          usersFiltered[key]= state.users[key]
        }
      })
      return usersFiltered
    }
  },
  mutations: {
    //SetUser 
    SET_USER(state, user) {
      state.currentUser= user;
    },
    //End--------- SetUser 
    
    ADD_USERS(state, user){
      state.users[user.userId]= user.userDetails;
    },

    ADD_MESSAGES(state, message) {
      state.messages[message.messageId]= message.messageDetails;
    },

    CLEAR_MESSAGES(state) {
      state.messages= {}
    },

    //SetUserInfo 
    SET_USER_INFO(state, userInfo) {
      state.userInfo= userInfo;
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
    register({  commit, dispatch }, userData) {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(response=> {
          let userId= auth.currentUser.uid     
          set(ref(db, 'users/'+ userId), {
            name: userData.name,
            email: userData.email,
            online: true
          }).then(()=> {
            dispatch('handleAuthStateChange');
            uploadBytes(storageRef(storage, 'images/'+ userId), userData.user_avatar)
            .then((snapshot) => {
              getDownloadURL(storageRef(storage, 'images/'+ userId))
                .then((url) => {
                  update(ref(db, 'users/' + userId),{
                    image: url
                  });
                })
                .catch((error) => {
                  switch (error.code) {
                    case 'storage/object-not-found':
                      // File doesn't exist
                      break;
                    case 'storage/unauthorized':
                      // User doesn't have permission to access the object
                      break;
                    case 'storage/canceled':
                      // User canceled the upload
                      break;

                    // ...

                    case 'storage/unknown':
                      // Unknown error occurred, inspect the server response
                      break;
                  }
                });
            });
          })
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
        signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(response=> {
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
    handleAuthStateChange({ commit, dispatch, state }) {
      auth.onAuthStateChanged(user=> {
        if(user) {
          let userId= auth.currentUser.uid 
          get(child(ref(db), `users/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              commit("SET_USER_INFO", {
                name: userData.name,
                email: userData.email,
                userId: userId
              }); 
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
          commit("SET_USER", user);
          dispatch('updateUser', {
            userId: userId,
            updates: {
              online: true
            }
          })
          dispatch('getUsers', userId);
          router.push('/user-page')            
        }else {
          if(state.currentUser.uid){
            dispatch('updateUser', {
              
              userId: state.currentUser.uid,
              updates: {
                online: false
              }
            })
          }
          
          commit("CLEAR_USER");
          router.replace('/auth-page')  
        }
      })
    },
    //End--------- Check User Logged In

    updateUser({},userUpdated) {
      update(ref(db, 'users/' + userUpdated.userId), userUpdated.updates);
    },
    getUsers({ commit }, currentUserId){
      onChildAdded(ref(db, 'users'), (snapshot) => {
        const userId = snapshot.key;
        const userDetails = snapshot.val();
        if(userId != currentUserId){
          commit("ADD_USERS", {
            userId,
            userDetails
          });
        }
      });
      onChildChanged(ref(db, 'users'), (snapshot) => {
        const userId = snapshot.key;
        const userDetails = snapshot.val();
        commit("ADD_USERS", {
          userId,
          userDetails
        });
      });
    },
    getMessages({ commit, state }, otherUserId) {
      let userId= state.userInfo.userId;
      messagesRef=ref(db, 'chats/'+ userId + '/' + otherUserId)
      onChildAdded(ref(db, 'chats/'+ userId + '/' + otherUserId), (snapshot) => {
        
        const messageId = snapshot.key;
        const messageDetails = snapshot.val();
        commit("ADD_MESSAGES", {
          messageId,
          messageDetails
        });
      });
    },
    stopGettingMessages({ commit }) {
      if(messagesRef) {
        off(messagesRef);
        commit("CLEAR_MESSAGES")
      }
    },
    actionSendMessage({ commit, state }, messageData) {
      let userId= state.userInfo.userId;
      set(push(ref(db, 'chats/'+ userId + '/' + messageData.otherUserId)), {
        text: messageData.message.text,
        from: messageData.message.from
      });
      messageData.message.from= 'recieved'
      set(push(ref(db, 'chats/'+ messageData.otherUserId + '/' + userId)), {
        text: messageData.message.text,
        from: messageData.message.from
      });
    }
  },
  modules: {
  }
})
