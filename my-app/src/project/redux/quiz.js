/**  README
 *   
 * quiz.js와 Quiz.js가 한 폴더안에 존재할 수 없어서 서로 다른 폴더에 있습니다.
 * 
 * 폴더구조
 * src
 * ㄴ index.js
 * ㄴ App.css
 * ㄴ index.css
 * ㄴ project
 *      ㄴ redux
 *          ㄴ configStore.js
 *          ㄴ quiz.js
 *      ㄴ App.js
 *      ㄴ img.jpg
 *      ㄴ Message.js
 *      ㄴ Quiz.js
 *      ㄴ Score.js
 *      ㄴ start.js
 *      ㄴ SwipeItem.js
 * 
 * 
 */
// list.js

// Actions      (액션명은 대문자)
const LISTLOAD   = 'list/LOAD';
const NAMECREATE = 'username/CREATE';
const PUSHANSWER = 'useranswer/PUSH';
const PUSHSCORE = 'userscore/push'
const PUSHCOMMENT = 'usercomment/push'
const SAVEUSERDATA = 'user/push';
const RESET = 'reset';

// initialState
const initialState = {
    list: [
        { question: "민트초코를 좋아한다.", answer: "O" },
        { question: "강아지와 고양이 중 고양이를 더 좋아한다.", answer: "X" },
        { question: "이번 정보처리기사 실기시험에 합격했다.", answer: "O" },
        { question: "프론트엔드가 꿈이다.", answer: "O" },
        { question: "친구가 탕수육소스를 부어버리면 화를 낸다.", answer: "X" },
    ],
    scoreMsg : [
        "조금이라도 저에게 관심좀 주세요 ㅠㅡㅠ",
        "조금만 더 노력하면 아주 친한 친구 사이가 될 수 있어요!",
        "이 정도면 아주 친한 친구 사이! 앞으로도 더 친하게 지내요! :)",
    ],
    myName: '나재완',
    userAllData : [],
    userName : '',
    userAnswer : [],
    userComment : '',
    userScore : 0,
}

// Action Creators
export const loadList = (list) => {
    return { type: LISTLOAD, list };
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "list/LOAD": {
        return state;
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
    // do reducer stuff
    default: return state;
  }
}

