export const response = (res,statusCode,data)=>{
    res.status(statusCode).json ({
        message: "succes",
        data,
    })

}

