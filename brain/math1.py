import random

def generate_generic_question(description, start_year, end_year, initial_value, final_value, unit):
    initial_question = """
    {description}

    Từ năm {start_year} đến năm {end_year}, {variable} (gọi là y) được tính theo công thức y = at + b, trong đó y là {variable}, t là số năm tính từ năm {start_year}. Biết rằng vào năm {start_year}, {variable} là {initial_value}{unit}, và vào năm {end_year}, {variable} là {final_value}{unit}.

    a) Hãy lập công thức liên hệ giữa {variable} và số năm. Dựa vào công thức, tính {variable} cho năm {year}.

    b) Nếu vào năm {new_year}, {variable} là {new_value} {unit}. Hãy tính số năm cần để đạt được {variable} là {target_value}{unit}.
    """

    new_question = initial_question.format(description=description, start_year=start_year, end_year=end_year,
                                           variable=description.lower(), initial_value=initial_value,
                                           final_value=final_value, year=start_year + (end_year - start_year) // 2,
                                           new_year=end_year + 1, new_value=final_value + (final_value - initial_value),
                                           target_value=final_value + (final_value - initial_value) + 1, unit=unit)

    print("Đề bài mới:")
    print(new_question)

    a = (final_value - initial_value) / (end_year - start_year)
    b = initial_value - a * start_year
    print("a =", a)
    print("b =", b)

    mid_year_value = a * (start_year + (end_year - start_year) // 2) + b
    print("{variable} cho năm {year}:".format(variable=description.lower(), year=start_year + (end_year - start_year) // 2),
          mid_year_value)

    target_value = final_value + (final_value - initial_value) + 1
    years_to_reach_target = (target_value - b) / a
    print("Số năm cần để đạt được {variable} là {target_value}{unit}:".format(variable=description.lower(),
                                                                              target_value=target_value, unit=unit),
          round(years_to_reach_target, 2))

def generate_random_question():
    # Danh sách các chủ đề và thông số tương ứng
    topics = [
        ("Lãi suất ngân hàng", random.randint(2010, 2022), 2025, random.randint(2, 4), random.randint(4, 5), "%"),
        ("Tổng doanh thu công ty", random.randint(2010, 2022), random.randint(2025, 2052), random.randint(2000, 6000) * 500000, random.randint(1000000, 10000000), "đ"),
        ("Số lượng người dùng mạng xã hội", random.randint(2010, 2020), 2020, random.randint(500, 5000), random.randint(5000, 20000), "người"),
        ("Giá trị của cổ phiếu", random.randint(2010, 2020), 2020, random.randint(50, 150), random.randint(150, 300), "đồng"),
        ("Tổng số xe đăng ký mới", random.randint(2015, 2020), 2020, random.randint(5000, 15000), random.randint(15000, 30000), "xe"),
        ("Doanh thu từ bán hàng trực tuyến", random.randint(2018, 2022), 2022, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "đ"),
        ("Số lượng khách du lịch", random.randint(2015, 2020), 2020, random.randint(10000, 50000), random.randint(50000, 100000), "người"),
        ("Tổng sản lượng nông nghiệp", random.randint(2010, 2020), 2020, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "tấn"),
        ("Tổng doanh số bán hàng", random.randint(2015, 2020), 2020, random.randint(2000000, 10000000), random.randint(10000000, 20000000), "đ"),
        ("Số lượng người tham gia khóa học trực tuyến", random.randint(2017, 2022), 2022, random.randint(500, 5000), random.randint(5000, 10000), "người"),
        ("Tỉ lệ sinh viên tốt nghiệp", random.randint(2016, 2021), 2021, random.randint(40, 80), random.randint(80, 100), "%"),
        ("Số lượng sách được mượn từ thư viện", random.randint(2015, 2020), 2020, random.randint(1000, 5000), random.randint(5000, 10000), "quyển"),
        ("Điểm trung bình của học sinh", random.randint(2017, 2022), 2022, random.randint(6, 8), random.randint(8, 10), ""),
        ("Số lượng học sinh đậu kỳ thi tốt nghiệp", random.randint(2015, 2020), 2020, random.randint(800, 1200), random.randint(1200, 2000), "học sinh"),
        ("Tỉ lệ sinh viên được nhận học bổng", random.randint(2016, 2021), 2021, random.randint(10, 20), random.randint(20, 30), "%"),
        ("Số lượng khẩu phần ăn hàng ngày", random.randint(2018, 2023), 2023, random.randint(3, 5), random.randint(5, 7), ""),
        ("Tổng doanh số của nhà hàng", random.randint(2015, 2020), 2020, random.randint(500000, 2000000), random.randint(2000000, 5000000), "đ"),
        ("Giá trị nhập khẩu thực phẩm", random.randint(2010, 2020), 2020, random.randint(10000000, 50000000), random.randint(50000000, 100000000), "đ"),
        ("Tỉ lệ người tiêu thụ rau quả hàng ngày", random.randint(2015, 2020), 2020, random.randint(50, 70), random.randint(70, 90), "%"),
        ("Số lượng đồ uống bán ra từ cửa hàng", random.randint(2017, 2022), 2022, random.randint(1000, 5000), random.randint(5000, 10000), "ly"),
        ("Thời gian học trung bình hàng ngày", random.randint(2018, 2023), 2023, random.randint(2, 4), random.randint(4, 6), "giờ"),
        ("Số lượng câu hỏi đã làm trong bài tập", random.randint(2016, 2021), 2021, random.randint(500, 1500), random.randint(1500, 3000), "câu"),
        ("Tỉ lệ sinh viên tham gia các hoạt động ngoại khóa", random.randint(2015, 2020), 2020, random.randint(30, 60), random.randint(60, 90), "%"),
        ("Điểm trung bình của sinh viên", random.randint(2017, 2022), 2022, random.randint(7, 9), random.randint(9, 10), ""),
        ("Số lượng giờ ôn thi mỗi tuần", random.randint(2015, 2020), 2020, random.randint(5, 10), random.randint(10, 15), "giờ"),
        ("Số lượng sinh vật mới được phát hiện", random.randint(2010, 2020), 2020, random.randint(50, 150), random.randint(150, 300), "loài"),
        ("Tổng số lượng vi khuẩn trong mẫu đất", random.randint(2015, 2020), 2020, random.randint(100000, 500000), random.randint(500000, 1000000), "vi khuẩn"),
        ("Tỉ lệ người tiêm vắc xin", random.randint(2017, 2022), 2022, random.randint(60, 80), random.randint(80, 100), "%"),
        ("Số lượng người tham gia nghiên cứu sinh học", random.randint(2016, 2021), 2021, random.randint(200, 800), random.randint(800, 1600), "người"),
        ("Số lượng loại thuốc mới được phát triển", random.randint(2010, 2020), 2020, random.randint(20, 50), random.randint(50, 100), "loại"),
        ("Tổng công suất sản xuất điện năng", random.randint(2015, 2020), 2020, random.randint(10000, 50000), random.randint(50000, 100000), "MW"),
        ("Số lượng thiết bị điện tử bán ra", random.randint(2017, 2022), 2022, random.randint(50000, 150000), random.randint(150000, 300000), "cái"),
        ("Tổng số lượng phân tử trong mẫu chất", random.randint(2010, 2020), 2020, random.randint(1000000, 5000000), random.randint(5000000, 10000000), "phân tử"),
        ("Độ sáng trung bình của đèn đường", random.randint(2016, 2021), 2021, random.randint(50, 100), random.randint(100, 150), "lux"),
        ("Tỉ lệ tự nhiên khí CO2 trong không khí", random.randint(2015, 2020), 2020, random.uniform(0.03, 0.05), random.uniform(0.05, 0.07), "%"),
        # Thêm các chủ đề mới với tính ngẫu nhiên hơn

        ("Tỉ lệ sử dụng phần mềm di động", random.randint(2010, 2025), random.randint(2025, 2030), random.uniform(20, 50), random.uniform(60, 80), "%"),
        ("Số lượng đơn hàng mua sắm trực tuyến", random.randint(2015, 2020), random.randint(2020, 2025), random.randint(50000, 100000), random.randint(200000, 500000), "đơn hàng"),
        ("Tỉ lệ sử dụng internet hàng ngày", random.randint(2010, 2020), random.randint(2020, 2030), random.uniform(40, 70), random.uniform(80, 90), "%"),
        ("Số lượng người tham gia sự kiện trực tuyến", random.randint(2015, 2025), random.randint(2025, 2035), random.randint(200, 1000), random.randint(2000, 5000), "người"),
        ("Tổng doanh số bán hàng trên mạng xã hội", random.randint(2018, 2022), random.randint(2022, 2026), random.randint(5000000, 10000000), random.randint(20000000, 50000000), "đ")
    ]

    # Chọn một chủ đề ngẫu nhiên
    topic, start_year, end_year, initial_value, final_value, unit = random.choice(topics)

    # Tạo đề bài mới cho chủ đề được chọn
    generate_generic_question(topic, start_year, end_year, initial_value, final_value, unit)

# Tạo một đề bài mới với chủ đề ngẫu nhiên
generate_random_question()
