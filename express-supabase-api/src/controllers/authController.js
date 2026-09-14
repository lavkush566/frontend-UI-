import { supabase } from '../config/supabase.js';

// Lógica de Registro (Register)
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'El email y la contraseña son obligatorios.' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    message: 'Usuario registrado con éxito. Revisa tu correo si tienes activa la confirmación.',
    user: data.user,
  });
};

// Lógica de Inicio de Sesión (Login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'El email y la contraseña son obligatorios.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Inicio de sesión exitoso.',
    session: data.session, // Contiene el access_token (JWT) para proteger rutas
  });
};
