export async function getTranscript(youtubeUrl: string): Promise<any> {
  const response = await fetch('http://localhost:8000/transcribe-youtube', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: youtubeUrl }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch transcript');
  }
  return response.json();
}