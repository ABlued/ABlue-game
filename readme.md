  

# :dog: ABlue맞추기게임 미니게임 

##### 안녕하세요 웹뿌링클치킨이 아니라 웹뿌론트엔드가 되고싶은 삐약삐약 주니어치킨개발자 ABlued입니다!
  
    
react, redux, firebase, aws를 사용한 모바일 게임 ABlue맞추기게임에 대해 소개해드리겠습니다.
  
  
  
  
:clipboard: 프로젝트 개요
---

프로젝트 목적 : react, redux, router, SCSS을 배운 내용 토대로 앱을 설계한 후 NoSql인 firebase와 연동하여 AWS를 통해 배포까지 실습해보기  
  
참여자 : ABlued  
  
사용 스택 : HTML, SCSS, JavaScript, React, redux  
  
사용 DB : Firebase  
  
호스팅 : AWS, Firebase Hosting(도메인 사용이 끝나면 이 방식으로 대체)  
  
작업 환경 : VSCode  
  


  
:wave: 홈페이지 소개
---

##### [프로젝트를 직접 보고 싶다면?(모바일 환경 권장)](https://sparta-react-1f98e.web.app/)
  
##### 홈페이지 화면 구성
  
##### 흐름도
시작화면 -> 문제화면 -> 점수화면 -> 메세지화면 -> 랭킹화면 -> 시작화면 -> (반복)  

##### 시작화면
  
  
![시작화면](https://user-images.githubusercontent.com/53801395/126436665-8e9d5ceb-f20c-4e5b-81b7-4e758f3f47e0.jpg)
  

##### 문제화면  
  

![문제화면](https://user-images.githubusercontent.com/53801395/126436668-cc00c201-4620-496c-b426-5d0c36506f2b.jpg)
  

##### 점수화면  
  
    
![점수화면](https://user-images.githubusercontent.com/53801395/126436674-88255ff0-382a-4803-937b-38d10724aaf5.jpg)
  
  
##### 메세지화면  
  
  
![메세지화면](https://user-images.githubusercontent.com/53801395/126436677-d5a36f46-7bf7-4f0a-95d9-1e8c49711cad.jpg)
  

##### 랭킹화면  
  
  
![랭킹화면](https://user-images.githubusercontent.com/53801395/126436680-95dc67d4-b4cc-4046-91ad-df503085ed44.jpg)
  
  
  

:books: 주로 쓰인 개념들 
---

+ SCSS
    + 변수 및 props 활용, Nesting

+ React
    + redux, redux-thunk, router, reducer

+ Firebase
    + Data CRUD API, Hosting

+ AWS
    + Hosting

:exclamation: 느낀 점
---
  
  
  
##### 느낀 점
  
  

##### 프론트와 백 중에 백부터 구현하는 것이 낫다.
  
프론트부터 구현하면 임시 가짜 데이터를 넣어서 뷰가 어떤 형태로 나오는지 구현해야 되는데
  
그러다 백이 늦게 구현하면 프론트는 다시 코드를 짜야한다.
  
똑같은 일은 2번 하게 되는 것이다.
  
  
  
  
##### 수시로 변경되는 데이터들은 프론트가 아닌 DB에서 처리하는 것이 낫다.
  
프론트에서 처리하면 데이터가 변경될 때마다 build 해야 되고 배포도 다시 하는데
  
DB에서 처리하면 DB에 있는 내용만 수정하면 된다.
  
  
  
  
##### DB에서 받아온 데이터는 웬만하면 redux store에 저장해야 한다.
  
그리고 유저가 선택한 부분만 받아와야한다. 
  
똑같은 데이터라도 여러번 받아오면 안된다.
  
그래야 웹 성능이 조금이라도 올라간다.
  
  
  
  
##### 사용자는 클릭 한 번이라도 귀찮아한다.
  
그래서 UI를 짜고 설계할 때 최대한 사용자를 불편하게 만들면 안 된다.
  
그것이 개발자의 덕목이니까
  
![다운로드](https://user-images.githubusercontent.com/53801395/126437364-636e4f14-ac5a-4d5b-82a3-bdd3dc2dc5aa.png)
