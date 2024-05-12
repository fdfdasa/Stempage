function tilephantram() {
    const topics = [
        ["Tổng số lượng người dùng mới của dịch vụ streaming", 2018, 2025, 500000, 1200000, "người"],
        ["Tỉ lệ tăng trưởng du khách quốc tế tại Việt Nam", 2019, 2024, 15, 25, "%"],
        ["Doanh thu từ ứng dụng di động trong năm", 2020, 2025, 2000000, 5000000, "USD"],
        ["Số lượng xe điện được bán ra", 2019, 2023, 100000, 500000, "chiếc"],
        ["Tăng trưởng diện tích rừng được trồng mới", 2017, 2022, 1000, 5000, "hecta"],
        ["Lượng tiêu thụ điện năng tăng thêm hàng năm", 2020, 2025, 10000, 50000, "MWh"],
        ["Số lượng sách được xuất bản", 2018, 2024, 10000, 50000, "cuốn"],
        ["Doanh thu từ thị trường chứng khoán", 2019, 2025, 1000000000, 1500000000, "VND"],
        ["Số lượng công ty khởi nghiệp mới", 2018, 2023, 500, 2000, "công ty"],
        ["Số học sinh tham gia kỳ thi quốc gia", 2020, 2026, 800000, 1200000, "học sinh"],
        ["Tỉ lệ thất nghiệp giảm", 2021, 2024, 7.5, 4.5, "%"],
        ["Số lượng khách hàng mới của ngân hàng", 2019, 2023, 200000, 600000, "khách hàng"],
        ["Doanh số bán hàng online", 2020, 2026, 50000000, 100000000, "USD"],
        ["Tăng trưởng số lượng người theo dõi trên mạng xã hội", 2018, 2025, 100000, 500000, "người theo dõi"],
        ["Lượng mưa trung bình hàng năm", 2017, 2022, 1200, 1800, "mm"],
        ["Tăng trưởng sản lượng ngành công nghiệp", 2018, 2023, 100000, 150000, "tấn"],
        ["Số lượng bệnh viện mới được xây dựng", 2020, 2025, 10, 50, "bệnh viện"],
        ["Tổng giá trị xuất khẩu", 2019, 2024, 150000000, 250000000, "USD"],
        ["Số lượng trường học mới được thành lập", 2018, 2023, 20, 100, "trường"],
        ["Tỉ lệ tăng trưởng số bài báo khoa học được công bố", 2019, 2025, 2000, 5000, "bài báo"]
    ];
    
    
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const [description, startYear, endYear, initial, final, unit] = topic;

    const growthRate = ((final - initial) / initial * 100).toFixed(2);
    const middleYear = Math.floor((startYear + endYear) / 2);
    const middleValue = initial + (final - initial) * ((middleYear - startYear) / (endYear - startYear));
    
    const question = `
    **Câu hỏi:**
    Xét ${description} từ năm ${startYear} đến năm ${endYear}.
    - Năm ${startYear}, giá trị là ${initial.toLocaleString()}${unit}.
    - Năm ${endYear}, giá trị là ${final.toLocaleString()}${unit}.
    Tính tỉ lệ tăng trưởng hàng năm và dự đoán giá trị cho năm ${middleYear}.
    `;

    const solution = `
    **Đáp án:**
    a) Tỉ lệ tăng trưởng hàng năm là ${growthRate}%.
    b) Giá trị dự đoán cho năm ${middleYear} là ${middleValue.toLocaleString()}${unit}.
    `;

    return { question, solution };
}

module.exports = tilephantram;