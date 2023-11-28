import { generateToken } from "../utils.js"



 class UserController {

async registerUser (req,res){
    res.render ("register",{message:"User registerd"})     
}

async loginUser (req,res){
    const user = req.user
    const token = generateToken (user)
     res.cookie("cookieToken",token,{httpOnly:true}).redirect("/home")
    }

async logoutUser (req,res){
res.clearCookie('cookieToken').redirect ("/")
}
}

export const userController = new UserController();