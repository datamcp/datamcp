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
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/ryObXPsdx8M"
            title="Data MCP Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;