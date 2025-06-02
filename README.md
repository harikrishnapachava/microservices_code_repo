
# Microservices Code Repository

This repository contains a basic microservices setup with two main components:

1. **Node.js Backend API (`nodeapp/`)**
2. **React.js Frontend Application (`reactapp/`)**

Both services are containerized using Docker and integrated with GitHub Actions for CI/CD automation.

---

## Project Structure

```
microservices_code_repo/
├── nodeapp/               # Node.js backend service
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── reactapp/              # React frontend application
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── .github/workflows/     # GitHub Actions CI/CD pipelines
    ├── nodeapp_cicd.yaml
    └── reactapp_cicd.yaml
```

---

##  Getting Started

### Prerequisites

- Docker installed
- Node.js & npm (if running locally without Docker)
- GitHub account for CI/CD integration

### Running Locally

#### Node.js Backend

```bash
cd nodeapp
npm install
npm start
```

Or using Docker:

```bash
docker build -t nodeapp ./nodeapp
docker run -p 3000:3000 nodeapp
```

#### React Frontend

```bash
cd reactapp
npm install
npm start
```

Or using Docker:

```bash
docker build -t reactapp ./reactapp
docker run -p 3001:3000 reactapp
```

---

## 🔁 CI/CD Pipeline

This project uses **GitHub Actions** to automatically:

- Lint and test code
- Build Docker images
- Push to a container registry 
- Updates the image tags in the github repo https://github.com/harikrishnapachava/k8s_manifests_repo.git

You can find the workflow definitions in `.github/workflows/`.

### Required Secrets

The github workflows requires the following GitHub secrets:

- `TOKEN` - Github token to clone and push changes to the repository https://github.com/harikrishnapachava/k8s_manifests_repo.git
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

---

## Contributing

Contributions are welcome! Please submit pull requests to the repository: https://github.com/harikrishnapachava/microservices_code_repo