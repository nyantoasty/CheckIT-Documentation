<div class="function-card" id="function-invoke-nodecommand">
  <h3>🛠️ Invoke-NodeCommand</h3>
  <div class="tabs">
    <button class="tab active" data-tab="overview-invoke-nodecommand">Overview</button>
    <button class="tab" data-tab="examples-invoke-nodecommand">Examples</button>
    <button class="tab" data-tab="detailed-invoke-nodecommand">Detailed</button>
  </div>

  <!-- Overview Tab -->
  <div class="tab-content" id="overview-invoke-nodecommand">
    <div class="function-description">
      Safely runs commands or scriptblocks on multiple nodes with comprehensive logging, dry-run support, and robust error handling.
    </div>
    <div class="function-section"><strong>Syntax:</strong></div>
    <pre><code class="language-powershell">
Invoke-NodeCommand [-Nodes] &lt;Array&gt; [[-Command] &lt;String&gt;] [[-ScriptBlock] &lt;ScriptBlock&gt;]
 [[-ArgumentList] &lt;Object[]&gt;] [[-MaxParallel] &lt;Int32&gt;] [-DryRun] [[-PromptUser] &lt;Boolean&gt;]
 [[-StatusCallback] &lt;ScriptBlock&gt;] [[-LogResults] &lt;Boolean&gt;] [[-ShowOutput] &lt;Boolean&gt;]
 [[-TimeoutSeconds] &lt;Int32&gt;] [-ProgressAction &lt;ActionPreference&gt;] [&lt;CommonParameters&gt;]
    </code></pre>
    <div class="function-section"><strong>Parameters:</strong></div>
    <ul class="param-list">
      <li><span class="param-icon">🔸</span> <code>Nodes</code>: Target nodes to run the command on</li>
      <li><span class="param-icon">🔸</span> <code>StatusCallback</code>: Function to call for status updates (GUI integration)</li>
    </ul>
    <div class="returns-section"><span class="returns-icon">📤</span> <strong>Returns:</strong> Command execution results with detailed status information</div>
  </div>

  <!-- Examples Tab -->
  <div class="tab-content" id="examples-invoke-nodecommand" style="display:none;">
    <div class="code-example" data-language="POWERSHELL">
      <h4>BASIC COMMAND EXECUTION</h4>
      <pre><code class="language-powershell">
Invoke-NodeCommand -Nodes @("PC001", "PC002") -Command 'Get-Service -Name CcmExec | Select-Object Name,Status'
      </code></pre>
      <p class="example-desc">
        Executes a simple service query command on multiple nodes with automatic credential resolution and comprehensive result reporting.
      </p>
    </div>
    <div class="code-example" data-language="POWERSHELL">
      <h4>COMMAND WITH EXTENDED TIMEOUT</h4>
      <pre><code class="language-powershell">
Invoke-NodeCommand -Nodes $nodeList -Command 'Get-Process | Where-Object {$_.CPU -gt 100}' -TimeoutSeconds 300
      </code></pre>
      <p class="example-desc">
        Runs a potentially long-running process query with extended timeout to prevent premature termination.
      </p>
    </div>
    <div class="code-example" data-language="POWERSHELL">
      <h4>DRY-RUN FOR VALIDATION</h4>
      <pre><code class="language-powershell">
Invoke-NodeCommand -Nodes $nodes -Command 'Restart-Service Spooler' -DryRun
      </code></pre>
      <p class="example-desc">
        Validates the command and shows what would be executed without actually running the restart command.
      </p>
    </div>
    <div class="code-example" data-language="POWERSHELL">
      <h4>GUI INTEGRATION WITH PROGRESS CALLBACK</h4>
      <pre><code class="language-powershell">
$callback = { param($activity, $current, $total) Update-ProgressBar $activity $current $total }
$results = Invoke-NodeCommand -Nodes $nodes -Command $cmd -PromptUser:$false -StatusCallback $callback
      </code></pre>
      <p class="example-desc">
        Demonstrates integration with GUI applications using custom progress reporting and silent operation mode.
      </p>
    </div>
  </div>

  <!-- Detailed Tab -->
  <div class="tab-content" id="detailed-invoke-nodecommand" style="display:none;">
    <div class="function-section"><strong>Detailed Description:</strong></div>
    <p>
      Invoke-NodeCommand is CheckIT's premier remote command execution function, providing Collection Commander-style remote command execution with comprehensive logging, security validation, and enterprise-grade error handling. It serves as the foundation for safe, auditable remote operations across multiple systems simultaneously.
    </p>
    <ul>
      <li><strong>Dual execution modes:</strong> Command strings and ScriptBlocks with proper argument passing</li>
      <li><strong>Security validation:</strong> Input sanitization and command safety checks</li>
    </ul>
    <div class="function-section"><strong>Parameters (Detailed):</strong></div>
    <ul>
      <li><strong>Nodes:</strong> Array of node objects or node names to execute commands on. Supports both string arrays and CheckIT node objects with automatic normalization.</li>
      <li><strong>TimeoutSeconds:</strong> Maximum time (in seconds) to wait for command execution on each node. Default is 60 seconds.</li>
    </ul>
    <div class="function-section"><strong>Inputs:</strong></div>
    <p>System.Array (arrays of node names or CheckIT node objects)</p>
    <div class="function-section"><strong>Outputs:</strong></div>
    <ul>
      <li><strong>CLI Mode:</strong> Displays formatted results and returns result objects for continued processing.</li>
      <li><strong>GUI Mode:</strong> Returns hashtable with structured data (Results, Summary, Errors).</li>
    </ul>
    <div class="function-section"><strong>Notes, Troubleshooting, and Best Practices:</strong></div>
    <ul>
    </ul>
  </div>
</div>