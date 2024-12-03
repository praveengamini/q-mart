const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const nodemailer = require('nodemailer');

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

const forgotPassword = async(req,res)=>{
  const {email,otp,otpsent} = req.body
   try{
    const user = await User.findOne({ email: email });
    if(!user)
    {
      return res.json("createfirst")
    }
    else if(!otpsent){
      const otp = Math.floor(100000 + Math.random() * 900000);
      await User.updateOne({email:email},{$set: {otp:otp}})
      
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'wefrnds891@gmail.com',  
          pass: 'zdzk phzj wnew mgbz'          
        }
      });
      
      const mailOptions = {
        from: 'wefrnds891@gmail.com',    
        to: email,     
        subject: 'Sending Email using Nodemailer', 
        text:  `don't share this otp with anyone \n 6-digit otp : ${otp}` 
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.json("sentotp")
    }
    else{
        if(user.otp === parseInt(otp))
        {
            return res.json("verified")
        }
        else{
          return res.json("wrongotp")
        }
    }
  }
  catch(error)
  {
    console.log(error)
    res.json("something went wrong")
  }
  
}


const setnewpassword = async(req,res)=>{
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json("usernotfound");
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });    
    res.json("success");
  } catch (error) {
    console.error("Error updating password:", error);
    res.json("error");
  }
}


module.exports = { registerUser, loginUser, logoutUser, authMiddleware,setnewpassword,forgotPassword };