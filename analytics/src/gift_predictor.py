# 📦 gift_predictor.py — for making predictions based on user features
def predict_gifts(model_path, encoder_path, user_input_df):
    import joblib
    import pandas as pd

    # Load trained model and encoder
    model = joblib.load(model_path)
    encoder = joblib.load(encoder_path)

    # Select features used for training (e.g. group, gender, age, industry)
    X = user_input_df[['group', 'gender', 'age', 'industry']]

    # One-hot encode categorical features
    X_encoded = encoder.transform(X)

    # Predict gift probabilities
    predictions_proba = model.predict_proba(X_encoded)

    # Get top 3 gift predictions
    top_3_indices = predictions_proba.argsort(axis=1)[:, -3:][:, ::-1]  # top 3, sorted descending
    all_gift_labels = model.classes_  # all possible gift labels
    top_3_gifts = [[all_gift_labels[i] for i in row] for row in top_3_indices]

    return top_3_gifts


# Example usage
if __name__ == "__main__":
    import pandas as pd
    input_data = pd.DataFrame([
        {"group": "Wedding", "gender": "Female", "age": 30, "industry": "Art"}
    ])

    results = predict_gifts(
        model_path="analytics/models/wishlist_model.pkl",
        encoder_path="analytics/models/encoder.pkl",
        user_input_df=input_data
    )

    print("Top 3 gift predictions:", results[0])
