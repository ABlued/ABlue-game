import { firestore } from '../firebase';

// Actions      (액션명은 대문자)
const IMAGELOAD = 'image/LOAD';
const NAMECREATE = 'username/CREATE';
const PUSHANSWER = 'useranswer/PUSH';
const PUSHSCORE = 'userscore/push'
const PUSHCOMMENT = 'usercomment/push'
const SAVEUSERDATA = 'user/push';
const RESET = 'reset';
const LOADUSERALLDATA = 'useralldata/LOAD'

// firebase collection
const userAllDataDB = firestore.collection("userAllData");
// initialState
const initialState = {
    scoreMsg : [
        "조금이라도 저에게 관심좀 주세요 ㅠㅡㅠ",
        "조금만 더 노력하면 아주 친한 친구 사이가 될 수 있어요!",
        "이 정도면 아주 친한 친구 사이! 앞으로도 더 친하게 지내요! :)",
    ],
    myName: 'ABlue',
    userAllData : [
    ],
    userName : '',
    userAnswer : [],
    userComment : '',
    userScore : 0,
    imgsrc : '',
}

// Action Creators
export const loadImage = (src) => {
    return { type: IMAGELOAD, src };
}
export const userNamed = (userName) => {
    return { type: NAMECREATE, userName}
}
export const userAnswerd = (userAnswer) => {
    return { type: PUSHANSWER, userAnswer}
}
export const userScored = (userScore) => {
    return { type: PUSHSCORE, userScore}
}
export const userCommentd = (userComment) => {
    return { type: PUSHCOMMENT, userComment}
}
export const saveUserData = (userName, userScore, userComment) => {
    return { type: SAVEUSERDATA, userName, userScore, userComment}
}
export const resetUserData = () => {
    return { type: RESET }
}
export const loadUserAllData = () => {
    return { type: LOADUSERALLDATA }
}
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "image/LOAD": {
        return {...state , imgsrc: action.src}
    }
    case "username/CREATE": {
        const newName = action.userName;
        return { ...state, userName: newName };
    }
    case "useranswer/PUSH": {
        return { ...state, userAnswer: [...state.userAnswer, action.userAnswer] };
    }
    case "userscore/push" : {
        return{ ...state, userScore: action.userScore };
    }
    case "usercomment/push" : {
        return{ ...state, userComment: action.userComment };
    }
    case "user/push" : {
        const obj = {
            userName : action.userName,
            userScore : action.userScore,
            userComment : action.userComment,
        };
        let newArray = [];
        for(let i = 0; i < state.userAllData.length; i++){
            newArray.push(state.userAllData[i]);
        }
        newArray.push(obj);
        userAllDataDB.add({userName:action.userName, userScore:action.userScore, userComment:action.userComment})
        return{ ...state, userAllData: newArray };
    }
    case "reset" : {
        return{ ...state, 
                userName : '',
                userAnswer : [],
                userComment : '',
                userScore : 0, 
        };
    }
    case "useralldata/LOAD" : {
        let tempArray = [];
        userAllDataDB.get().then((docs) => {
            docs.forEach((doc) => {
                if(doc.exists){
                    tempArray = [...tempArray, {...doc.data()}];
                }
            })
        }).then(response => {
            tempArray = tempArray.sort((a, b) => b.userScore - a.userScore);
        })
        return {...state, userAllData: tempArray };
    }
    // do reducer stuff
    default: return state;
  }
}