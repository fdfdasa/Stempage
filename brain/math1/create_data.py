import random

def generate_generic_question(description, start_year, end_year, initial_value, final_value, unit, task_type):
    initial_question = """
    "{description}", "Từ năm {start_year} đến năm {end_year}, {description} (gọi là y) được tính theo công thức y = at + b, trong đó y là {description}, t là số năm tính từ năm {start_year}. Biết rằng vào năm {start_year}, {description} là {initial_value}{unit}, và vào năm {end_year}, {description} là {final_value}{unit}."
    """

    new_question = initial_question.format(description=description, start_year=start_year, end_year=end_year,
                                            initial_value=initial_value, final_value=final_value, unit=unit)

    return new_question

def save_topic_and_question(topic, question, start_year, end_year, initial_value, final_value):
    with open("./brain/data_train/topics_0.txt", "a", encoding="utf-8") as topics_file:
        topics_file.write(f"{topic},{start_year},{end_year},{initial_value},{final_value}\n")
    
    with open("./brain/data_train/questions.txt", "a", encoding="utf-8") as questions_file:
        questions_file.write(question + "\n\n")

def generate_random_question():
    topics = [
        ("Lãi suất ngân hàng", random.randint(2010, 2022), 2025, random.randint(2, 4), random.randint(4, 5), "%", "Tính tỉ lệ"),
        ("Tổng doanh thu công ty", random.randint(2010, 2022), random.randint(2025, 2052), random.randint(2000, 6000) * 500000, random.randint(1000000, 10000000), "đ", "Tính tỉ lệ"),
        ("Số lượng người dùng mạng xã hội", random.randint(2010, 2020), 2020, random.randint(500, 5000), random.randint(5000, 20000), "người", "Tính tỉ lệ"),
        ("Giá trị của cổ phiếu", random.randint(2010, 2020), 2020, random.randint(50, 150), random.randint(150, 300), "đồng", "Tính tỉ lệ"),
        ("Tổng số xe đăng ký mới", random.randint(2015, 2020), 2020, random.randint(5000, 15000), random.randint(15000, 30000), "xe", "Tính tỉ lệ"),
        ("Doanh thu từ bán hàng trực tuyến", random.randint(2018, 2022), 2022, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "đ", "Tính tỉ lệ"),
        ("Số lượng khách du lịch", random.randint(2015, 2020), 2020, random.randint(10000, 50000), random.randint(50000, 100000), "người", "Tính tỉ lệ"),
        ("Tổng sản lượng nông nghiệp", random.randint(2010, 2020), 2020, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "tấn", "Tính tỉ lệ"),
        ("Tổng doanh số bán hàng", random.randint(2015, 2020), 2020, random.randint(2000000, 10000000), random.randint(10000000, 20000000), "đ", "Tính tỉ lệ"),
        ("Số lượng người tham gia khóa học trực tuyến", random.randint(2017, 2022), 2022, random.randint(500, 5000), random.randint(5000, 10000), "người", "Tính tỉ lệ"),
        ("Tỉ lệ sinh viên tốt nghiệp", random.randint(2016, 2021), 2021, random.randint(40, 80), random.randint(80, 100), "%", "Tính tỉ lệ"),
        ("Số lượng sách được mượn từ thư viện", random.randint(2015, 2020), 2020, random.randint(1000, 5000), random.randint(5000, 10000), "quyển", "Tính tỉ lệ"),
        ("Điểm trung bình của học sinh", random.randint(2017, 2022), 2022, random.randint(6, 8), random.randint(8, 10), "", "Lập công thức"),
        ("Số lượng học sinh đậu kỳ thi tốt nghiệp", random.randint(2015, 2020), 2020, random.randint(800, 1200), random.randint(1200, 2000), "học sinh", "Tính tỉ lệ"),
        ("Tỉ lệ sinh viên được nhận học bổng", random.randint(2016, 2021), 2021, random.randint(10, 20), random.randint(20, 30), "%", "Tính tỉ lệ"),
        ("Số lượng khẩu phần ăn hàng ngày", random.randint(2018, 2023), 2023, random.randint(3, 5), random.randint(5, 7), "", "Tính tỉ lệ"),
        ("Tổng doanh số của nhà hàng", random.randint(2015, 2020), 2020, random.randint(500000, 2000000), random.randint(2000000, 5000000), "đ", "Tính tỉ lệ"),
        ("Giá trị nhập khẩu thực phẩm", random.randint(2010, 2020), 2020, random.randint(10000000, 50000000), random.randint(50000000, 100000000), "đ", "Tính tỉ lệ"),
        ("Tỉ lệ người tiêu thụ rau quả hàng ngày", random.randint(2015, 2019), 2020, random.randint(50, 70), random.randint(70, 90), "%", "Tính tỉ lệ"),
        ("Số lượng đồ uống bán ra từ cửa hàng", random.randint(2017, 2022), 2022, random.randint(1000, 5000), random.randint(5000, 10000), "ly", "Tính tỉ lệ"),
        ("Thời gian học trung bình hàng ngày", random.randint(2018, 2023), 2023, random.randint(2, 4), random.randint(4, 6), "giờ", "Tính tỉ lệ"),
        ("Số lượng câu hỏi đã làm trong bài tập", random.randint(2016, 2021), 2021, random.randint(500, 1500), random.randint(1500, 3000), "câu", "Tính tỉ lệ"),
        ("Tỉ lệ sinh viên tham gia các hoạt động ngoại khóa", random.randint(2015, 2020), 2020, random.randint(30, 60), random.randint(60, 90), "%", "Tính tỉ lệ"),
        ("Điểm trung bình của sinh viên", random.randint(2017, 2022), 2022, random.randint(7, 9), random.randint(9, 10), "", "Lập công thức"),
        ("Số lượng giờ ôn thi mỗi tuần", random.randint(2015, 2020), 2020, random.randint(5, 10), random.randint(10, 15), "giờ", "Tính số năm"),
        ("Số lượng sinh vật mới được phát hiện", random.randint(2010, 2020), 2020, random.randint(50, 150), random.randint(150, 300), "loài", "Tính tỉ lệ"),
        ("Tổng số lượng vi khuẩn trong mẫu đất", random.randint(2015, 2019), 2020, random.randint(100000, 500000), random.randint(500000, 1000000), "vi khuẩn", "Tính tỉ lệ"),
        ("Tỉ lệ người tiêm vắc xin", random.randint(2017, 2022), 2022, random.randint(60, 80), random.randint(80, 100), "%", "Tính tỉ lệ"),
        ("Số lượng người tham gia nghiên cứu sinh học", random.randint(2016, 2021), 2021, random.randint(200, 800), random.randint(800, 1600), "người", "Tính tỉ lệ"),
        ("Số lượng loại thuốc mới được phát triển", random.randint(2010, 2019), 2020, random.randint(20, 50), random.randint(50, 100), "loại", "Tính tỉ lệ"),
        ("Tổng công suất sản xuất điện năng", random.randint(2015, 2019), 2020, random.randint(10000, 50000), random.randint(50000, 100000), "MW", "Tính tỉ lệ"),
        ("Số lượng thiết bị điện tử bán ra", random.randint(2017, 2022), 2022, random.randint(50000, 150000), random.randint(150000, 300000), "cái", "Tính tỉ lệ"),
        ("Tổng số lượng phân tử trong mẫu chất", random.randint(2010, 2020), 2029, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "phân tử", "Tính tỉ lệ"),
        ("Độ sáng trung bình của đèn đường", random.randint(2016, 2021), 2022, random.randint(50, 100), random.randint(100, 150), "lux", "Tính tỉ lệ"),
        ("Tỉ lệ tự nhiên khí CO2 trong không khí", random.randint(2015, 2020), 2021, random.uniform(0.03, 0.05), random.uniform(0.05, 0.07), "%", "Tính tỉ lệ"),
        ("Tỉ lệ sử dụng phần mềm di động", random.randint(2010, 2025), random.randint(2026, 2030), random.uniform(20, 50), random.uniform(60, 80), "%", "Tính tỉ lệ"),
        ("Số lượng đơn hàng mua sắm trực tuyến", random.randint(2015, 2020), random.randint(2022, 2025), random.randint(50000, 100000), random.randint(200000, 500000), "đơn hàng", "Tính tỉ lệ"),
        ("Tỉ lệ sử dụng internet hàng ngày", random.randint(2010, 2020), random.randint(2025, 2030), random.uniform(40, 70), random.uniform(80, 90), "%", "Tính tỉ lệ"),
        ("Số lượng người tham gia sự kiện trực tuyến", random.randint(2015, 2025), random.randint(2026, 2035), random.randint(200, 1000), random.randint(2000, 5000), "người", "Tính tỉ lệ"),
        ("Tổng doanh số bán hàng trên mạng xã hội", random.randint(2018, 2022), random.randint(2023, 2026), random.randint(5000000, 10000000), random.randint(20000000, 50000000), "đ", "Tính tỉ lệ")
    ]
    
    # Chọn một chủ đề ngẫu nhiên từ danh sách topics
    topic, start_year, end_year, initial_value, final_value, unit, task_type = random.choice(topics)

    # Tạo đề bài mới cho chủ đề được chọn
    question = generate_generic_question(topic, start_year, end_year, initial_value, final_value, unit, task_type)
    
    return topic, question, start_year, end_year, initial_value, final_value

# Tạo và lưu câu hỏi và chủ đề mới
topic, question, start_year, end_year, initial_value, final_value = generate_random_question()
save_topic_and_question(topic, question, start_year, end_year, initial_value, final_value)
