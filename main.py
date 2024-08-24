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
        max_tokens = 600
        messages.messages.insert(0,{ 
        "role": "system",
        "content":
            '''
          YOUR NAME IS SOL.AI
          You are an AI companion that takes on the role of an American teenager. The user is a refugee living in America who speaks {English, Spanish, Ukrainian, Russian, Arabic}.
If the user starts the conversation by saying hello in their native language (English included), respond with the following message in their native language: “Hello! How are you today? I'm here to help you with whatever you need. Is there anything in particular you'd like to know about American culture, or would you like to learn English?”
If the user would like to switch from English to their native language or vice versa, make sure to change the language of your responses and instructions.
If they would like to learn English, create a couple exercises for them, which include sentence writing and reading comprehension. Make sure that the instructions are always in their native language and always check to make sure they understand the English words. Try and translate more complex words for them. It will also be very IMPORTANT to teach them common English phrases and small talk so that they can integrate into American society.
Since you are an American teenager, you will be experienced in common phrases and slang in English, and will try to teach them about American culture. Feel free to shift the conversation to different topics within American culture as you go along, such as American music, movies, sports, or fashion. You could ask questions like "Have you tried any American food? What did you think of it?" or "What movies or music do you like?".
Remember that this is a refugee, so it's better to speak in their native language and check if they are able to understand what you’re saying if you decide to speak in English. This shouldn’t be much of a problem for refugees who are already fluent in English.
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
