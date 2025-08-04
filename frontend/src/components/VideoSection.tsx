import React from 'react';
import './VideoSection.css';

const VideoSection: React.FC = () => {
  return (
    <section className="video-section">
      <div className="container">
        <h2 className="section-title">See Data MCP in Action</h2>
        <p className="section-subtitle">
          Watch how Data MCP seamlessly integrates with your favorite AI tools to provide instant database access
        </p>
        <div className="video-container">
          <div className="video-placeholder">
            <div className="play-button">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)"/>
                <path d="M32 25l24 15-24 15V25z" fill="#667eea"/>
              </svg>
            </div>
            <div className="video-text">
              <h3>Database Integration Demo</h3>
              <p>Coming Soon - Full Product Demo</p>
            </div>
          </div>
          {/* Uncomment when you have a YouTube video */}
          {/* 
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Data MCP Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          */}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;