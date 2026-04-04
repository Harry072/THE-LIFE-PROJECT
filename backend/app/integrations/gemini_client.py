import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from app.core.config import settings
import asyncio
from typing import Optional

class GeminiClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = "gemini-1.5-flash"
        self.is_configured = False
        
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(
                model_name=self.model_name,
                generation_config={
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "top_k": 64,
                    "max_output_tokens": 1024,
                },
                safety_settings={
                    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                }
            )
            self.is_configured = True

    async def generate_content(self, prompt: str, system_instruction: Optional[str] = None, retries: int = 3) -> Optional[str]:
        """
        Generates content with retry logic and error handling.
        """
        if not self.is_configured:
            return None

        for attempt in range(retries):
            try:
                full_prompt = f"{system_instruction}\n\n{prompt}" if system_instruction else prompt
                response = await asyncio.to_thread(self.model.generate_content, full_prompt)
                
                if response and response.text:
                    return response.text.strip()
                
            except Exception as e:
                if attempt == retries - 1:
                    print(f"Gemini API Error after {retries} attempts: {str(e)}")
                else:
                    await asyncio.sleep(1 * (attempt + 1))
        
        return None

gemini_client = GeminiClient()
