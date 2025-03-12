// Sélectionne tous les champs du formulaire et le bouton
const inputs = document.querySelectorAll("input[type='text'], input[type='password']")
const submitButton = document.getElementById('submitButton')
const flashMessage = document.getElementById('flash-message')

function checkFormValidity() {
  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')
  const passwordConfirmationInput = document.getElementById('password_confirmation')

  if (!usernameInput || !passwordInput) {
    // Si les éléments principaux ne sont pas présents, on quitte la fonction
    return
  }

  const isUsernameValid = usernameInput.value.trim() !== ''
  const isPasswordValid = passwordInput.value.length >= 8

  // Si le champ de confirmation existe, vérifie qu'il correspond au mot de passe
  const isPasswordsMatch = passwordConfirmationInput
    ? passwordInput.value === passwordConfirmationInput.value
    : true

  if (isUsernameValid && isPasswordValid && isPasswordsMatch) {
    submitButton.style.display = 'block'
    flashMessage.style.display = 'none'
  } else {
    submitButton.style.display = 'none'
    flashMessage.classList.add('alert-danger')

    if (!isUsernameValid) {
      flashMessage.textContent = "Le nom d'utilisateur est requis."
    } else if (!isPasswordValid) {
      flashMessage.textContent = 'Le mot de passe doit comporter au moins 8 caractères.'
    } else if (!isPasswordsMatch) {
      flashMessage.textContent = 'Les mots de passe ne correspondent pas.'
    }
    flashMessage.style.display = 'flex'
  }
}

// Ajout des écouteurs d'événements pour chaque champ
inputs.forEach((input) => {
  input.addEventListener('input', checkFormValidity)
})
