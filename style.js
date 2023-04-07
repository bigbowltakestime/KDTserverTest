let body = window.document.body;
function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}
styleCreate(body,{
  display : "flex",
  flexDirection : "column",
  justifyContent : "center",
  alignItems : "center",
  height : "100vh"
})
let root = tagCreate("div",{id : "root"})
styleCreate(root,{
  display : "flex",
  flexDirection : "column",
  justifyContent : "center",
  alignItems : "center",
  width : "500px",
  height : "600px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#80EFBD",
  gap : "20px"
})
body.appendChild(root);

let digit = tagCreate("div");
let analog = tagCreate("div");
let digital = tagCreate("div");
styleCreate(digit,{
  display : "flex",
  justifyContent : "center",
  alignItems : "center",
  width : "450px",
  height : "100px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#ECEFEB",
  position : "relative",
  gap : "5px"
})
styleCreate(analog,{
  display : "flex",
  flexDirection : "column",
  justifyContent : "center",
  alignItems : "center",
  width : "450px",
  height : "300px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#ECEFEB",
  position : "relative"
})
styleCreate(digital,{
  display : "flex",
  flexDirection : "row",
  justifyContent : "center",
  alignItems : "center",
  width : "450px",
  height : "100px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#ECEFEB",
  fontSize : "17px",
  fontWeight : "700"

})
root.appendChild(digit);
root.appendChild(analog);
root.appendChild(digital);


function makeDigitNum(){
  let mother = tagCreate("div");
  styleCreate(mother, {
    width :"45px",
    height : "75px",
    margin : "0px",
    padding : "0px",
    display : "flex",
    justifyContent : "center",
    alighItems : "center",
    flexWrap : "wrap"
  })
  for(let i = 0 ; i < 15; i++){
    let children = tagCreate("div");
    styleCreate(children, {
      width :"15px",
      height : "15px",
      margin : "0px",
      padding : "0px",
      border : "1px solid lightgray",
      boxSizing : "border-box"
    })
    mother.appendChild(children);
  }
  return mother;
}

function paint(arr, target){
  for(let i = 0; i < target.children.length; i++){
    target.children[i].style.backgroundColor = "transparent";
  }
  for(let i = 0; i < arr.length; i++){
    target.children[arr[i]].style.backgroundColor = "black";
  }
}
let numArr = [[0,1,2,3,5,6,8,9,11,12,13,14],[1,4,7,10,13],[0,1,2,5,6,7,8,9,12,13,14],[0,1,2,5,6,7,8,11,12,13,14],[0,2,3,5,6,7,8,11,14],[0,1,2,3,6,7,8,11,12,13,14],[0,1,2,3,6,7,8,9,11,12,13,14],[0,1,2,5,8,11,14],[0,1,2,3,5,6,7,8,9,11,12,13,14],[0,1,2,3,5,6,7,8,11,12,13,14],[4,10]]
function digitGenerate(num, target){
  paint(numArr[num], target)
}

let hoursFirst = makeDigitNum()
let hoursSecond = makeDigitNum()
let minutesFirst = makeDigitNum()
let minutesSecond = makeDigitNum()
let secondsFirst = makeDigitNum()
let secondsSecond = makeDigitNum()
let borderFirst = makeDigitNum()
let borderSecond = makeDigitNum()

digit.appendChild(hoursFirst)
digit.appendChild(hoursSecond)
digit.appendChild(borderFirst)
digit.appendChild(minutesFirst)
digit.appendChild(minutesSecond)
digit.appendChild(borderSecond)
digit.appendChild(secondsFirst)
digit.appendChild(secondsSecond)
digitGenerate(10,borderFirst)
digitGenerate(10,borderSecond)


setInterval(()=>{
  fetch("http://localhost:3050/time")
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      digital.innerText = `현재 시각은 ${result.todayYear}-${result.todayMonth}-${result.todayDate} ${result.todayHours}시 ${result.todayMinutes}분 ${result.todaySeconds}초 ${result.todayDay}요일입니다`;
      let analogHours = result.todayHours%12
      rotate(hoursBar, (360 * (analogHours / 12)))
      rotate(minutesBar, (360 * (result.todayMinutes / 60)))
      rotate(secondsBar, (360 * (result.todaySeconds / 60)))
      
      let hoursFirstNow = parseInt(result.todayHours/10)
      let hoursSecondNow = result.todayHours%10
      let minutesFirstNow = parseInt(result.todayMinutes/10)
      let minutesSecondNow = result.todayMinutes%10
      let secondsFirstNow = parseInt(result.todaySeconds/10)
      let secondsSecondNow = result.todaySeconds%10
      digitGenerate(hoursFirstNow,hoursFirst);
      digitGenerate(hoursSecondNow,hoursSecond);
      digitGenerate(minutesFirstNow,minutesFirst);
      digitGenerate(minutesSecondNow,minutesSecond);
      digitGenerate(secondsFirstNow,secondsFirst);
      digitGenerate(secondsSecondNow,secondsSecond);
    })
},1000)

function rotate(target, amount){
  target.style.transform = `rotate(${amount}deg)`
}


let dot = tagCreate("div");
styleCreate(dot,{
  width : "20px",
  height : "20px",
  borderRadius : "50%",
  boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  backgroundColor : "black",
  zIndex : "1"
})
let hoursBar = tagCreate("div");
styleCreate(hoursBar,{
  width : "15px",
  height : "100px",
  borderRadius : "5px",
  boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  backgroundColor : "black",
  position : "absolute",
  top : "50px",
  transformOrigin: "bottom",
  transform : "rotate(360deg)"
})
let minutesBar = tagCreate("div");
styleCreate(minutesBar,{
  width : "8px",
  height : "130px",
  borderRadius : "5px",
  boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  backgroundColor : "black",
  position : "absolute",
  top : "20px",
  transformOrigin: "bottom",
  transform : "rotate(90deg)"
})
let secondsBar = tagCreate("div");
styleCreate(secondsBar,{
  width : "4px",
  height : "140px",
  borderRadius : "5px",
  boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  backgroundColor : "red",
  position : "absolute",
  top : "10px",
  transformOrigin: "bottom"
})
analog.appendChild(dot);
analog.appendChild(hoursBar);
analog.appendChild(minutesBar);
analog.appendChild(secondsBar);


