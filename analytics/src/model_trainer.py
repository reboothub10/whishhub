import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import os

def train_model(data_path="analytics/data/wishlist_sample.csv", model_dir="analytics/models/"):
    # 1. Завантаження
    df = pd.read_csv(data_path)

    X = df[["group", "gender", "age", "industry"]]
    y = df["gift"]

    # 2. Encoding
    encoder = OneHotEncoder(sparse_output=False)
    X_encoded = encoder.fit_transform(X)

    # 3. Спліт + навчання
    X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=300)
    model.fit(X_train, y_train)

    # 4. Оцінка
    y_pred = model.predict(X_test)
    #print("🎯 Accuracy:", accuracy_score(y_test, y_pred))
    #print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

    # 5. Збереження моделі й енкодера
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(model, os.path.join(model_dir, "wishlist_model.pkl"))
    joblib.dump(encoder, os.path.join(model_dir, "encoder.pkl"))
    #print("✅ Model and encoder saved to", model_dir)

if __name__ == "__main__":
    train_model()