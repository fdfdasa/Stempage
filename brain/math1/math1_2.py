import re
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, GlobalMaxPooling1D, Dense, Dropout
from sklearn.preprocessing import LabelEncoder

# Hàm để trích xuất thông tin về công thức từ văn bản câu hỏi
def extract_formula(text):
    match = re.search(r'y\s*=\s*(\d+(\.\d+)?)[ \t]*[*/+-][ \t]*(\w+)', text)
    if match:
        slope = float(match.group(1))
        variable = match.group(3)
        return slope, variable
    else:
        return None

# Hàm để trích xuất thông tin về chủ đề từ văn bản câu hỏi
def extract_topic_info(text):
    topic_info = {}
    matches = re.findall(r'([A-Z][^A-Z]+)', text)
    for match in matches:
        key_value = match.split(':')
        if len(key_value) == 2:
            key = key_value[0].strip().lower().replace(' ', '_')
            value = key_value[1].strip()
            topic_info[key] = value
    return topic_info

# Hàm chuyển đổi thông tin chủ đề thành định dạng chuẩn
def convert_to_standard_format(topic_info):
    standard_format = {
        'topic': topic_info.get('topic', ''),
        'start_year': int(topic_info.get('start_year', 0)),
        'end_year': int(topic_info.get('end_year', 0)),
        'operator': topic_info.get('operator', ''),
        'formula_variables': tuple(topic_info.get('formula_variables', '').split()),
        'initial_value': float(topic_info.get('initial_value', 0)),
        'final_value': None  # Chưa biết giá trị cuối cùng
    }
    return standard_format

# Đọc dữ liệu từ tệp topics_1.txt
topics_data = []
with open("./brain/data_train/topics_1.txt", "r", encoding="utf-8") as topics_file:
    topics_data = topics_file.readlines()

# Khởi tạo danh sách chứa dữ liệu chủ đề
topics = []  
for topic_info in topics_data:
    topic_info = topic_info.strip().split(",")
    topic_name = topic_info[0].strip()
    
    if len(topic_info) > 1:
        start_year = int(topic_info[1].strip())

    if len(topic_info) > 2:
        end_year = int(topic_info[2].strip())

        initial_value = float(topic_info[3].strip())
        final_value = float(topic_info[4].strip())
        topics.append((topic_name, start_year, end_year, initial_value, final_value))

## Đọc dữ liệu từ tệp question_pass.txt
questions_data = []
with open("./brain/data_train/question_pass.txt", "r", encoding="utf-8") as questions_file:
    questions_data = questions_file.readlines()

# Khởi tạo danh sách chứa dữ liệu câu hỏi mới
data_train_new = []
for i, question_info in enumerate(questions_data):
    question_info = question_info.strip().split(":")
    if len(question_info) != 2:
        print(f"Dòng {i+1} trong tệp 'question_pass.txt' không đúng định dạng.")
        continue
    question_topic = question_info[0].strip()
    question_content = question_info[1].strip()
    data_train_new.append((question_topic, question_content))

# Khởi tạo dữ liệu huấn luyện
data_train = [
    ("Tỷ lệ học sinh giỏi", "Từ năm 2017 đến năm 2020, tỷ lệ học sinh giỏi (gọi là y) được tính theo công thức y = at + b."),
    ("Tỷ lệ sinh viên tốt nghiệp", "Từ năm 2018 đến năm 2022, tỷ lệ sinh viên tốt nghiệp (gọi là y) được tính theo công thức y = at + b."),
    # Các dòng dữ liệu khác ...
    ("Số lượng học sinh giỏi", "Trong năm 2021, số lượng học sinh giỏi tăng lên 20% so với năm trước."),
    ("Số lượng học sinh giỏi", "Năm 2020, số lượng học sinh giỏi là 500, tăng 100 học sinh so với năm 2019."),
    ("Tỷ lệ học sinh giỏi", "Trong 5 năm từ 2017 đến 2022, tỷ lệ học sinh giỏi tăng 10% mỗi năm."),
    ("Tỷ lệ học sinh giỏi", "Năm 2022, tỷ lệ học sinh giỏi của trường là 15%."),
    ("Tổng số học sinh", "Năm 2022, trường có tổng cộng 1500 học sinh."),
    ("Số học sinh giỏi", "Năm 2022, tổng số học sinh giỏi của trường là 315 em."),
    ("Tỷ lệ học sinh giỏi và số năm", "Tỷ lệ học sinh giỏi của trường không còn liên hệ với số năm do đạt ngưỡng tối đa."),
]

