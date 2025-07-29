import React, { useState } from 'react';
import { getTranscript } from '../api';

const TranscribeYouTube: React.FC = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTranscript(null);
    try {
      const result = await getTranscript(url);
      setTranscript(result.transcript || JSON.stringify(result));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>YouTube Video Transcription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          style={{ width: '300px' }}
        />
        <button type="submit" disabled={loading}>Transcribe</button>
      </form>
      {loading && <div className="spinner">Transcribing...</div>}
      {error && <p className="error">{error}</p>}
      {transcript && (
        <div>
          <h3>Transcript:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{transcript}</pre>
        </div>
      )}
    </div>
  );
};

export default TranscribeYouTube;