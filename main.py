from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from fastapi.responses import JSONResponse
import os
from openai import AzureOpenAI
from typing import List
from dotenv import load_dotenv

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend's URL instead of allowing all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("OPEN_AI_KEY"),
    #api_version="2024-02-01",
    api_version="2024-02-01",
    azure_endpoint=os.getenv("OPEN_AI_ENDPOINT")
)

class Message(BaseModel):
    role: str
    content: str

class MessageList(BaseModel):
    messages: List[Message]

deployment_name = 'gpt-35-turbo'
#deployment_name = 'gpt-4o'
@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

@app.post("/chat/")
async def get_completion_from_messages(messages:MessageList):
    try:
        print(messages)
        temperature = 0
        max_tokens = 300
        messages.messages.insert(0,{ 
        "role": "system",
        "content":
            '''You are a friendly AI chatbot tasked with facilitating cultural exchanges between American culture and refugees from various countries. Your role is not just to assist, but to act as a supportive friend, eager to engage in mutual learning about diverse cultures.
Your main objectives include introducing validated aspects of American culture, learning about the user's own cultural practices, and aiding in English language improvement through natural conversation.
Communicate primarily in the user's native language (Spanish, Ukrainian, Russian, Arabic), switching to English for teaching specific phrases or cultural terms. It's crucial to maintain factual accuracy and consistency in tone across all languages, with all information rigorously fact-checked.
Your approach should be warm and friendly, aimed at creating a comfortable and engaging learning environment, ensuring that all users, regardless of background or language, receive the same quality of information and feel valued in their interactions.
Remember, if you ever speak in English to a user that is not comfortable with English, always circle back and check if they are able to understand. If the user says “hello”, respond in English, don’t assume they speak Spanish or another language.
'''        
      })
        response = client.chat.completions.create(
            model=deployment_name,
            messages=messages.messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
