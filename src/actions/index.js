import { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import db from "../firebase";

export const setUser=(payload)=>({
        type : SET_USER,
        user : payload,
}
);

export const setloading=(status)=>({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload)=>({
    type : GET_ARTICLES,
    payload: payload,
})
export function signInApi(){
    return (dispatch) =>{
        auth
        .signInWithPopup(provider)
        .then((payload)=>{
            console.log(payload.user)
            // dispatch(setUser(payload.user))
        }).catch((error)=>alert(error.message));
    };
} 

export function getUserAuth(){
    return (dispatch) =>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                dispatch(setUser(user));
            }
        })
    }
}



export function signOutApI(){
    return (dispatch)=>{
        auth
        .signOut()
        .then(()=>{
            dispatch(setUser(null))
        }).catch((error)=>{
            console.log(error.message)
        })
        
    }
}

export function postArticleAPI(payload){
    return(dispatch)=>{
        dispatch(setloading(true));
        if (payload.image !== ""){
            const upload = storage
            .ref(`images/${payload.image.name}`)
            .put(payload.image);
            upload.on('state_changed',(snapshot)=>{
            const progress =(
                (snapshot.bytesTransferred / snapshot.totalBytes)*100);
                console.log(`Progress: ${progress}%`);
                
                if(snapshot.state === 'RUNNING'){
                    console.log(`Progress : ${progress}%`);
                }
        }, error => console.log(error.code),
        async()=>{
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection("article").add({
                actor:{
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image : payload.user.photoURL,
                },
                video: payload.video,
                sharedImage: downloadURL,
                comments:0,
                description: payload.description,
            })
            dispatch(setloading(false));
        });
        }else if(payload.video){
            db.collection('article').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image : payload.user.photoURL,
                },
                video: payload.video,
                sharedImage: '',
                comments:0,
                description: payload.description,
            })
            dispatch(setloading(false));
        }
    };
}

export function getArticlesAPI(){
    return (dispatch)=>{
        let payload;
        db.collection('article').orderBy("actor.date",'desc')
        .onSnapshot((snapshot)=>{
            payload = snapshot.docs.map((doc)=>doc.data());
            dispatch(getArticles(payload));
        });
    };
}