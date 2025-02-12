document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')
  const confirmPasswordInput = document.getElementById('password_confirmation')
  const submitButton = document.getElementById('submitButton')

  // Ajouter des éléments pour afficher les messages d'erreur
  const usernameError = document.getElementById('usernameError')
  const passwordError = document.getElementById('passwordError')
  const confirmPasswordError = document.getElementById('confirmPasswordError')

  // Cacher les messages d'erreur initialement
  usernameError.textContent = ''
  passwordError.textContent = ''
  confirmPasswordError.textContent = ''

  function validateForm() {
    const usernameNotEmpty = usernameInput.value.trim() !== ''
    const passwordValid = passwordInput.value.length >= 8
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value

    // Afficher ou cacher le bouton d'envoi
    if (usernameNotEmpty && passwordValid && passwordsMatch) {
      submitButton.style.display = 'block'
    } else {
      submitButton.style.display = 'none'
    }
  }

  function handleSubmit(event) {
    event.preventDefault() // Empêcher l'envoi immédiat du formulaire

    const usernameNotEmpty = usernameInput.value.trim() !== ''
    const passwordValid = passwordInput.value.length >= 8
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value

    // Afficher les messages d'erreur seulement lorsque l'utilisateur tente de soumettre
    if (!usernameNotEmpty) {
      usernameError.textContent = "Le nom d'utilisateur ne peut pas être vide."
    } else {
      usernameError.textContent = ''
    }

    if (!passwordValid) {
      passwordError.textContent = 'Le mot de passe doit contenir au moins 8 caractères.'
    } else {
      passwordError.textContent = ''
    }

    if (!passwordsMatch) {
      confirmPasswordError.textContent = 'Les mots de passe doivent correspondre.'
    } else {
      confirmPasswordError.textContent = ''
    }

    // Si tout est valide, soumettre le formulaire
    if (usernameNotEmpty && passwordValid && passwordsMatch) {
      document.querySelector('form').submit() // Soumettre le formulaire
    }
  }

  // Écouter les changements pour valider en temps réel
  usernameInput.addEventListener('input', validateForm)
  passwordInput.addEventListener('input', validateForm)
  confirmPasswordInput.addEventListener('input', validateForm)

  // Validation du formulaire au clic du bouton
  submitButton.addEventListener('click', handleSubmit)

  validateForm() // Pour cacher le bouton dès le départ
})
