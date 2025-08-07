import React, { useState } from 'react';
import './SetupSection.css';

const SetupSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const mcpConfig = `{
  "mcpServers": {
    "northwind-database": {
      "url": "https://datamcp.io/mcp",
      "headers": {
        "connectionstring": "postgresql://readonly_user:readonly@northwind.datamcp.io:5432/northwind"
      }
    }
  }
}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mcpConfig);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="setup-section">
      <div className="container">
        <div className="setup-content">
          <h2 className="setup-title">Quick Setup for Cursor</h2>
          <p className="setup-description">
            Add this configuration to your <code>~/.cursor/mcp.json</code> file to start using DataMCP with Cursor IDE
          </p>
          
          <div className="config-container">
            <div className="config-header">
              <span className="config-filename">~/.cursor/mcp.json</span>
              <button 
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <>
                    <span className="check-icon">✓</span>
                    Copied!
                  </>
                ) : (
                  <>
                    <span className="copy-icon">📋</span>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="config-code">
              <code>{mcpConfig}</code>
            </pre>
          </div>

          <div className="setup-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Configure Connection</h3>
                <p>Replace the connection string with your actual database credentials</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Restart Cursor</h3>
                <p>Restart Cursor IDE to load the new MCP configuration</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Start Querying</h3>
                <p>Use natural language to query your database directly in Cursor</p>
              </div>
            </div>
          </div>

          <div className="connection-examples">
            <h3>Supported Connection Strings</h3>
            <div className="examples-grid">
              <div className="example">
                <strong>PostgreSQL</strong>
                <code>postgresql://user:pass@host:port/db</code>
              </div>
              <div className="example">
                <strong>MySQL</strong>
                <code>mysql://user:pass@host:port/db</code>
              </div>
              <div className="example">
                <strong>SQL Server</strong>
                <code>mssql://user:pass@host:port/db</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupSection;