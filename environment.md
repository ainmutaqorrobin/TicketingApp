# 🔒 JWT Secret Configuration (Confidential)

> ⚠️ **CONFIDENTIAL FILE**  
> Do not share this file or commit it to any public repository.

---

## 🎯 Purpose

Create a Kubernetes secret for the JWT key used in authentication services (e.g., in a microservices app like Auth).

---

## 🛠 Command to Create the Secret

```bash
kubectl create secret generic jwt-secret --from-literal=jwt=asdf
```
