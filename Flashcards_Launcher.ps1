# Active les fonctions clavier
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Ouvre le projet dans Visual Studio Code
Start-Process "code" "C:\Users\py78dal\Documents\GitHub\FlashCards\flashcards"
Start-Sleep -Seconds 2

# Ouvre une console CMD et exécute npm run dev
Start-Process "cmd.exe" -ArgumentList "/k cd /d C:\Users\py78dal\Documents\GitHub\FlashCards\flashcards && npm run dev"
Start-Sleep -Seconds 3

# Ouvre les fichiers HTML
Start-Process "C:\Users\py78dal\Documents\GitHub\FlashCards\GitJournal\htmljs\gitjournal.html"
Start-Process "C:\Users\py78dal\Documents\GitHub\FlashCards\WOF-main\player.html"
Start-Sleep -Seconds 1

# Ouvre Chrome avec http://localhost:8081/
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
Start-Process $chromePath "http://localhost:8081/"
Start-Sleep -Seconds 3

# Simule le login : tab x5, root, tab, root, enter
for ($i = 0; $i -lt 5; $i++) {
    [System.Windows.Forms.SendKeys]::SendWait("{TAB}")
    Start-Sleep -Milliseconds 150
}
[System.Windows.Forms.SendKeys]::SendWait("root")
Start-Sleep -Milliseconds 200
[System.Windows.Forms.SendKeys]::SendWait("{TAB}")
Start-Sleep -Milliseconds 150
[System.Windows.Forms.SendKeys]::SendWait("root")
Start-Sleep -Milliseconds 200
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

# Ouvre http://localhost:3333 dans Chrome
Start-Process $chromePath "http://localhost:3333"

# Ouvre le projet GitHub
Start-Process "https://github.com/users/GHerreraE/projects/3/views/1"

# Ferme cette console PowerShell (celle qui exécute le script)
$myProcess = Get-Process -Id $PID
$myProcess.CloseMainWindow()
