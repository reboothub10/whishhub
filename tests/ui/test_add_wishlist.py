from playwright.sync_api import expect

def test_recommendation_visible(login):
    login.locator("text=GRADUATION").click()
    expect(login.locator("text=Recommendations")).to_be_visible()