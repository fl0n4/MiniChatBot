from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="your_database_name"
)

@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.get_json()
    user_input = data.get('userInput')

    cursor = db.cursor(dictionary=True)
    query = "SELECT ai_response, action_to_perform FROM responses WHERE user_input = %s"
    cursor.execute(query, (user_input,))
    result = cursor.fetchone()

    if result:
        return jsonify(result)
    else:
        return jsonify({"ai_response": "I don't know how to respond to that.", "action_to_perform": None})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
