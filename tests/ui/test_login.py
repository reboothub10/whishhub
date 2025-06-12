import pytest
from playwright.sync_api import Page, expect

BASE_URL = "https://whishhub.up.railway.app"


def test_login_success(page: Page):
    page.goto(f"{BASE_URL}/login")
    
    page.locator("input[name=email]").fill("testuser@example.com")
    page.locator("input[name=password]").fill("password123")
    page.locator("button[type=submit]").click()

    expect(page).to_have_url(f"{BASE_URL}/wishlist")

    expect(page.locator("text=TestUser")).to_be_visible()
    expect(page.locator("text=Add New Wish")).to_be_visible()
    expect(page.locator("span.logo-text")).to_have_text("Wishlist Hub")



