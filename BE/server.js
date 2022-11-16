const express = require('express')
const app = express()

var bodyParser = require('body-parser')

const twilio = require('twilio')
const dotenv = require('dotenv')

dotenv.config()

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

var cors = require('cors')

app.use(cors()) 




app.post("/send", async function (req, res) {

  console.log(req.body.userdata)
  let msg = req.body.userdata.message + ' Your OTP is ' + Math.floor(100000 + Math.random() * 900000);
  const client = new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH)
  return client.messages
  .create({body:msg,from: '+15135866760',to: req.body.userdata.phone})
//   .then(message=> console.log(message,"message sent")
//   ,res.send(userdata))
.then ((message)=>{
    console.log(message,"msg sent")
    let mm= req.body.userdata
    mm.message =msg
    console.log(mm)
    res.send(mm)
})
  .catch (err=> console.log(err,"message not sent"))


})

app.listen(3000,()=>{console.log("server started at 3000")})



