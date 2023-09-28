import nodemailer from "nodemailer";
import DoctorSchema from "../models/DoctorSchema.js";

export const sendEmail = async (req, res) => {
  const { day, time } = req.body.bookedTime;
  try {
    const email = await DoctorSchema.find({ _id: req.body.doctorId }).select(
      "email"
    );

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL_ADDRESS,
        pass: process.env.SENDER_MAIL_PASSWORD,
      },
    });

    let detail = {
      from: process.env.SENDER_MAIL_ADDRESS,
      to: email,
      subject: "Booking Confirm",
      text: `An Appointment is Booked With you on ${day
        .toUpperCase()
        } at ${time.toUpperCase()}`,
    };

    const result = mailTransporter.sendMail(detail);
    res.status(200).json({message:"Appointment Booked", data:result.messageId});
  } catch (e) {
    console.log(e);
  }
};
