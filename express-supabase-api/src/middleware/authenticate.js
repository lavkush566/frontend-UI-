import { supabase } from "../config/supabase.js";

export const authenticate =async (req,res,next)=>{ 
    try{
        const authHeader =req.headers.authorization;
        if (!authHeader|| !authHeader.startsWith("Bearer")) {
            return res.status(404).json({
                success:false,
                message:"Access token is required"
            })
        }

        const token =authHeader.split("")[1];
        const {data,error}=await
        supabase.auth.getUser(token);
        if (error||!data.user) {
            return res.status(404).json({
                success:false,
                message:"Invalid or expired token "
            });
        }

        req.user= data.user;

        next();
    
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Authentication Failed"
        });
    }
    
}

export default authenticate;