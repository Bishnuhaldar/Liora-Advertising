from flask import Flask, render_template, request, jsonify
import yfinance as yf
import requests
from bs4 import BeautifulSoup
import numpy as np
from sklearn.linear_model import LinearRegression
import google.generativeai as genai
import streamlit as st
import json
import boto3
import os
import google.generativeai as genai

genai.configure(api_key='AIzaSyCw2EGbX55HV5PcqVVjS2LV0nXi8awGEEQ')
model=genai.GenerativeModel("gemini-1.5-flash")


app = Flask(__name__)

# Initialize boto3 client with AWS credentials
def initialize_aws_client():
    return boto3.client(
        'bedrock-runtime',  # Assuming you're using AWS Bedrock Gen AI service
        region_name='us-east-1',
        # Use environment variables or other secure methods for credentials
        aws_access_key_id= "ASIAQYEI4V7EDR6DIMUX",
        aws_secret_access_key="EQRGFOrklEvNTQ8eoMpY+le7+CHZpoaMtatpQV7e",
        aws_session_token="IQoJb3JpZ2luX2VjEB0aCXVzLWVhc3QtMSJHMEUCIQCnGCrNvaE12kira4pK7kMrkDoUR8x6IIZ1XLQvVm+XOQIgYcXUYDIBi5ji4PowL2TVaBSor5WR0Zdrajlxnz3P2lYqlAMIZhAAGgwwNTE4MjY3MDAyMzIiDLFmlhiXjVS0HTESbCrxAtA24BVHwMFQH0eJO+p02smzGgPKbSRG1p7gUTNtoyUIxIRJbnmBQdl8HMi5eUG27E9RzW7hDQSDoAmFeglhOTRo69HcDiTyR1QiT1KvzmiLaOdOe/XXsLrjwI5FRywb7vSnGm5MgNIPYwD3pEfmw2XWHoSo39blK56BLWcFCFBDQDfKB4UjaVJj293E2MF1wGB+SJ1xeVRYYJX0wtT9d5qWynIYrz1GtTLETbFxEX9+X/vFY73szY7TLXPZx4Kew7smbG51NduK75bIoLXfAFRoK0rEJIz1tBNPXf4cF2Qqit/kZqHrDZKczw1yKWz1QSqn7gtozIFWd7kkk4BybL0F4s3nrv8tmSJezVt8tSt/apgFwBVuah9OIDYupylHtwNa65YruuQAcNcu3l1s0897XXmoH5GrDES5WQBNC2sUfKoz9vD49X2EnolQGXZlrM+Rm7wkYY21YwO9hQTei+nFwaGDA/gxRp3Ug6qAuWwevzCY9ua3BjqmAawM1QINLW/F39bjXqNN6lAfkQg7B00Q2ixvgFf8bY532YkR96fmVqISxSGyaRAd/2CDCrGDzfSlrw2t0t4J0/3KUmakN1pHjh5sQFxtzRCHbNWPHwMPhpsQV1M203HnNbbEW3YgPsVcMLSt7lxpnAQOor7wLZ3ZbGrBDtcyFfcPENA3ntctsrWy0XXndTLehNfH33HUUMQxMFzbeVfAOLrG+I2Uj+Q="
    )
 
# # Call the Generative AI model
# def gen_response(prompt):
#     client = initialize_aws_client()
#     model_name = "anthropic.claude-v2:1"
   
#     # Ensure the prompt starts with "Human:" as required by the Claude model
#     formatted_prompt = f"Human: {prompt}\n\nAssistant:"
 
#     # Define the correct payload structure for the model
#     body_content = json.dumps({
#         "prompt": formatted_prompt,
#         "max_tokens_to_sample": 300,
#         "temperature": 0.5,
#         "top_k": 250,
#         "top_p": 1,
#         "anthropic_version": "bedrock-2023-05-31"
#     })
   
#     try:
#         # Invoke the model with properly formatted content
#         response = client.invoke_model(
#             modelId=model_name,
#             contentType="application/json",
#             accept="application/json",
#             body=body_content
#         )
       
#         # Read and decode the response
#         result = response['body'].read().decode('utf-8')
#         result_json = json.loads(result)
       
#         # Extract 'completion' field from the result
#         final_result = result_json.get('completion', 'No completion found')
   
#     except Exception as e:
#         final_result = f"Error: {str(e)}"
   
#     return final_result

def gen_response(prompt):
    response=model.generate_content(prompt)
    return response.text

 #Fetch stock data from Yahoo Finance
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")
    
    # Check if the 'Close' column is not empty
    if hist.empty or 'Close' not in hist.columns:
        return None  # Return None if no data is available
    
    return hist




def get_news(query):
    news=f"news of stock-{query}"
    url = f'https://newsapi.org/v2/everything?q={news}&from=2024-09-26&sortBy=publishedAt&apiKey=e1df7a803bfd4fbe8cd66bd59b0c24e2'
    response = requests.get(url)
    articles = response.json().get('articles', [])
    headlines = [article['title'] for article in articles]
    return headlines[:5] 

# Stock price prediction using linear regression
def predict_stock_trend(data):
    data['Days'] = np.arange(len(data))
    X = np.array(data['Days']).reshape(-1, 1)
    y = np.array(data['Close']).reshape(-1, 1)
    model = LinearRegression()
    model.fit(X, y)
    prediction = model.predict(np.array([[len(data) + 1]]))
    return prediction[0][0]

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    # Fetching JSON data from the request
    data = request.get_json()
    
    query = data.get('query')
    ticker = data.get('ticker')
    
    if not query or not ticker:
        return jsonify({"error": "Both query and ticker are required"}), 400

    # Fetch stock data
    stock_data = get_stock_data(ticker)
    if stock_data is None or stock_data.empty:
        return jsonify({"error": "No stock data available for the ticker"}), 404
    
    stock_data_json = stock_data.reset_index().to_dict(orient='records')

    # Make sure there are enough rows to calculate stock price and prediction
    stock_price = stock_data['Close'].iloc[-1]
    prediction = predict_stock_trend(stock_data)

    # Fetch news
    news = get_news(ticker)

    # Generate AI insights
    prompt = f"""Generate market insights(in short) based on the following. company={ticker},
    ##### here is the stock data of last one moneth{stock_data}...    
    use heading in ** ** and bullet points * 
    in last add heading called news sentiment and give a 1 line(very short) sentiment conlusion of top news of this stock.
    here is the top 5 news-{news}.
    after everything add heading respose to your query. and answer user query(in very short).
    here is user query{query}"""
    insights = gen_response(prompt)

    # Create response object
    stock_data= stock_data.to_dict(orient='records')
    response = {
        "stock_price": float(stock_price),  # Ensure it's a serializable number
        "predicted_price": float(prediction),  # Ensure it's a serializable number
        "news": news,
        "sentiment": {"positive": 5, "negative": 3},  # Placeholder for sentiment analysis
        "insights": insights,
        "stock_data":stock_data_json
    }

    return jsonify(response)


@app.route('/chatbot')
def home1():
    return render_template('chatbot.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    prompt=f'act as financial expert in share market and investing. answer the user query in very short(under 1 line). here is the user query--{user_message}. #######dont add any additional comment. just answer user query'
    ai_response = gen_response(prompt)
    return jsonify({'response': ai_response})


if __name__ == '__main__':
    app.run(debug=True)
