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

const oauthButtons = document.querySelectorAll('.btn-oauth');
const oauthNote = document.querySelector('.oauth-note');

oauthButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (!oauthNote) return;
		oauthNote.textContent = `${button.dataset.provider} sign-in isn't connected yet.`;
		oauthNote.classList.add('show');
	});
});
