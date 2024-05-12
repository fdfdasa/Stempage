function laphephuongtrinh() {
    const topics = [
        ["Lãi suất ngân hàng", Math.floor(Math.random() * (2022 - 2010 + 1)) + 2010, 2025, Math.floor(Math.random() * (4 - 2 + 1)) + 2, Math.floor(Math.random() * (5 - 4 + 1)) + 4, "%"],
        ["Tổng doanh thu công ty", Math.floor(Math.random() * (2022 - 2010 + 1)) + 2010, Math.floor(Math.random() * (2052 - 2025 + 1)) + 2025, Math.floor(Math.random() * (6000 - 2000 + 1)) * 500000, Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000, "đ"],
        ["Số lượng người dùng mạng xã hội", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (5000 - 500 + 1)) + 500, Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000, "người"],
        ["Giá trị của cổ phiếu", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (150 - 50 + 1)) + 50, Math.floor(Math.random() * (300 - 150 + 1)) + 150, "đồng"],
        ["Tổng số xe đăng ký mới", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000, Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000, "xe"],
        ["Doanh thu từ bán hàng trực tuyến", Math.floor(Math.random() * (2022 - 2018 + 1)) + 2018, 2022, Math.floor(Math.random() * (5000000 - 1000000 + 1)) + 1000000, Math.floor(Math.random() * (10000000 - 5000000 + 1)) + 5000000, "đ"],
        ["Số lượng khách du lịch", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000, Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000, "người"],
        ["Tổng sản lượng nông nghiệp", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (5000000 - 1000000 + 1)) + 1000000, Math.floor(Math.random() * (10000000 - 5000000 + 1)) + 5000000, "tấn"],
        ["Tổng doanh số bán hàng", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (10000000 - 2000000 + 1)) + 2000000, Math.floor(Math.random() * (20000000 - 10000000 + 1)) + 10000000, "đ"],
        ["Số lượng người tham gia khóa học trực tuyến", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (5000 - 500 + 1)) + 500, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000, "người"],
        ["Tỉ lệ sinh viên tốt nghiệp", Math.floor(Math.random() * (2021 - 2016 + 1)) + 2016, 2021, Math.floor(Math.random() * (80 - 40 + 1)) + 40, Math.floor(Math.random() * (100 - 80 + 1)) + 80, "%"],
        ["Số lượng sách được mượn từ thư viện", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000, "quyển"],
        ["Điểm trung bình của học sinh", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (8 - 6 + 1)) + 6, Math.floor(Math.random() * (10 - 8 + 1)) + 8, ""],
        ["Số lượng học sinh đậu kỳ thi tốt nghiệp", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (1200 - 800 + 1)) + 800, Math.floor(Math.random() * (2000 - 1200 + 1)) + 1200, "học sinh"],
        ["Tỉ lệ sinh viên được nhận học bổng", Math.floor(Math.random() * (2021 - 2016 + 1)) + 2016, 2021, Math.floor(Math.random() * (20 - 10 + 1)) + 10, Math.floor(Math.random() * (30 - 20 + 1)) + 20, "%"],
        ["Số lượng khẩu phần ăn hàng ngày", Math.floor(Math.random() * (2023 - 2018 + 1)) + 2018, 2023, Math.floor(Math.random() * (5 - 3 + 1)) + 3, Math.floor(Math.random() * (7 - 5 + 1)) + 5, ""],
        ["Tổng doanh số của nhà hàng", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (2000000 - 500000 + 1)) + 500000, Math.floor(Math.random() * (5000000 - 2000000 + 1)) + 2000000, "đ"],
        ["Giá trị nhập khẩu thực phẩm", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (50000000 - 10000000 + 1)) + 10000000, Math.floor(Math.random() * (100000000 - 50000000 + 1)) + 50000000, "đ"],
        ["Tỉ lệ người tiêu thụ rau quả hàng ngày", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (70 - 50 + 1)) + 50, Math.floor(Math.random() * (90 - 70 + 1)) + 70, "%"],
        ["Số lượng đồ uống bán ra từ cửa hàng", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000, "ly"],
        ["Thời gian học trung bình hàng ngày", Math.floor(Math.random() * (2023 - 2018 + 1)) + 2018, 2023, Math.floor(Math.random() * (4 - 2 + 1)) + 2, Math.floor(Math.random() * (6 - 4 + 1)) + 4, "giờ"],
        ["Số lượng câu hỏi đã làm trong bài tập", Math.floor(Math.random() * (2021 - 2016 + 1)) + 2016, 2021, Math.floor(Math.random() * (1500 - 500 + 1)) + 500, Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500, "câu"],
        ["Tỉ lệ sinh viên tham gia các hoạt động ngoại khóa", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (60 - 30 + 1)) + 30, Math.floor(Math.random() * (90 - 60 + 1)) + 60, "%"],
        ["Điểm trung bình của sinh viên", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (9 - 7 + 1)) + 7, Math.floor(Math.random() * (10 - 9 + 1)) + 9, ""],
        ["Số lượng giờ ôn thi mỗi tuần", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (10 - 5 + 1)) + 5, Math.floor(Math.random() * (15 - 10 + 1)) + 10, "giờ"],
        ["Số lượng sinh vật mới được phát hiện", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (150 - 50 + 1)) + 50, Math.floor(Math.random() * (300 - 150 + 1)) + 150, "loài"],
        ["Tổng số lượng vi khuẩn trong mẫu đất", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000, Math.floor(Math.random() * (1000000 - 500000 + 1)) + 500000, "vi khuẩn"],
        ["Tỉ lệ người tiêm vắc xin", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (80 - 60 + 1)) + 60, Math.floor(Math.random() * (100 - 80 + 1)) + 80, "%"],
        ["Số lượng người tham gia nghiên cứu sinh học", Math.floor(Math.random() * (2021 - 2016 + 1)) + 2016, 2021, Math.floor(Math.random() * (800 - 200 + 1)) + 200, Math.floor(Math.random() * (1600 - 800 + 1)) + 800, "người"],
        ["Số lượng loại thuốc mới được phát triển", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (50 - 20 + 1)) + 20, Math.floor(Math.random() * (100 - 50 + 1)) + 50, "loại"],
        ["Tổng công suất sản xuất điện năng", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000, Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000, "MW"],
        ["Số lượng thiết bị điện tử bán ra", Math.floor(Math.random() * (2022 - 2017 + 1)) + 2017, 2022, Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000, Math.floor(Math.random() * (300000 - 150000 + 1)) + 150000, "cái"],
        ["Tổng số lượng phân tử trong mẫu chất", Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010, 2020, Math.floor(Math.random() * (5000000 - 1000000 + 1)) + 1000000, Math.floor(Math.random() * (10000000 - 5000000 + 1)) + 5000000, "phân tử"],
        ["Độ sáng trung bình của đèn đường", Math.floor(Math.random() * (2021 - 2016 + 1)) + 2016, 2021, Math.floor(Math.random() * (100 - 50 + 1)) + 50, Math.floor(Math.random() * (150 - 100 + 1)) + 100, "lux"],
        ["Tỉ lệ tự nhiên khí CO2 trong không khí", Math.floor(Math.random() * (2020 - 2015 + 1)) + 2015, 2020, (Math.random() * (0.05 - 0.03) + 0.03).toFixed(2), (Math.random() * (0.07 - 0.05) + 0.05).toFixed(2), "%"],
        ["Tỉ lệ sử dụng phần mềm di động", Math.floor(Math.random() * (2030 - 2025 + 1)) + 2025, Math.floor(Math.random() * (2030 - 2025 + 1)) + 2025, (Math.random() * (50 - 20) + 20).toFixed(2), (Math.random() * (80 - 60) + 60).toFixed(2), "%"],
        ["Số lượng đơn hàng mua sắm trực tuyến", Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020, Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020, Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000, Math.floor(Math.random() * (500000 - 200000 + 1)) + 200000, "đơn hàng"],
        ["Tỉ lệ sử dụng internet hàng ngày", Math.floor(Math.random() * (2030 - 2020 + 1)) + 2020, Math.floor(Math.random() * (2030 - 2020 + 1)) + 2020, (Math.random() * (70 - 40) + 40).toFixed(2), (Math.random() * (90 - 80) + 80).toFixed(2), "%"],
        ["Số lượng người tham gia sự kiện trực tuyến", Math.floor(Math.random() * (2035 - 2025 + 1)) + 2025, Math.floor(Math.random() * (2035 - 2025 + 1)) + 2025, Math.floor(Math.random() * (5000 - 200 + 1)) + 200, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, "người"],
        ["Tổng doanh số bán hàng trên mạng xã hội", Math.floor(Math.random() * (2026 - 2018 + 1)) + 2018, Math.floor(Math.random() * (2026 - 2022 + 1)) + 2022, Math.floor(Math.random() * (10000000 - 5000000 + 1)) + 5000000, Math.floor(Math.random() * (50000000 - 20000000 + 1)) + 20000000, "đ"]
    ];

    const topic = topics[Math.floor(Math.random() * topics.length)];
    const [description, startYear, endYear, initialValue, finalValue, unit] = topic;

    const middleYear = startYear + Math.floor((endYear - startYear) / 2);
    const increasedValue = finalValue + (finalValue - initialValue);

    const m = (finalValue - initialValue) / (endYear - startYear);
    const c = initialValue - m * startYear;
    const middleYearValue = m * middleYear + c;

    // Làm tròn giá trị của middleYearValue đến 2 chữ số sau dấu phẩy
    const roundedMiddleYearValue = middleYearValue.toFixed(2);

    const yearsToReachIncreasedValue = Math.ceil((increasedValue + 1 - c) / m) - endYear;

    const question = `
    ${description} từ năm ${startYear} đến năm ${endYear}, được tính theo công thức y = at + b, trong đó y là ${description}, t là số năm tính từ năm ${startYear}. 
    Vào năm ${startYear}, ${description} là ${initialValue}${unit}, và vào năm ${endYear}, ${description} là ${finalValue}${unit}.
    \n
    a) Hãy lập công thức liên hệ giữa ${description} và số năm. Dựa vào công thức, tính ${description} cho năm ${middleYear}.
    \n
    b) Nếu vào năm ${endYear + 1}, ${description} là ${increasedValue} ${unit}. Hãy tính số năm cần để đạt được ${description} là ${increasedValue + 1} ${unit}. Làm tròn kết quả đến số thập phân thứ 2.
    `;

    const answer = `
    a) **Công thức liên hệ giữa ${description} và số năm:**
    - Công thức: y = ${m.toFixed(2)}x + ${c.toFixed(2)}.
    - Giá trị ${description} cho năm ${middleYear} là ${roundedMiddleYearValue}${unit}.

    b) **Tính số năm cần để đạt giá trị mới:**
    - Để đạt được giá trị ${increasedValue + 1}${unit}, cần thêm ${yearsToReachIncreasedValue} năm sau năm ${endYear}.
    `;

    return {question, answer};
}

module.exports = laphephuongtrinh;