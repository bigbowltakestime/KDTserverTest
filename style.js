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
  height : "500px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#80EFBD",
  gap : "20px"
})
body.appendChild(root);
let analog = tagCreate("div");
let digital = tagCreate("div");
styleCreate(analog,{
  display : "flex",
  flexDirection : "column",
  justifyContent : "center",
  alignItems : "center",
  width : "400px",
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
  width : "400px",
  height : "100px",
  borderRadius : "10px",
  boxShadow : "0 10px 20px rgba(0,0,0,0.21), 0 10px 10px rgba(0,0,0,0.22)",
  backgroundColor : "#ECEFEB",
  fontSize : "17px",
  fontWeight : "700"

})
root.appendChild(analog);
root.appendChild(digital);
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
  width : "10px",
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


