
# 🎟️ Ticketing App – Microservices Project

A **microservices-based ticketing system** built with **Node.js, TypeScript, NATS Streaming, Docker, Kubernetes, and MongoDB**.  
This project is inspired by real-world event-ticketing platforms and demonstrates concepts like **event-driven architecture, asynchronous communication, and service isolation**.

---

## 📌 Features

- **Microservices Architecture** – each service handles a single responsibility:
  - **Auth Service** – user registration & login.
  - **Tickets Service** – ticket creation & management.
  - **Orders Service** – order placement & status tracking.
  - **Expiration Service** – cancels orders after a time window.
  - **Payments Service** – handles order payments.
- **Event Bus with NATS** – ensures services communicate asynchronously.
- **MongoDB** with Mongoose for data persistence.
- **Dockerized Services** – each service runs in a container.
- **Kubernetes Orchestration** – deployment and scaling.
- **Automated Testing** with **Jest** for events, models, and listeners.
- **CI/CD Ready** – designed for containerized builds and cloud deployment.

---

## 🏗️ Architecture

```plaintext
          +-------------+         +------------+
          |   Client    | <-----> |   Ingress  |
          +-------------+         +------------+
                 |                       |
      +----------+----------+------------+-------------+
      |                     |                          |
+------------+       +-------------+           +--------------+
|  Auth Svc  |       |  Tickets    |           |   Orders     |
+------------+       +-------------+           +--------------+
                          |                           |
                          v                           v
                   +-------------+             +--------------+
                   | Expiration  |             |  Payments    |
                   +-------------+             +--------------+

               <--- Event Bus (NATS Streaming) --->
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Kubernetes](https://kubernetes.io/) (via Docker Desktop, minikube, or k3d)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed
- [skaffold](https://skaffold.dev/) (optional, for local dev workflow)

---

### 2️⃣ Installation

Clone repository:

\`\`\`bash
git clone https://github.com/<your-username>/ticketing-app.git
cd ticketing-app
\`\`\`

Install dependencies for each service (example for **tickets service**):

\`\`\`bash
cd tickets
npm install
\`\`\`

---

### 3️⃣ Running with Docker

Build and run a service (example: tickets):

\`\`\`bash
docker build -t your-dockerhub-username/tickets .
docker run -p 3000:3000 your-dockerhub-username/tickets
\`\`\`

---

### 4️⃣ Running with Kubernetes

Deploy services:

\`\`\`bash
kubectl apply -f infra/k8s
\`\`\`

Check pods:

\`\`\`bash
kubectl get pods
\`\`\`

Exec into Mongo pod:

\`\`\`bash
kubectl exec -it orders-mongo-deployment-XXXXX -- mongo
\`\`\`

---

## 🧪 Testing

Each service has **unit tests** with Jest.

Example (Tickets service):

\`\`\`bash
cd tickets
npm test
\`\`\`

Tests cover:
- Model validations
- Event publishing
- Listener acknowledgment (\`msg.ack()\`)
- Service-to-service integration

---

## 🛠️ Example Dockerfile

All services follow a similar structure:

\`\`\`dockerfile
FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]
\`\`\`

👉 We \`COPY package.json\` first to optimize Docker build caching  
👉 Then copy the rest of the source code  

---

## 📚 Developer Notes

- **NATS Event Handling**  
  Every listener receives:
  - \`data\`: event payload
  - \`msg\`: message object with \`ack()\`  
  We manually create \`msg\` in tests to mock \`ack()\` and assert correct handling.

- **Expiration Service**  
  Uses **asynchronous order creation events**. If order expires, it emits an event → \`OrderCancelled\` → updates across services.

- **Versioning**  
  Uses \`mongoose-update-if-current\` plugin for optimistic concurrency control (OCC).

- **Common Module**  
  Shared logic (errors, middlewares, event definitions) is extracted into \`@ticketing/common\`.

---

## 🔮 Roadmap

- [ ] Add CI/CD with GitHub Actions  
- [ ] Deploy to cloud (GCP/AWS)  
- [ ] Add frontend client with Next.js  
- [ ] Implement payments with Stripe  
