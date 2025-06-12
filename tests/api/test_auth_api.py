import requests
import pytest
from tests.utils.auth_helpers import get_jwt_token
from tests.utils.config import BASE_URL

def test_login_success():
    response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_failure():
    response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "wrong@example.com",
        "password": "wrongpass"
    })
    assert response.status_code == 401