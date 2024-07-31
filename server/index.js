const express = require("express") ;
const app = express() ; 

const userRoutes = require("./routes/User") ;
const profileRoutes = require("./routes/Profile") ;
// const paymentRoutes = require("./routes/Payments") ;
const courseRoutes = require("./routes/Course") ;
// const contactUsRoute = require("./routes/Contact") ;
const {cloudinaryConnect} = require("./config/cloudinary") ;
const fileUpload = require("express-fileupload") ;
const cors = require("cors") ; // to make both frontend and backend run on the local machine
const cookieParser = require("cookie-parser") ;

require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

require("./config/database").connectDB() ;

// middleware to parse the objects from the req body
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(cors({
    origin: "https://localhost:3000",
    credentials: true
})) ;

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
})) ;

// cloudinary connection
cloudinaryConnect() ;

// route import and mount
app.use("/api/v1/auth", userRoutes) ;
app.use("/api/v1/profile", profileRoutes) ;
// app.use("/api/v1/payment", paymentRoutes) ;
app.use("/api/v1/course", courseRoutes) ;
// app.use("/api/v1/contact", contactUsRoute) ;

// default route 
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    }) ;
})

// activate
app.listen(PORT, () => {
    console.log(`App is currently listening at ${PORT}`) ;
})