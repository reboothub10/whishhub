import pytest
import requests

BASE_URL = "http://localhost:5000"  # або заміни, якщо інший порт

@pytest.fixture
def auth_token():
    login_data = {
        "email": "testuser@example.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
    assert response.status_code == 200
    return response.json()["token"]

def test_get_user_by_token(auth_token):
    headers = {
        "Authorization": f"Bearer {auth_token}"
    }
    response = requests.get(f"{BASE_URL}/api/auth/user", headers=headers)

    assert response.status_code == 200
    data = response.json()

    assert data["success"] == "true"
    assert "user" in data
    assert "email" in data["user"]
    assert "name" in data["user"]
    assert "gender" in data["user"]