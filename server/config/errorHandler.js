const errorHandler = (res, status, message)=>{
    res.status(status).json({message: message});
}

export default errorHandler