# Paths
$helpFolder = "docs/help"
$outputPath = "docs/api-reference-cards.md"

# Define categories
$functionCategories = @{
    "Template System" = @()
    "Core Data Collection" = @()
    "Node Management" = @()
    "Report Generation" = @()
    "Utility Functions" = @()
    "Error Handling" = @()
}

# Get all help files except README.md
$helpFiles = Get-ChildItem $helpFolder -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }

foreach ($file in $helpFiles) {
    $content = Get-Content $file.FullName -Raw
    $name = $file.BaseName

    # Extract SYNOPSIS or first paragraph (tolerant of whitespace)
    $desc = ""
    if ($content -match '(?ms)^\s*##\s*SYNOPSIS\s*(.+?)(^\s*##|\z)') {
        $desc = $matches[1].Trim()
    } elseif ($content -match '(?ms)^\s*([^\r\n]+)\r?\n') {
        $desc = $matches[1].Trim()
    }

    # --- PlatyPS Parameter Extraction ---
    $params = @()
    if ($content -match '(?ms)##\s*PARAMETERS\s*(.+?)(^\s*##|\z)') {
        $paramBlock = $matches[1]
        $paramMatches = [regex]::Matches($paramBlock, '(?ms)###\s*-(\w+)\s*(.+?)(?=^###\s*-|\z)', 'IgnoreCase, Multiline')
        foreach ($pm in $paramMatches) {
            $pName = $pm.Groups[1].Value.Trim()
            $pDesc = $pm.Groups[2].Value.Trim()
            # Remove YAML block if present
            if ($pDesc -match '(?ms)^(.+?)(```yaml[\s\S]+?```)?$') {
                $pDesc = $matches[1].Trim()
            }
            $params += "<li><span class='param-icon'>🔸</span> <code>$pName</code>: $pDesc</li>"
        }
    }

    # Fallback: old bullet-list style
    if (-not $params -or $params.Count -eq 0) {
        if ($content -match '(?ms)\*\*Parameters:\*\*\s*([\s\S]+?)(\*\*Returns:\*\*|^\s*$)') {
            $paramBlock = $matches[1]
            $params = ($paramBlock -split "`r?\n") | Where-Object { $_.Trim() -match '^- ' }
            $params = $params | ForEach-Object {
                if ($_ -match '- `?([^`]+)`?: (.+)') {
                    "<li><span class='param-icon'>🔸</span> <code>$($matches[1].Trim())</code>: $($matches[2].Trim())</li>"
                }
            } | Where-Object { $_ }
        }
    }

    # --- PlatyPS Example Extraction ---
    $examplesHtml = ""
    if ($content -match '(?ms)##\s*EXAMPLES\s*(.+?)^\s*##\s*PARAMETERS') {
        $exBlock = $matches[1]
        # Match all EXAMPLE sections
        $exMatches = [regex]::Matches($exBlock, '(?ms)###\s*EXAMPLE\s*(\d+)\s*(.+?)(?=^###|\z)', 'IgnoreCase, Multiline')
        $exampleItems = @()
        foreach ($ex in $exMatches) {
            $exNum = $ex.Groups[1].Value.Trim()
            $exText = $ex.Groups[2].Value.Trim()
            if ($exText) {
                $exampleItems += "<div class='example-item'><div class='example-heading'>Example $exNum</div><pre><code class='language-powershell'>$exText</code></pre></div>"
            }
        }
        if ($exampleItems.Count -gt 0) {
            $examplesHtml = "<div class='examples-block'>" + ($exampleItems -join "`n") + "</div>"
        }
    }
    # Fallback: first code block
    if (-not $examplesHtml) {
        if ($content -match '(?ms)```powershell\s*([\s\S]+?)```') {
            $examplesHtml = "<div class='examples-block'><div class='example-item'><pre><code class='language-powershell'>" + $matches[1].Trim() + "</code></pre></div></div>"
        }
    }
    $examplesHtml = $exampleBlocks -join "`n"

    # Extract returns (from RETURNS section or after **Returns:**)
    $returns = ""
    if ($content -match '(?ms)^\s*##\s*RETURNS\s*(.+?)(^\s*##|\z)') {
        $returns = $matches[1].Trim()
    } elseif ($content -match '(?ms)\*\*Returns:\*\*\s*([\s\S]+?)(^\s*$|\z)') {
        $returns = $matches[1].Trim()
    }

    # Format parameters for card
    $paramList = ""
    if ($params -and $params.Count -gt 0) {
        $paramList = $params -join "`n"
    }

    # --- Categorization logic ---
    $category = "Utility Functions"
    if ($name -like "*Template*") {
        $category = "Template System"
    } elseif ($name -like "*Node*" -or $name -like "*FQDN*") {
        $category = "Node Management"
    } elseif ($name -like "*Report*" -or $name -like "*Export*" -or $name -like "*Excel*") {
        $category = "Report Generation"
    } elseif ($name -like "*Data*" -or $name -like "Get-*" -or $name -like "*Import*") {
        $category = "Core Data Collection"
    } elseif ($name -like "*Error*" -or $desc -like "*error*") {
        $category = "Error Handling"
    }

    $card = @"
<div class='function-card'>
  <h3>🛠️ $name</h3>
  <div class='function-description'>
    $desc
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    $paramList
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> $returns</div>
  $examplesHtml
</div>
"@
    $functionCategories[$category] += $card
}

# Output grouped by section
$output = @()
foreach ($category in $functionCategories.Keys) {
    if ($functionCategories[$category].Count -gt 0) {
        $output += "### $category`n"
        $output += ($functionCategories[$category] -join "`n`n")
    }
}
$output -join "`n`n" | Set-Content $outputPath
Write-Host "Generated function cards grouped by category in $outputPath"