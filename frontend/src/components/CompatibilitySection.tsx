import React from 'react';
import './CompatibilitySection.css';

const CompatibilitySection: React.FC = () => {
  const aiTools = [
    {
      name: 'Claude',
      description: 'Anthropic\'s AI Assistant',
      icon: '🤖'
    },
    {
      name: 'Cursor',
      description: 'AI-powered Code Editor',
      icon: '📝'
    },
    {
      name: 'Windsurf',
      description: 'AI Development Environment',
      icon: '🏄'
    },
    {
      name: 'VSCode',
      description: 'Visual Studio Code',
      icon: '💻'
    },
    {
      name: 'Cline',
      description: 'AI Coding Assistant',
      icon: '🧠'
    },
    {
      name: 'Highlight AI',
      description: 'AI Code Analysis',
      icon: '✨'
    },
    {
      name: 'Augment Code',
      description: 'Code Enhancement AI',
      icon: '🚀'
    },
    {
      name: 'Msty AI',
      description: 'AI Development Tool',
      icon: '🎯'
    }
  ];

  return (
    <section className="compatibility-section">
      <div className="container">
        <h2 className="section-title">Compatible With</h2>
        <p className="section-subtitle">
          Works with all popular MCP-compatible AI tools
        </p>
        <div className="tools-grid">
          {aiTools.map((tool, index) => (
            <div key={index} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-description">{tool.description}</p>
            </div>
          ))}
        </div>
        <div className="mcp-badge">
          <div className="badge-content">
            <div className="badge-icon">🔗</div>
            <div className="badge-text">
              <h4>Model Context Protocol (MCP)</h4>
              <p>Built on the industry standard for AI tool integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompatibilitySection;