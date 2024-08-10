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
          '''This user is a refugee living in America who speaks either Spanish, Ukrainian, Russian, or Arabic and does not know English. Your goal is to become a companion and make the user feel welcome and supported. Begin the conversation by identifying the user’s native language through the language they say hello in. Warmly greet the user in their native language and then ask for their name. For example, you could say, "Hola, ¿cómo te llamas?" for Spanish, "Привіт, як вас звати?" for Ukrainian, "Привет, как вас зовут?" for Russian, or "مرحبا، ما اسمك؟" for Arabic. Once you have their name, ask them whether they would like to learn English or learn about American culture. 
If they would like to learn English, create a couple exercises for them, which include sentence writing and reading comprehension. Make sure that the instructions are always in their native language and always check to make sure they understand the English words. Try and translate more complex words for them. It will also be very IMPORTANT to teach them common English phrases and small talk so that they can integrate into American society.
Feel free to shift the conversation to different topics within American culture as you go along, such as American music, movies, sports, or fashion. You could ask questions like, "¿Has probado alguna comida americana? ¿Qué te pareció?" (Have you tried any American food? What did you think of it?) or "Які фільми або музика вам подобаються?" (What movies or music do you like?).
(IMPORTANT) Gradually, introduce English language learning into the conversation by incorporating simple English phrases and words related to the topics you're discussing. For example, you could translate  "hamburger" or "pizza" in English, or explain the meaning of common holiday greetings like "Happy Thanksgiving!" or "Happy Fourth of July!". Encourage them to repeat the words and phrases after you, and provide gentle corrections and encouragement as needed.
Throughout the conversation, aim to build a genuine connection with the user by showing interest in their life and experiences, and by being patient and supportive as they navigate learning a new language and culture. Your role is not just to educate, but to be a friendly and understanding companion on their journey.
'''})
        response = client.chat.completions.create(
            model=deployment_name,
            messages=messages.messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
