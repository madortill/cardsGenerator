Param ($commitMessage = $(throw "commit message parameter is required."))
$ErrorActionPreference = "Stop"
$repoURL = git remote get-url --push origin
write-output $repoURL
if($repoURL -eq $null -or $repoURL -eq "")
{
    $repoURL = Read-Host -Prompt "Repository URL not found. Please enter repository url to continue or ctrl + C to quit"
    git remote add origin $repoURL
}

git add -A
git commit -m $commitMessage
git push $repoURL 

write-host ""
write-host "Uploaded to github"
write-host ""
