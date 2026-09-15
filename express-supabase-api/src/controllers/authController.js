import { supabase } from '../config/supabase.js';

// Register a new user
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return res.status(201).json({
      message: 'Registration successful! Check your email for confirmation.',
      user: data.user,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Log in an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Returns user data along with access_token (JWT) and refresh_token
    return res.status(200).json({
      message: 'Login successful',
      session: data.session,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
