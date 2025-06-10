---
layout: home
title: CheckIT-Core Documentation
---

<link rel="stylesheet" href="assets/style.css">

<div class="hero-section">
  <h1>🔧 CheckIT-Core Documentation</h1>
  <blockquote>
    Professional PowerShell module for Windows computer management, diagnostics, and reporting in domain environments. Now featuring enhanced template workflow system with advanced automation capabilities.
  </blockquote>
  
  <div class="status-container">
    <span class="status-badge status-version">Version 1.3.0</span>
    <span class="status-badge status-progress">71/71 Functions</span>
    <span class="status-badge status-production">Production Ready</span>
  </div>
</div>

<div class="docs-grid">
  <div class="doc-card">
    <h3>📖 Project Overview</h3>
    <p>Complete feature overview, enhanced template workflow system, installation guide, and usage examples for getting started with CheckIT-Core.</p>
    <a href="docs/README" class="card-link">View Documentation →</a>
  </div>
  
  <div class="doc-card">
    <h3>📊 Implementation Status</h3>
    <p>Current completion status showing 100% function completion with enhanced template workflow system and production-ready capabilities.</p>
    <a href="docs/implementation-status" class="card-link">Check Status →</a>
  </div>
  
  <div class="doc-card">
    <h3>🔧 API Reference</h3>
    <p>Complete function library with enhanced template system, multi-template workflows, and advanced automation patterns.</p>
    <a href="docs/api-reference" class="card-link">Browse Functions →</a>
  </div>
  
  <div class="doc-card">
    <h3>📚 Developer Guide</h3>
    <p>Enhanced patterns, template-driven development, The Big 3 Patterns, and small tweaks development philosophy.</p>
    <a href="docs/developer-guide" class="card-link">Read Guide →</a>
  </div>
  
  <div class="doc-card">
    <h3>🆘 Quick Reference</h3>
    <p>Essential patterns, template workflows, enhanced confirmation system, and rapid development guide for immediate productivity.</p>
    <a href="docs/quick-reference" class="card-link">Quick Start →</a>
  </div>
  
  <div class="doc-card">
    <h3>🔍 Troubleshooting</h3>
    <p>Solutions including template system troubleshooting, session automation patterns, and comprehensive problem resolution.</p>
    <a href="docs/troubleshooting" class="card-link">Get Help →</a>
  </div>

  <div class="doc-card">
    <h3>🤖 AI Assistant Guide</h3>
    <p>Human-AI collaboration patterns for CheckIT development with template workflows and documentation automation.</p>
    <a href="docs/assistance-guide" class="card-link">Collaborate →</a>
  </div>

  <div class="doc-card">
    <h3>📋 Changelog</h3>
    <p>Version history, enhanced template system updates, and detailed changes across all releases including automation features.</p>
    <a href="CHANGELOG" class="card-link">View Changes →</a>
  </div>
</div>

<div class="feature-card">
  <h2>🚀 Key Features</h2>
  
  **Enhanced Template Workflows** • **Session Automation** • **Centralized Management** • **Secure Authentication** • **Multi-Sheet Excel Reporting** • **Session Persistence** • **Parallel Processing** • **Active Directory Integration** • **Documentation Automation**
  
  Perfect for managing labs, classrooms, and departmental computers in domain environments with advanced template-driven automation.
</div>

<div class="highlight-card">
  <h2>✨ What's New in v1.3.0</h2>
  
  <div class="new-features">
    <div class="feature-item">
      <h4>🔄 Enhanced Template Workflow System</h4>
      <p>Multi-template execution with Excel export integration and session automation</p>
    </div>
    
    <div class="feature-item">
      <h4>🎛️ Three-Tier Confirmation System</h4>
      <p>Smart automation with "Yes to All" / "No to All" session memory</p>
    </div>
    
    <div class="feature-item">
      <h4>📊 Advanced Excel Integration</h4>
      <p>Individual template sheets plus summary sheet for comprehensive reporting</p>
    </div>
    
    <div class="feature-item">
      <h4>🤖 Documentation Automation</h4>
      <p>AI-assisted changelog maintenance and documentation analysis</p>
    </div>
  </div>
</div>

<div class="quick-start-card">
  <h2>⚡ Quick Start Examples</h2>
  
  <div class="code-example">
    <h4>Enhanced Template Workflow</h4>
    <pre><code># Multi-template execution with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Smart session automation - prompts once, remembers choice
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"</code></pre>
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

**Repository**: [CheckIT (Private)](https://github.com/nyantoasty/CheckIT) | **License**: MIT | **Maintained by**: IT Department | **Status**: Production Ready v1.3.0