# Thêm dữ liệu câu hỏi mới vào dữ liệu huấn luyện
data_train.extend(data_train_new)

# Tạo dữ liệu huấn luyện mới
questions = []
labels = []

for i, topic in enumerate(topics):
    start_year = topic[1]
    end_year = topic[2]
    initial_percentage = topic[4]
    if end_year != start_year:
        slope = (topic[3] - initial_percentage) / (end_year - start_year)
    else:
        slope = 0  

    question_a = f"Lập công thức liên hệ giữa y và t. Dựa vào công thức, tính tổng số lượng vi khuẩn trong mẫu đất cho năm 2018."
    question_b = f"Vào năm {end_year} trường có 1500 học sinh, tổng kết cuối năm có 315 em đạt học sinh giỏi. Hỏi năm {end_year} tỷ lệ học sinh giỏi của trường và số năm có còn liên hệ với nhau bởi công thức trên hay không? Vì sao?"
    # Thêm câu hỏi và nhãn vào dữ liệu huấn luyện
    questions.extend([question_a, question_b])
    labels.extend([topic[0].lower(), topic[0].lower()])

# Mã hóa nhãn
label_encoder = LabelEncoder()
labels_encoded = label_encoder.fit_transform(labels)

# Tokenizer
tokenizer = Tokenizer()
tokenizer.fit_on_texts(questions)
sequences = tokenizer.texts_to_sequences(questions)

# Padding sequences
max_sequence_len = max([len(seq) for seq in sequences])
sequences_padded = pad_sequences(sequences, maxlen=max_sequence_len, padding='post')

# Số lượng từ vựng
vocab_size = len(tokenizer.word_index) + 1

from tensorflow.keras.layers import Conv1D, MaxPooling1D, GlobalMaxPooling1D

# Xây dựng mô hình CNN phức tạp
model = Sequential()
model.add(Embedding(vocab_size, 64, input_length=max_sequence_len))
model.add(Conv1D(128, 5, activation='relu'))  
model.add(MaxPooling1D(2))  
model.add(Conv1D(128, 5, activation='relu'))
model.add(MaxPooling1D(2))
model.add(Conv1D(128, 5, activation='relu'))
model.add(GlobalMaxPooling1D())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(topics), activation='softmax'))

# Biên dịch mô hình
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Huấn luyện mô hình nhiều lần
import re
import numpy as np

# Hàm để kiểm tra loại câu hỏi
def check_question_type(question):
    if re.search(r'được tính theo công thức|lập công thức liên hệ|tính số năm', question):
        return "dạng toán thực tế 1"
    else:
        return "không xác định"

# Huấn luyện mô hình nhiều lần
for i in range(1):
    print(f"Epoch {i+1}/10")
    model.fit(sequences_padded, np.array(labels_encoded), epochs=80, batch_size=120, validation_split=0.5)

    # Dự đoán
    test_question = input("Nhập câu hỏi bạn muốn dự đoán: ")

    test_question_sequences = tokenizer.texts_to_sequences([test_question])
    test_question_sequence_padded = pad_sequences(test_question_sequences, maxlen=max_sequence_len, padding='post')

    predictions = model.predict(test_question_sequence_padded)
    predicted_label_index = np.argmax(predictions, axis=1)[0]
    predicted_label = label_encoder.inverse_transform([predicted_label_index])[0]

    print("Câu hỏi:", test_question)
    print("Chủ đề dự đoán:", predicted_label)
    print("Loại câu hỏi:", check_question_type(test_question))
    print()
