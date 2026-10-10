import { supabase } from "../config/supabase.js";

export const createManager = async (managerData) => {
  const { data, error } = await supabase
    .from("managerData")
    .insert([managerData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getManagers = async () => {
  const { data, error } = await supabase
    .from("managers")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const getManagerById = async (id) => {
  const { data, error } = await supabase
    .from("managers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateManager = async (id, updates) => {
  const { data, error } = await supabase
    .from("managers")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteManager = async (id) => {
  const { data, error } = await supabase
    .from("managers")
    .delete()
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};
