# Python (Flask)
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/synthesize', methods=['POST'])
def handle_request():
    data = request.json
    exercise_type = data['type']
    number_of_exercises = data['number']
    response = f"Bạn cần tạo {number_of_exercises} bài của dạng {exercise_type}, chờ tôi một chút nhé."
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5002)
