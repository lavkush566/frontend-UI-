import { supabase } from "../config/supabase.js";

// CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const { data, error } = await supabase
      .from("employees")
      .insert([{ name, email }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to create employee",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL EMPLOYEES
export const getAllEmployees = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*");

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch employees",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      employees: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch employee",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (
      name === undefined &&
      email === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide name or email to update",
      });
    }

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;

    const { data, error } = await supabase
      .from("employees")
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to update employee",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete employee",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      employee: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};