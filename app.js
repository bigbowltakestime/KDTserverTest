import http from "http";
import htmlBox from "./htmlBox.js";
import fs from "fs";


const weekDay = ["일", "월", "화", "수", "목", "금", "토"];


const server = http.createServer((req, res)=>{
  if(req.url === "/"){
    res.writeHead(200);
    res.end(htmlBox(`<script src="./style.js"></script>`));
  }else if(req.url === "/style.js"){
    fs.readFile(`./style.js`, function (err, data) {
      res.writeHead(200);
      res.write(data);
      res.end();
    })
  }else if(req.url === "/time"){
    let today = new Date;
    let year = today.getFullYear();
    let month = today.getMonth() + 1;  
    let date = today.getDate();  
    let day = today.getDay();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let todayObject = {todayYear : year, todayMonth : month, todayDate : date, todayHours : hours, todayMinutes : minutes, todaySeconds : seconds, todayDay : weekDay[day]}
    res.writeHead(200);
    res.end(JSON.stringify(todayObject));
  }

})

server.listen(3050, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});