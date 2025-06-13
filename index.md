---
layout: home-page
title: CheckIT Home
icon: 🏠
description: Custom PowerShell module for Windows computer management, diagnostics, and reporting in domain environments
---

<div class="docs-grid">
  <div class="doc-card">
    <h3>ℹ️ About</h3>
    <p>Complete feature overview, enhanced template workflow system, installation guide, and usage examples.</p>
    <a href="docs/README" class="card-link">View Documentation →</a>
  </div>

 <div class="doc-card">
    <h3>🚀 Get Started</h3>
    <p>Request access, installation instructions, and getting started guide.</p>
    <a href="get-started" class="card-link">Access Guide →</a>
  </div> 
  
  <div class="doc-card">
    <h3>⚡ Quick Reference</h3>
    <p>Essential patterns, template workflows, and rapid development guide for immediate productivity.</p>
    <a href="docs/quick-reference" class="card-link">Quick Start →</a>
  </div>
  
  <div class="doc-card">
    <h3>📋 Changelog</h3>
    <p>Version history, template system updates, and detailed changes across all releases.</p>
    <a href="CHANGELOG" class="card-link">View Changes →</a>
  </div>
</div>

<div class="feature-card">
  <h2>🗝️ Key Features</h2>
  
  <p class="feature-list">
    Template Workflow System • Session Automation • Centralized Management<br>
    Secure Authentication • Excel Reporting • Session Persistence<br>
    Parallel Processing • Active Directory Integration • Documentation Automation
  </p>
  
  <p>Perfect for managing labs, classrooms, and departmental computers in domain environments.</p>
</div>

<div class="highlight-card">
  <h2>✨ What's New in v1.5.0</h2>
  
  <div class="new-features">
    <div class="feature-item">
      <h4>🔄 Complete Template Workflow System</h4>
      <p>30+ templates across Command, Test, and Codebase categories</p>
    </div>
    <div class="feature-item">
      <h4>🎛️ Enhanced Confirmation System</h4>
      <p>Smart automation with "Yes to All" / "No to All" session memory</p>
    </div>
    <div class="feature-item">
      <h4>📊 Multi-Sheet Excel Integration</h4>
      <p>Individual template sheets plus summary sheet for comprehensive reporting</p>
    </div>
  </div>
</div>

<div class="quick-start-card">
  <h2>⚡ Quick Start Examples</h2>
  
  <div class="code-example" data-language="POWERSHELL">
    <h4>Template Workflow</h4>
    {% highlight powershell linenos %}
# Multi-template execution with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel
{% endhighlight %}
  </div>
  
  <div class="code-example" data-language="POWERSHELL">
    <h4>Template Management</h4>
    {% highlight powershell linenos %}
# List available templates
Manage-Templates -Type Command -Action List

# Search for development patterns

Manage-Templates -Type Codebase -Action Search
{% endhighlight %}
  </div>
</div>
