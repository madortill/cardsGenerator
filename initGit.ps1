  # set url parameter
  Param ($repoURL = $(throw "repository url parameter is required."))
  $repoName = ((($repoURL -split "/")[4]) -split ("\."))[0]  
  write-output "Your repository name:  $repoName"

# catch git errors function
  function Invoke-Utility {
    $exe, $argsForExe = $Args
    # Workaround: Prevents 2> redirections applied to calls to this function
    #             from accidentally triggering a terminating error.
    #             See bug report at https://github.com/PowerShell/PowerShell/issues/4002
    $ErrorActionPreference = 'Continue'
    try { & $exe $argsForExe } catch { Throw } # catch is triggered ONLY if $exe can't be found, never for errors reported by $exe itself
    if ($LASTEXITCODE) { Throw "$exe indicated failure (exit code $LASTEXITCODE; full command: $Args)." }
  }
  Set-Alias iu Invoke-Utility

  (Get-Content ./vite.config.js).replace('<REPO_NANE>'), $repoName | Set-Content ./vite.config.js
  npm i
  iu git init

  # add remote only if origin is not already defined
  git remote add origin $repoURL

  # enter correct repo name to vite.config.js
  $data = Get-Content ".\vite.config.js"
  $data = $data.Replace("<REPO_NAME>", "$repoName")
  $data | Out-File -encoding ASCII ".\vite.config.js"

  # continue git workflow
  iu git add -A
  git checkout -b master
  iu git commit -m 'first' 
  iu git push -u origin master
  write-output ""
  write-output "Repositry initalized"



