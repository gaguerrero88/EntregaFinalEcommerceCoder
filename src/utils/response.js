export const response = (res,statusCode,data)=>{
    res.status(statusCode).json ({
        status: "succes",
        data,
    })

}

