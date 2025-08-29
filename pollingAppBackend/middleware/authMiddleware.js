export const protectRoute = (req,res,next) => {

    const auth = req.headers["authorization"];
    if(auth === "Bearer MY-SECRET-TOKEN"){

        next();
    }else{
        res.status(403).json({message: "Forbidden: Invalid token"});
    }
};