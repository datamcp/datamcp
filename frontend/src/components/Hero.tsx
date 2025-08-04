import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Data MCP</h1>
          <p className="hero-slogan">
            Seamlessly connect your databases to AI tools.
            <br />
            <span className="highlight">Secure, fast, and universally compatible</span>
            <br />
            with all MCP-enabled AI assistants.
          </p>
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <span>Secure Database Access</span>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <span>Lightning Fast Queries</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🔗</div>
              <span>Universal AI Compatibility</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;