---
layout: home
title: CheckIT-Core Documentation
---

<link rel="stylesheet" href="assets/style.css">

<div class="hero-section">
  <h1>🔧 CheckIT-Core Documentation</h1>
  <blockquote>
    Professional PowerShell module for Windows computer management, diagnostics, and reporting in domain environments.
  </blockquote>
  
  <div class="status-container">
    <span class="status-badge status-version">Version 1.5.0</span>
    <span class="status-badge status-progress">75+ Functions</span>
    <span class="status-badge status-production">Production Ready</span>
  </div>
</div>

<div class="docs-grid">
  <div class="doc-card">
    <h3>📖 Project Overview</h3>
    <p>Complete feature overview, enhanced template workflow system, installation guide, and usage examples.</p>
    <a href="docs/README" class="card-link">View Documentation →</a>
  </div>
  
  <div class="doc-card">
    <h3>🔧 API Reference</h3>
    <p>Complete function library with template system, multi-template workflows, and automation capabilities.</p>
    <a href="docs/api-reference" class="card-link">Browse Functions →</a>
  </div>
  
  <div class="doc-card">
    <h3>🆘 Quick Reference</h3>
    <p>Essential patterns, template workflows, and rapid development guide for immediate productivity.</p>
    <a href="docs/quick-reference" class="card-link">Quick Start →</a>
  </div>
  
  <div class="doc-card">
    <h3>🔍 Troubleshooting</h3>
    <p>Solutions including template system troubleshooting and session automation patterns.</p>
    <a href="docs/troubleshooting" class="card-link">Get Help →</a>
  </div>

  <div class="doc-card">
    <h3>📋 Changelog</h3>
    <p>Version history, template system updates, and detailed changes across all releases.</p>
    <a href="CHANGELOG" class="card-link">View Changes →</a>
  </div>
</div>

<div class="feature-card">
  <h2>🚀 Key Features</h2>
  
  **Template Workflow System** • **Session Automation** • **Centralized Management** • **Secure Authentication** • **Excel Reporting** • **Session Persistence** • **Parallel Processing** • **Active Directory Integration** • **Documentation Automation**
  
  Perfect for managing labs, classrooms, and departmental computers in domain environments.
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
  
  <div class="code-example">
    <h4>Template Workflow</h4>
    <pre><code># Multi-template execution with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel</code></pre>
  </div>
  
  <div class="code-example">
    <h4>Template Management</h4>
    <pre><code># List available templates
Manage-Templates -Type Command -Action List

# Search for development patterns
Manage-Templates -Type Codebase -Action Search</code></pre>
  </div>
</div>

---

**Repository**: [CheckIT (Private)](https://github.com/nyantoasty/CheckIT) | **License**: MIT | **Maintained by**: IT Department | **Status**: Production Ready v1.5.0
