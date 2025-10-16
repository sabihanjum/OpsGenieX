import google.generativeai as genai
from typing import Dict, Any
import json

from app.core.config import settings


class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)

    async def analyze_alert(self, title: str, description: str) -> Dict[str, Any]:
        """Analyze alert using AI for classification and prioritization"""
        try:
            prompt = f"""
            You are an IT operations expert specializing in alert analysis.
            
            Analyze the following IT alert and provide:
            1. Priority score (0-100, where 100 is most critical)
            2. Classification category (network, security, performance, hardware, software)
            3. Suggested action

            Alert Title: {title}
            Alert Description: {description}

            Respond in JSON format:
            {{
                "priority_score": <number>,
                "classification": "<category>",
                "suggested_action": "<action>"
            }}
            """

            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=settings.GEMINI_MAX_TOKENS,
                    temperature=settings.GEMINI_TEMPERATURE,
                )
            )

            # Extract JSON from response
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:-3]
            elif response_text.startswith("```"):
                response_text = response_text[3:-3]
            
            result = json.loads(response_text)
            return result

        except Exception as e:
            # Fallback to basic analysis if AI fails
            return {
                "priority_score": self._calculate_basic_priority(title, description),
                "classification": "general",
                "suggested_action": "Manual review required"
            }

    def _calculate_basic_priority(self, title: str, description: str) -> int:
        """Basic priority calculation without AI"""
        priority = 30  # Base priority
        
        high_priority_keywords = ["critical", "down", "failed", "error", "security", "breach"]
        medium_priority_keywords = ["warning", "slow", "timeout", "degraded"]
        
        text = f"{title} {description}".lower()
        
        for keyword in high_priority_keywords:
            if keyword in text:
                priority += 25
        
        for keyword in medium_priority_keywords:
            if keyword in text:
                priority += 15
        
        return min(priority, 100)

    async def predict_issue_resolution(self, alert_data: Dict[str, Any]) -> Dict[str, Any]:
        """Predict issue resolution time and suggested actions"""
        try:
            prompt = f"""
            Based on the following alert data, predict the resolution time and provide recommended actions:
            
            Alert Data: {json.dumps(alert_data, indent=2)}
            
            Provide your analysis in JSON format:
            {{
                "estimated_resolution_time": "<time estimate>",
                "confidence": <0.0-1.0>,
                "recommended_actions": ["<action1>", "<action2>", "<action3>"]
            }}
            """

            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=settings.GEMINI_MAX_TOKENS,
                    temperature=settings.GEMINI_TEMPERATURE,
                )
            )

            response_text = response.text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:-3]
            elif response_text.startswith("```"):
                response_text = response_text[3:-3]
            
            result = json.loads(response_text)
            return result

        except Exception:
            return {
                "estimated_resolution_time": "Unknown",
                "confidence": 0.0,
                "recommended_actions": ["Manual investigation required"]
            }