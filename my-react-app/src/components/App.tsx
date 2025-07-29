import React, { useState } from 'react';
import '../App.css';
import Login from './Login';

const transcriptTabs = [
  "YouTube Link",
  "YouTube Playlist Link",
  "Local Audio File",
  "Local Video File",
  "Live"
];

function TranscriptCard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="transcript-card">
      <div className="tabs">
        {transcriptTabs.map((tab, idx) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === idx ? ' active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 0 && <div>{/* YouTube Link form goes here */}YouTube Link Form</div>}
        {activeTab === 1 && <div>{/* YouTube Playlist form goes here */}YouTube Playlist Link Form</div>}
        {activeTab === 2 && <div>{/* Local Audio File upload goes here */}Local Audio File Upload</div>}
        {activeTab === 3 && <div>{/* Local Video File upload goes here */}Local Video File Upload</div>}
        {activeTab === 4 && <div>{/* Live transcription goes here */}Live Transcription</div>}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<'transcript' | 'voice' | null>('transcript');

  return (
    <div className="site-wrapper">
      <nav className="navbar">
        <div className="navbar-content">
          <img src="/logo.jpg" alt="EchoDraft Logo" className="logo" />
          <span className="brand">EchoDraft</span>
          <div className="nav-options">
            <button
              className={`nav-option${selectedOption === 'transcript' ? ' active' : ''}`}
              onClick={() => setSelectedOption('transcript')}
            >
              Transcript
            </button>
            <button
              className={`nav-option${selectedOption === 'voice' ? ' active' : ''}`}
              onClick={() => setSelectedOption('voice')}
            >
              Voice Generator
            </button>
          </div>
          {user && (
            <button className="logout-btn" onClick={() => setUser(null)}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <main className="main-content">
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <>
            <p className="welcome">Welcome, {user}!</p>
            {selectedOption === 'transcript' && <TranscriptCard />}
            {selectedOption === 'voice' && (
              <div className="voice-generator-card">
                {/* Voice Generator UI goes here */}
                Voice Generator Coming Soon!
              </div>
            )}
          </>
        )}
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} EchoDraft &mdash; Voice to Text Platform
      </footer>
    </div>
  );
}

export default App;