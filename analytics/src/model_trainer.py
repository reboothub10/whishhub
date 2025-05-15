import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

def train_model(data_path="analytics/data/wishlist_sample.csv"):
    # 1. import to dataframe
    df = pd.read_csv(data_path)
    
    # 2. select fiture and target
    X = df[["gift"]]
    y = df["group"]

    # 3. One-hot encoding для подарунків
    encoder = OneHotEncoder(sparse_output=False)
    X_encoded = encoder.fit_transform(X)

    # 4. train / test split
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y, test_size=0.2, random_state=42
    )

    # 5. Train model
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)

    # 6. Predict
    y_pred = model.predict(X_test)

    # 7. accuracy
    print("🎯 Accuracy:", accuracy_score(y_test, y_pred))
    print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

if __name__ == "__main__":
    train_model()