import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "./config/config.js"
import multer from "multer"



export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
  const token = jwt.sign({_id: user._id,name: user.name, email: user.email, role: user.role,cartId: user.cartId }, config.jwt.pass, { expiresIn: "24h" });
  return token;
};


const checkValidfields = (user) =>{
  const {name,lastname,email,password,age} = user
if (!name || !lastname || !email || !password || !age ){
  return false
}else {
  return true
}
}

const profileMulterFilter = (req,file,cb)=>{
  if (!checkValidfields(req.body)){
    cb (null,false)
  }else{
    cb (null,true)
  }
}


const profileStorage = multer.diskStorage ({
  destination: function (req,file,cb){
    cb(null,path.join(__dirname,"/multer/users/img"))
  },
  filename: function (req,file,cb){
    cb (null,`${req.body.email}-profile-${file.originalname}`)
  },
})

const uploadProfile = multer ({storage: profileStorage,fileFilter:profileMulterFilter})

const documentStorage = multer.diskStorage ({
  destination: function (req,file,cb){
    cb(null,path.join(__dirname,"/multer/users/documents"))
  },
  filename: function (req,file,cb){
    cb (null,`${req.user.email}-document-${file.originalname}`)
  }
})

const uploadDocuments = multer ({storage: documentStorage})


const productStorage = multer.diskStorage ({
  destination: function (req,file,cb){
    cb(null,path.join(__dirname,"/multer/products/img"))
  },
  filename: function (req,file,cb){
    cb (null,`${req.body.code}-product-${file.originalname}`)
  }
})

const uploadProduct = multer ({storage: productStorage})

export {uploadDocuments,uploadProfile,uploadProduct}