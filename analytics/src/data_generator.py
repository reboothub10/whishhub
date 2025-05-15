import pandas as pd
import random
from faker import Faker
import os

def generate_wishlist_dataset(num_users=100, output_file="analytics/data/wishlist_sample.csv"):
    fake = Faker()

    event_groups = ["Birthday", "Wedding", "Graduation"]
    gift_ideas = [
        "Wireless Headphones", "Smart Watch", "Cookbook", "Yoga Mat", 
        "Board Game", "Wine Glass Set", "Bluetooth Speaker", "Gift Card", 
        "Indoor Plant", "Photo Frame"
    ]

    data = []
    for user_id in range(1, num_users + 1):
        full_name = fake.name()
        group = random.choice(event_groups)
        gift = random.choice(gift_ideas)
        link = f"https://fakeshop.com/product/{gift.replace(' ', '_').lower()}"
        data.append({
            "user_id": user_id,
            "user_name": full_name,
            "group": group,
            "gift": gift,
            "link": link
        })

    df = pd.DataFrame(data)
    
    # Створити директорію, якщо не існує
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    df.to_csv(output_file, index=False)
    print(f"✅ Dataset with {num_users} users saved to: {output_file}")

if __name__ == "__main__":
    generate_wishlist_dataset()