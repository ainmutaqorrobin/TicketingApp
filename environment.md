# 🔒 JWT Secret Configuration (Confidential)

> ⚠️ **CONFIDENTIAL FILE**  
> This file will not exposed to production or commit it to any public repository. Only for learning purpose

---

## 🎯 Purpose

Create a Kubernetes secret for the JWT key used in authentication services (e.g., in a microservices app like Auth).

---

## 🛠 Command to Create the Secret

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=roykacak
```
