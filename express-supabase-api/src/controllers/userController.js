import{supabase} from"../config/supabase.js";

export const getAllUsers = async(req,res)=>{
    try{
        const{data,error}=await supabase
        .from("users")
        .select("*");

        if (error) {
            return res.status(500).json({
                success:false,
                message:"Failed to fetch users",
                error: error.message,
            });
        }
        res.status(200).json({
            success:true,
            count:data.length,
            users:data,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message,
        });
    }
};

//GET USER BY ID 
    export const getUserById=async(req,res)=>{
        try{
            const {id} = req.params;
            const {data,error}= await supabase
            .from("users")
            .select("*")
            .eq("id",id)
            .single();
            if (error) {
                return res.status(404).json({
                    success:false,
                    message:"User not found",
                    error:error.message
                })
            }
            res.status(200).json({
                success:true,
                user:data,
            });
            }catch(error){
                res.status(500).json({
                    success:false,
                    message:"Server error",
                    error: error.message,
                });
            }
        }

        //update user 

        export const updateUser = async(req,res)=>{
            try{
                const {id} = req.params;
                const updates =req.body;

                const {data,error} = await supabase
                .from("users")
                .update(updates)
                .eq("id",id)
                .select()
                .single();
                if (error) {
                    return res.status(400).json({
                        success:false,
                        message:"failed to update user",
                        error:error.message
                    });
                }
                res.status(200).json({
                    success:true,
                    message:"User update successfully",
                    user:data,
                })
            } catch(error){
                res.status(500).json({
                    success:false,
                    message:"Server error",
                    error:error.message,
                })
            }
        }


        // delete user

        export const deleteUser = async (req,res)=>{
            try{
                const{id}= req.params;
                const{error} = await supabase
                .from("user")
                .delete()
                .eq("id",id);
                if (error) {
                     return res.status(400).json({
                        success:false,
                        message:"Failed to delete user",
                        error:error.message,
                    })
                }
                res.status(200).json({
                    success:true,
                    message:"User deleted successfully"
                });
            } catch (error){
                res.status(500).json({
                    success:false,
                    message:"Server error",
                    error: error.message,
                });
            }
        }