import { supabase } from "../config/supabase.js";

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};
