from fastapi import FastAPI
from models import MsgPayload
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import yt_dlp
from faster_whisper import WhisperModel
import os

app = FastAPI()
messages_list: dict[int, MsgPayload] = {}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Hello"}


# About page route
@app.get("/about")
def about() -> dict[str, str]:
    return {"message": "This is the about page."}


# Route to add a message
@app.post("/messages/{msg_name}/")
def add_msg(msg_name: str) -> dict[str, MsgPayload]:
    # Generate an ID for the item based on the highest ID in the messages_list
    msg_id = max(messages_list.keys()) + 1 if messages_list else 0
    messages_list[msg_id] = MsgPayload(msg_id=msg_id, msg_name=msg_name)

    return {"message": messages_list[msg_id]}


# Route to list all messages
@app.get("/messages")
def message_items() -> dict[str, dict[int, MsgPayload]]:
    return {"messages:": messages_list}

# ...existing code...


@app.post("/transcribe-youtube")
async def transcribe_youtube(request: Request):
    data = await request.json()
    url = data.get("url")

    # Download audio from YouTube
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': 'audio.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        audio_file = ydl.prepare_filename(info)
        audio_file = os.path.splitext(audio_file)[0] + ".wav"

    # Transcribe audio
    model = WhisperModel("base")
    segments, info = model.transcribe(audio_file)
    transcript = " ".join([segment.text for segment in segments])

    # Optionally, clean up the audio file
    os.remove(audio_file)

    return {"transcript": transcript}