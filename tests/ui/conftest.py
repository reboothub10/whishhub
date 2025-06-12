import pytest
from playwright.sync_api import Page

BASE_URL = "https://whishhub.up.railway.app"

@pytest.fixture(scope="function")
def login(page: Page):
    page.goto(f"{BASE_URL}/login")
    page.locator("input[name=email]").fill("testuser@example.com")
    page.locator("input[name=password]").fill("password123")
    page.locator("button[type=submit]").click()
    page.wait_for_url(f"{BASE_URL}/wishlist")
    return page