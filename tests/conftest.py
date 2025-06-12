import pytest
from tests.utils.auth_helpers import get_jwt_token, register_test_user

@pytest.fixture(scope="session", autouse=True)
def ensure_test_user_exists():
    register_test_user()  

@pytest.fixture
def auth_headers():
    return {
        "Authorization": f"Bearer {get_jwt_token()}"
    }