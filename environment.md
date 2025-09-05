# 🌐 Kubernetes Environment Setup

---

## 🔒 JWT Secret Configuration (Confidential)

> ⚠️ **CONFIDENTIAL FILE**  
> This section contains sensitive information.  
> Do not expose to production or commit it to any public repository.  
> Only for **learning purposes**.

---

## 🎯 Purpose

Create a Kubernetes secret for the JWT key used in authentication services (e.g., in a microservices app like Auth).

---

## 🛠 Command to Create the Secret

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=roykacak
```

---

## 🚀 Install Ingress-NGINX Controller

To install the NGINX ingress controller (v1.13.2):

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.2/deploy/static/provider/cloud/deploy.yaml
```
