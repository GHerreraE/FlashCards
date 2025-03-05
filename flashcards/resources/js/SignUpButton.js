// Sélectionne tous les champs du formulaire et le bouton
const inputs = document.querySelectorAll("input[type='text'], input[type='password']")
const submitButton = document.getElementById('submitButton')
const flashMessage = document.getElementById('flash-message')

// Fonction qui vérifie que tous les champs sont valides
function checkFormValidity() {
  const isUsernameValid = document.getElementById('username').value.trim() !== ''
  const isPasswordValid = document.getElementById('password').value.length >= 8
  const isPasswordsMatch =
    document.getElementById('password').value ===
    document.getElementById('password_confirmation').value

  if (isUsernameValid && isPasswordValid && isPasswordsMatch) {
    submitButton.style.display = 'block'
    flashMessage.style.display = 'none' // Cache le message si tout est valide
  } else {
    submitButton.style.display = 'none'
    if (!isUsernameValid) {
      flashMessage.classList.add('alert-danger')
      flashMessage.textContent = "Le nom d'utilisateur est requis."
    } else if (!isPasswordValid) {
      flashMessage.classList.add('alert-danger')
      flashMessage.textContent = 'Le mot de passe doit comporter au moins 8 caractères.'
    } else if (!isPasswordsMatch) {
      flashMessage.classList.add('alert-danger')
      flashMessage.textContent = 'Les mots de passe ne correspondent pas.'
    }
    flashMessage.style.display = 'flex'
  }
}

// Ajout des écouteurs d'événements pour chaque champ
inputs.forEach((input) => {
  input.addEventListener('input', checkFormValidity)
})
