import requests

def get_auth_token():
    response = requests.post("http://localhost:5000/api/auth/login", json={
        "email": "admin@example.com",
        "password": "password"
    })
    return response.json().get("token")