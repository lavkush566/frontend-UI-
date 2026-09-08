
    const supabaseUrl = 
    "https://xktwopnqvklehcbfisdw.supabase.co";
    const supabaseKey = "sb_publishable_wnFosAzwM9_vV7hORkYBrw_6ogf07-X";
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.textContent = "Creating account...";

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
        console.error(error);
        return;
    }

    message.textContent = "Account created successfully!";
    console.log(data);
});