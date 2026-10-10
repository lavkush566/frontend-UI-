const authorize =(...allowedRoles)=>{
    return(req,res,next )=>{
        if (!req.user) {
            return res.status(404).json({
                success:false,
                message:"please log in first"
            });
        }
        next();
    }
}

export default  authorize;