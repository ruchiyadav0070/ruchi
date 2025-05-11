import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download necessary resources
nltk.download('vader_lexicon')

# Sample social media texts
texts = [
    "I love the new features in this product!",
    "This is the worst service ever.",
    "It's okay, not too bad but not great either.",
]

# Initialize Sentiment Intensity Analyzer
sia = SentimentIntensityAnalyzer()

# Analyze and print sentiment for each text
for text in texts:
    score = sia.polarity_scores(text)
    sentiment = "Positive" if score['compound'] > 0 else "Negative" if score['compound'] < 0 else "Neutral"
    print(f"Text: {text}")
    print(f"Sentiment Score: {score}")
    print(f"Overall Sentiment: {sentiment}\n")
