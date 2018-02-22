var nodemailer = require("nodemailer")
// var auth = require("./auth.js")
var config = require("../emailConfig.js")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
})

// console.log('User is ', auth.parseJwt(JSON.parse(localStorage.getItem('token'))).username)

var mailOptions = {
  from: config.user,
  // to: auth.parseJwt(JSON.parse(localStorage.getItem('token'))).username,
  to: 'yourtestemail@gmail.com',
  subject: 'ReSeqTB Pipeline - ' + getSubject(),
  html: '<h1>Welcome</h1><p>That was easy!</p>'
}

transporter.sendMail(mailOptions, function(err, info) {
  if (err)
    console.log(err)
  else
    console.log("Email Sent: " + info.response)
})

function getSubject() {
  // if (auth.parseJwt(JSON.parse(localStorage.getItem('token'))).role == 'DATA_MANAGER') {
  //   return "Files Ready for Contribution"
  // } else {
  //   //TODO: logic for returning job status event instead of just complete
  //   return "Your Job Is Complete"
  // }
  return "Subject subject"
}
