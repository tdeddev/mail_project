const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/send_mail', async (req, res) => {
    
    const formEmail = req.body
    // console.log(formEmail)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: 587,
            secure : false,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.USER_MAIL,
              pass: process.env.PASS_MAIL,
            },
          });

          const msg = {
            from: '"Nuttawut 👻" <Nuttawut@example.com>', // sender address
            to: `${formEmail.to}`, // list of receivers
            subject: `${formEmail.subject}`, // Subject line
            text: `${formEmail.content}`, // plain text body
          }
          // async..await is not allowed in global scope, must use a wrapper
          const info = await transporter.sendMail(msg);
          
          console.log("Message sent: %s", info.messageId);
          res.json(info)
    } catch (error) {
        res.json(error)
    }
})


app.listen(port, () => console.log(`Server run on ${port}`))