# OpsGenieX - AI-Powered IT Operations Automation Platform

## Overview
OpsGenieX is an AI-powered automation platform designed to enhance operational efficiency for Managed Service Providers (MSPs) and IT teams. It streamlines core IT tasks such as patch management, alert triaging, and routine administrative workflows.

## Key Features
- 🤖 AI-driven alert prioritization
- 🔄 Automated patch deployment
- 🛠️ Custom workflow builder
- 📊 Real-time dashboards
- 🔮 Predictive issue detection
- 🔗 ITSM tool integrations
- 📱 Mobile access (future scope)
- ✅ Compliance monitoring

## Technology Stack

### Frontend
- **React.js** - Dynamic dashboard UI
- **Tailwind CSS** - Modern utility-first styling

### Backend
- **Python (FastAPI)** - High-performance API framework
- **Celery** - Asynchronous task processing

### Database & Storage
- **PostgreSQL** - Structured data storage
- **Redis** - Caching and session management

### AI/ML & Automation
- **Google Gemini AI** - Natural language processing and intelligent analysis
- **Flexible ML Backend** - Choose from:
  - Local ML (scikit-learn) - Default, no cloud dependencies
  - Azure Machine Learning - Enterprise-grade ML platform
  - AWS SageMaker - Alternative cloud ML option

### DevOps & Deployment
- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **GitHub Actions** - CI/CD pipeline

### Integrations
- **ServiceNow** - ITSM ticketing
- **SCCM/JAMF** - Patch management
- **Prometheus + Grafana** - Monitoring

## Quick Start

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Set up environment variables
4. Run the development server: `uvicorn app.main:app --reload`

## Project Structure
```
opsgenieX/
├── frontend/          # React.js dashboard
├── backend/           # FastAPI application
├── ml/               # AI/ML models and services
├── integrations/     # Third-party integrations
├── docker/           # Docker configurations
├── k8s/             # Kubernetes manifests
└── docs/            # Documentation
```

## License
MIT License