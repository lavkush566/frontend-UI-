const passwordInput = document.querySelector('#password');
const toggle = document.querySelector('.toggle');

if (passwordInput && toggle) {
	toggle.addEventListener('click', () => {
	const isPasswordHidden = passwordInput.type === 'password';

	passwordInput.type = isPasswordHidden ? 'text' : 'password';
	toggle.classList.toggle('is-visible', isPasswordHidden);
	toggle.setAttribute(
		'aria-label',
		isPasswordHidden ? 'Hide password' : 'Show password'
	);
	toggle.setAttribute(
		'title',
		isPasswordHidden ? 'Hide password' : 'Show password'
	);
 	});
}

const loginForm = document.querySelector('#loginForm');
const message = document.querySelector('#message');

if (loginForm && message && window.supabase) {
	const supabaseClient = window.supabase.createClient(
		'https://xktwopnqvklehcbfisdw.supabase.co',
		'sb_publishable_wnFosAzwM9_vV7hORkYBrw_6ogf07-X'
	);

	loginForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		message.textContent = 'Signing in...';

		const { error } = await supabaseClient.auth.signInWithPassword({
			email: document.querySelector('#email').value,
			password: passwordInput.value
		});

		message.textContent = error ? error.message : 'Signed in successfully.';
	});
}

const oauthButtons = document.querySelectorAll('.btn-oauth');
const oauthNote = document.querySelector('.oauth-note');

oauthButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (!oauthNote) return;
		oauthNote.textContent = `${button.dataset.provider} sign-in isn't connected yet.`;
		oauthNote.classList.add('show');
	});
});
