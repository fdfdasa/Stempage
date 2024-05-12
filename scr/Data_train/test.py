import os
import sys
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
import json
app = Flask(__name__)

# Lấy đường dẫn của thư mục hiện tại
current_dir = os.getcwd()
sys.stdout.reconfigure(encoding='utf-8')

# Đường dẫn đến các file cần thiết
tokenizer_path = os.path.join(current_dir, "scr\\Data_train\\tokenizer.pickle")
label_dict_path = os.path.join(current_dir, "scr\\Data_train\\label_dict.pickle")
model_path = os.path.join(current_dir, "scr\\Data_train\\math_problem_model.h5")
feedback_data_path = os.path.join(current_dir, "scr/Data_train/feedback_data.json")

# Load các thành phần cần thiết từ các file
with open(tokenizer_path, "rb") as f:
    tokenizer = pickle.load(f)

with open(label_dict_path, "rb") as f:
    label_dict = pickle.load(f)

model = load_model(model_path)

# Định nghĩa max_len (độ dài tối đa của sequence)
max_len = 244  # Giá trị này phải tương ứng với giá trị sử dụng khi train model
def load_feedback_data(feedback_data_path):
    try:
        with open(feedback_data_path, 'r') as f:
            feedback_data = json.load(f)
        return feedback_data
    except FileNotFoundError:
        # Log the error and create an empty file or return an empty list as needed
        print(f"File not found: {feedback_data_path}. Creating a new file.")
        with open(feedback_data_path, 'w') as f:
            json.dump([], f)
        return []


@app.route('/retrain_model', methods=['POST'])
def retrain_model():
    try:
        feedback_data = json.load(open(feedback_data_path))
    except FileNotFoundError:
        print(f"Feedback file not found. Creating a new one at {feedback_data_path}.")
        feedback_data = []
        with open(feedback_data_path, 'w') as f:
            json.dump(feedback_data, f)

    problems = [item['problem'] for item in feedback_data]
    labels = [1 if item['isCorrect'] else 0 for item in feedback_data]

    sequences = tokenizer.texts_to_sequences(problems)
    X = pad_sequences(sequences, maxlen=max_len)
    y = np.array(labels)

    model.fit(X, y, epochs=1, verbose=1)
    model.save(model_path)
    return jsonify({"message": "Model retrained successfully"})

@app.route('/generate_exercises', methods=['POST'])
def generate_exercises():
    data = request.get_json(force=True)
    exercise_type = data['problems'][0]['type']
    quantity = data['problems'][0]['quantity']

    # Xử lý tạo bài tập tại đây và trả lời
    


    # Giả sử bạn trả lời ngay sau khi nhận được yêu cầu
    response_message = f"Bạn cần tạo {quantity} bài của dạng {exercise_type}. Chờ tôi chút nhé, sẽ có ngay thôi."
    return jsonify({"message": response_message})



@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    problems = data['problems']
    sequences = tokenizer.texts_to_sequences(problems)
    X = pad_sequences(sequences, maxlen=max_len)
    predictions_proba = model.predict(X)
    predicted_labels = np.argmax(predictions_proba, axis=1)

    results = []
    for problem, prediction in zip(problems, predicted_labels):
        predicted_label_name = [name for name, label in label_dict.items() if label == prediction][0]
        results.append({"problem": problem, "predicted_label": predicted_label_name})

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Chạy ứng dụng Flask trên port 5000
