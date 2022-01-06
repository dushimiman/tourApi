import dotenv from "dotenv";
import e from "express";
dotenv.config();
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_LD,
    process.env.TWILIO_AUTH_ID
);
//hy Eric canopy booking tour accepted applicationId:1111111111111

const sendSms = (userName, tourName, applicationStatus, applicationId, userPhone) => {
    client.messages.create({
        body: "Hey" + userName + ", Your " + tourName + "booking tour" + applicationStatus + "application Id" + applicationId, from: "+19543200764",
        to: userPhone,
    })
        .then((message) => console.log(message.sid));
};

export default sendSms;