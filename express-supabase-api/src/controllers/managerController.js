import { supabase } from "../config/supabase.js";

export const createManager = async (req,res)=>{
    try{
        const {name,email} = req.body;
        if (!name ||!email) {
            return res.status(400).json({
                success:false,
                message:"Name and gmail are required",
            })
        }

        const{data,error} = await supabase
        .from("managers")
        .insert([{name,email}])
        .select()
        .single();

        if (error) {
            return res.status(400).json({
                success:false,
                message:"Faild to create manager",
                error:error.message,
            })
        }
        return res.status(201).json({
            success:true,
            message:"Manager created succcessfully",
            manager:data,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.messsage,
        })
    }
}


export const getAllManagers = async (req,res)=>{
    try{
        const{data,error} =await supabase
        .from("manager")
        .select("*");

        if (error) {
            return res.status(400).json({
                success:false,
                message:"Failed to featch managers",
                error:error.message,
            })
        }
        return res.status(200).json({
            success:true,
            count:data.length,
            managers:data,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message,
        })
    }
}


export const getManagerAllById =async(req,res)=>{
    try{
        const {id} =req.params;
        const {data,error} =await supabase
        .from("manager")
        .select("*")
        .eq("id",id)
        .maybeSingle();

        if (error) {
            return res.status(400).json({
                success:false,
                message:"Failed to featch managers",
                error:error.message,
            });
        }
        if (!data) {
            return res.status(404).json({
                success:false,
                message:"Manager not found",

            })
        }
        return res.status(200).json({
            success:true,
            manager:data,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message,
        })
    }
}

export const updateManager = async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,email} =req.body;
        if (
            name===undefined&&
            email===undefined

        ) {
            return res.status(400).json({
                success:false,
                message:"Provide name or email to update",
            })
            
        }
        const update={};

        if (name !==undefined)update.name=name;
        if (email !==undefined)update.email=email;
        const {data,error} = await supabase
        .from("manager")
        .update(update)
        .eq("id",id)
        .select()
        .maybeSingle();

        if (error) {
            return res.status(400).json({
                success:false,
                message:"Failed to update manager",
                error:error.message,
            })
        }
        if (!data) {
            return res.status(400).json({
                success:false,
                messsage:"Maanager not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Manager update successfully",
            manager:data,
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message,
        })
    }
}

export const deleteManager = async (req,res)=>{
    try{
        const {id}=req.params;
        const {data,error} =await supabase
        .from("manager")
        .delete()
        .eq("id",id)
        .select()
        .maybeSingle();
    if (error) {
        return res.status(400).json({
            success:false,
            message:"Faild to delete manager ",
            error:error.message,
        });
    }    

    if (!data) {
        return res.status(404).json({
            success:false,
            message:"Manager not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Manager delete successfully",
        manager:data,
    });
    }catch(error){
    return res.status(500).json({
        success:false,
        message:"Server error",
        error:error.message,
    });
}
};