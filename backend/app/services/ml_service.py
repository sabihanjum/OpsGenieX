from typing import Dict, Any, Optional
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import os

from app.core.config import settings


class MLService:
    """Machine Learning service with multiple backend options"""
    
    def __init__(self):
        self.model = None
        self.scaler = None
        self.is_trained = False
        
        if settings.LOCAL_ML_ENABLED:
            self._init_local_ml()
        elif settings.AZURE_ML_ENABLED:
            self._init_azure_ml()
    
    def _init_local_ml(self):
        """Initialize local ML models"""
        try:
            model_path = os.path.join(settings.ML_MODEL_PATH, "alert_classifier.joblib")
            scaler_path = os.path.join(settings.ML_MODEL_PATH, "scaler.joblib")
            
            if os.path.exists(model_path) and os.path.exists(scaler_path):
                self.model = joblib.load(model_path)
                self.scaler = joblib.load(scaler_path)
                self.is_trained = True
            else:
                # Create and train a basic model
                self._create_basic_model()
        except Exception as e:
            print(f"Failed to initialize local ML: {e}")
            self._create_basic_model()
    
    def _init_azure_ml(self):
        """Initialize Azure ML (optional)"""
        try:
            # This would connect to Azure ML workspace
            # For now, fallback to local ML
            print("Azure ML not implemented yet, falling back to local ML")
            self._init_local_ml()
        except Exception as e:
            print(f"Failed to initialize Azure ML: {e}")
            self._init_local_ml()
    
    def _create_basic_model(self):
        """Create a basic trained model for demonstration"""
        # Create a simple model with dummy training data
        self.model = RandomForestClassifier(n_estimators=10, random_state=42)
        self.scaler = StandardScaler()
        
        # Dummy training data (in production, this would come from historical alerts)
        X_dummy = np.random.rand(100, 5)  # 5 features
        y_dummy = np.random.randint(0, 4, 100)  # 4 severity classes
        
        X_scaled = self.scaler.fit_transform(X_dummy)
        self.model.fit(X_scaled, y_dummy)
        self.is_trained = True
        
        # Save the model
        os.makedirs(settings.ML_MODEL_PATH, exist_ok=True)
        joblib.dump(self.model, os.path.join(settings.ML_MODEL_PATH, "alert_classifier.joblib"))
        joblib.dump(self.scaler, os.path.join(settings.ML_MODEL_PATH, "scaler.joblib"))
    
    def predict_alert_severity(self, alert_features: Dict[str, Any]) -> Dict[str, Any]:
        """Predict alert severity using ML model"""
        if not self.is_trained:
            return {"severity": "medium", "confidence": 0.5, "method": "fallback"}
        
        try:
            # Extract features from alert data
            features = self._extract_features(alert_features)
            features_scaled = self.scaler.transform([features])
            
            # Make prediction
            prediction = self.model.predict(features_scaled)[0]
            probabilities = self.model.predict_proba(features_scaled)[0]
            confidence = max(probabilities)
            
            severity_map = {0: "low", 1: "medium", 2: "high", 3: "critical"}
            
            return {
                "severity": severity_map.get(prediction, "medium"),
                "confidence": float(confidence),
                "method": "ml_model"
            }
        
        except Exception as e:
            print(f"ML prediction failed: {e}")
            return {"severity": "medium", "confidence": 0.5, "method": "fallback"}
    
    def _extract_features(self, alert_data: Dict[str, Any]) -> list:
        """Extract numerical features from alert data"""
        # Simple feature extraction (in production, this would be more sophisticated)
        title = alert_data.get("title", "")
        description = alert_data.get("description", "")
        
        features = [
            len(title),  # Title length
            len(description),  # Description length
            1 if "critical" in title.lower() else 0,  # Critical keyword
            1 if "error" in title.lower() else 0,  # Error keyword
            1 if "down" in title.lower() else 0,  # Down keyword
        ]
        
        return features
    
    def train_model(self, training_data: list) -> Dict[str, Any]:
        """Train the model with new data"""
        try:
            if not training_data:
                return {"success": False, "message": "No training data provided"}
            
            # Extract features and labels from training data
            X = []
            y = []
            
            for item in training_data:
                features = self._extract_features(item)
                severity_map = {"low": 0, "medium": 1, "high": 2, "critical": 3}
                label = severity_map.get(item.get("severity", "medium"), 1)
                
                X.append(features)
                y.append(label)
            
            X = np.array(X)
            y = np.array(y)
            
            # Train the model
            X_scaled = self.scaler.fit_transform(X)
            self.model.fit(X_scaled, y)
            self.is_trained = True
            
            # Save the updated model
            os.makedirs(settings.ML_MODEL_PATH, exist_ok=True)
            joblib.dump(self.model, os.path.join(settings.ML_MODEL_PATH, "alert_classifier.joblib"))
            joblib.dump(self.scaler, os.path.join(settings.ML_MODEL_PATH, "scaler.joblib"))
            
            return {"success": True, "message": f"Model trained with {len(training_data)} samples"}
        
        except Exception as e:
            return {"success": False, "message": f"Training failed: {str(e)}"}