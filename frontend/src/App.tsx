import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import CompatibilitySection from './components/CompatibilitySection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <VideoSection />
      <CompatibilitySection />
      <Footer />
    </div>
  );
}

export default App;