import requests
import pytest
from tests.utils.auth_helpers import get_jwt_token
from tests.utils.config import BASE_URL
  

def test_get_user_by_token(auth_headers):
    response = requests.get(f"{BASE_URL}/auth/user", headers=auth_headers)
    assert response.status_code == 200
    assert "email" in response.json()