import os
import json
import numpy as np
import pickle
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional, GlobalMaxPool1D
from keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical


# Lấy đường dẫn của thư mục hiện tại
current_dir = os.getcwd()

# Đường dẫn đến các file JSON
problems_path = os.path.join(current_dir, "scr\\Data_train\\problems.json")
labels_path = os.path.join(current_dir, "scr\\Data_train\\labels.json")

# Load dữ liệu từ các file JSON
with open(problems_path, 'r', encoding='utf-8') as f:
    problems = json.load(f)
with open(labels_path, 'r', encoding='utf-8') as f:
    labels = json.load(f)

# Tiền xử lý dữ liệu văn bản
tokenizer = Tokenizer()
tokenizer.fit_on_texts(problems)
sequences = tokenizer.texts_to_sequences(problems)
max_len = max([len(seq) for seq in sequences])
X = pad_sequences(sequences, maxlen=max_len)

# Chuyển đổi nhãn sang dạng one-hot
label_dict = {label: i for i, label in enumerate(set(labels))}
y = to_categorical([label_dict[label] for label in labels], num_classes=len(set(labels)))

# Chia dữ liệu thành tập huấn luyện và tập validation
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Xây dựng mô hình
model = Sequential([
    Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=100, input_length=max_len),
    Bidirectional(LSTM(128, return_sequences=True)),
    Dropout(0.2),
    Bidirectional(LSTM(64, return_sequences=True)),
    GlobalMaxPool1D(),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(len(set(labels)), activation='softmax')
])

# Compile mô hình
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Callbacks để ngăn chặn overfitting và lưu mô hình tốt nhất
early_stopping = EarlyStopping(monitor='val_loss', patience=5)
model_checkpoint = ModelCheckpoint('best_model.h5', save_best_only=True, monitor='val_accuracy', mode='max')

# Huấn luyện mô hình
model.fit(X_train, y_train, epochs=30, validation_data=(X_val, y_val), callbacks=[early_stopping, model_checkpoint])

# Lưu mô hình và tokenizer
# model.save("math_problem_model.h5")
# with open("tokenizer.pickle", "wb") as handle:
#     pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

# # Lưu label_dict
# with open("label_dict.pickle", "wb") as handle:
#     pickle.dump(label_dict, handle, protocol=pickle.HIGHEST_PROTOCOL)

# # Lưu tokenizer thành tệp JSON
# tokenizer_json = tokenizer.to_json()
# with open("tokenizer.json", "w", encoding='utf-8') as json_file:
#     json.dump(tokenizer_json, json_file, ensure_ascii=False)

# # Lưu label_dict vào file JSON
# with open("label_dict.json", "w") as json_file:
#     json.dump(label_dict, json_file)

# Test một bài toán cụ thể
problem_to_test = "Phương tiện vận chuyển công cộng hiện nay là xe Buýt với giá 5000 đồng/ lượt còn đối với Sinh viên- Học sinh là 2000 đồng/lượt và 112500 đồng tập 30 vé tháng. Anh Nam hằng ngày đi làm bằng xe Buýt 2 lượt đi và về, trung bình mỗi tháng anh đi làm 26 ngày."
sequence_to_test = tokenizer.texts_to_sequences([problem_to_test])
padded_sequence_to_test = pad_sequences(sequence_to_test, maxlen=max_len)
prediction = model.predict(padded_sequence_to_test)
predicted_label_index = np.argmax(prediction)
predicted_label = [label for label, index in label_dict.items() if index == predicted_label_index][0]

print("Dự đoán loại bài toán:", predicted_label)
