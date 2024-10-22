const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async options => {
    console.log("sending email");
    // 1) create a transporter
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: '"MentorSync" <noreply@mentorSync.in>',
        to: options.email,
        subject: options.subject,
        text: options.message,

    };

    // 3) Actually send the email
    const info = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return;
        }
        
        console.log(`Email sent successfully: ${info.response}`);
    });

    // try {
    //     // Send the email and handle the response
    //     const info = await transporter.sendMail(mailOptions); 
    //     console.log(`Email sent successfully to${info.response}`);
    // } catch (error) {
    //     console.error(`Failed to send email to ${error.message}`);
    //     return; 
    // }

};


module.exports =  sendEmail;
