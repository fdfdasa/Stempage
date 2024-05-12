from collections import defaultdict

# Đọc dữ liệu từ file topics.txt
with open("./brain/data_train/topics_0.txt", "r", encoding="utf-8") as file:
    data = [line.strip().split(",") for line in file]

# Tạo một từ điển để lưu trữ các chủ đề và kiểm tra trùng lặp
topic_dict = defaultdict(list)

# Lọc ra các chủ đề trùng lặp
unique_topics = []
for topic in data:
    topic_key = (topic[0], topic[2])  # Sử dụng tên chủ đề và năm kết thúc để tạo khóa
    if topic_key not in topic_dict:
        topic_dict[topic_key] = topic
        unique_topics.append(topic)

# Viết kết quả vào file mới topics_1.txt
with open("./brain/data_train/topics_1.txt", "w", encoding="utf-8") as file:
    for topic in unique_topics:
        file.write(",".join(topic) + "\n")

print("Dữ liệu đã được lọc và viết vào file topics_1.txt")
