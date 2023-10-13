import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import appointmentsRoute from "./routes/appointment.js";
import emailRoute from "./routes/email.js";
import contactRoute from "./routes/contact.js";
import blogRoute from "./routes/blog.js";
import forgotPasswordRoute from "./routes/forgotpassword.js"
import resetPasswordRoute from "./routes/resetPassword.js";
import otherDoctorsRoute from "./routes/otherdoctors.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello server");
});


// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};



app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/doctorappointments", appointmentsRoute);
app.use("/api/v1/sendemail", emailRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/forgotpassword", forgotPasswordRoute);
app.use("/api/v1/resetpassword", resetPasswordRoute);
app.use("/api/v1/otherdoctors", otherDoctorsRoute)

app.listen(port, () => {
  connectDB();
  console.log("server listening on port" + port);
});
