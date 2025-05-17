# whishhub
A **WishHub - Shared Wishlist Service** designed for friends and family to simplify gift-giving for special occasions (like birthdays, holidays, etc.) and long term run



# Gift Recommendation System – Backend API & Data Science Overview

## 🎯 Purpose

This backend supports a gift recommendation system. It uses a machine learning model trained on synthetic data to suggest gift ideas based on user group context and demographics. Backend APIs manage user registration, group creation, and provide gift suggestions via model inference or popularity-based logic.

---

## 📊 Data Science Module

### Training Dataset Fields:
- `user_id` – numeric ID
- `user_name` – full name (for display only)
- `group` – the event type (e.g., "Birthday", "Wedding", "Graduation")
- `gift` – gift chosen (e.g., "Indoor Plant", "Smart Watch")
- `link` – product link
- `gender` – user gender
- `industry` – user's work field
- `age` – user age

### Features and Target:
- **Features**: group, gender, industry, age
- **Target**: gift

### Model:
- `LogisticRegression`
- `OneHotEncoder` for categorical features
- Trained in `model_trainer.py`
- Output: 
  - `wishlist_model.pkl` – trained model
  - `encoder.pkl` – fitted encoder

### Goal:
- Given a group and optional demographics, suggest top 3 predicted gifts.
- Alternatively, fallback to popular gifts for the selected group.

---

## 🧑‍💻 User Roles

| Role      | Description                                |
|-----------|--------------------------------------------|
| Admin     | Can view system-wide analytics             |
| Organizer | Creates a gift group and invites users     |
| User      | Joins groups and selects or receives gifts |

---

## 🔌 API Endpoints (proposed)

### 1. `POST /register`
Create a user.

**Request**
```json
{
  "name": "Oksana",
  "email": "oksana@example.com",
  "gender": "Female",
  "industry": "Tech",
  "age": 35
}
```

---

### 2. `POST /login`
Authenticate user (JWT or cookie-based).

---

### 3. `POST /groups`
Create a group.

**Request**
```json
{
  "group_name": "Petro's Wedding",
  "group_type": "Wedding"
}
```

---

### 4. `POST /groups/{id}/invite`
Invite users by email or ID.

---

### 5. `GET /groups/{id}/recommendations`
Return gift recommendations for the group.
Returns top 3 gifts using trained model.

**Response**
```json
{
  "group": "Wedding",
  "recommended_gifts": [
    {"gift": "Indoor Plant", "score": 0.32},
    {"gift": "Wine Glass Set", "score": 0.25},
    {"gift": "Smart Watch", "score": 0.21}
  ]
}
```

---

## 🗂️ Notes for Backend Integration

- Model files should be loaded once on app start.
- Use `joblib.load("wishlist_model.pkl")`
- Transform input features using saved `encoder.pkl`.
- Data passed to prediction must be preprocessed (OneHotEncoded).
- If no model match found, fallback to:
```sql
SELECT gift, COUNT(*) FROM historical_data WHERE group = 'Wedding' GROUP BY gift ORDER BY COUNT(*) DESC LIMIT 3;
```

---

## 🧪 Extras (Optional):
- `GET /groups/{id}/history` – previous user picks
- `DELETE /groups/{id}` – delete a group
- `POST /groups/{id}/submit-choice` – submit a chosen gift