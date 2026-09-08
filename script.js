const passwordInput = document.querySelector('#password');
const toggle = document.querySelector('.toggle');


if (passwordInput && toggle) {
	toggle.addEventListener('click', () => {
	const isPasswordHidden = passwordInput.type === 'password';

	passwordInput.type = isPasswordHidden ? 'text' : 'password';
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

function goToSignup() {
	window.location.href = 'singup.html';
}
