from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere
from dotenv import load_dotenv
import os

load_dotenv()
client = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str
    history: list = []

@app.post("/chat")
async def chat(body: Message):
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    messages += body.history
    messages.append({"role": "user", "content": body.message})

    response = client.chat(
        model="command-r-08-2024",
        messages=messages
    )
    return {"reply": response.message.content[0].text}
	