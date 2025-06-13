$docsFolder = "c:\Users\class\OneDrive - Sam Houston State University\00 Work\Scripts\DEV\CheckIT\checkit-documentation\docs"

$files = Get-ChildItem -Path $docsFolder -Filter "*.md" -Recurse

$totalFiles = $files.Count
$processedFiles = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace ```powershell blocks with {% highlight powershell linenos %}
    $newContent = $content -replace '```powershell\s*\r?\n([\s\S]*?)```', '{% highlight powershell linenos %}$1{% endhighlight %}'
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent
        Write-Host "Updated $($file.Name)" -ForegroundColor Green
        $processedFiles++
    } else {
        Write-Host "No changes in $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "Done! Updated $processedFiles out of $totalFiles files." -ForegroundColor Cyan
