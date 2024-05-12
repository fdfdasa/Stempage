function lapphuongtrinh() {
    const topics = [
        { mode: "xe đạp", action: "đi", returnAction: "trở về", unit: "km/h" },
        { mode: "xe máy", action: "lái", returnAction: "quay trở lại", unit: "km/h" },
        { mode: "xe buýt", action: "chạy", returnAction: "về", unit: "km/h" },
        { mode: "ô tô", action: "lái", returnAction: "quay về", unit: "km/h" },
        { mode: "tàu hỏa", action: "khởi hành", returnAction: "trở lại", unit: "km/h" },
        { mode: "thuyền", action: "chèo", returnAction: "về lại", unit: "km/h" },
        { mode: "kayak", action: "lướt", returnAction: "tái hành trình", unit: "km/h" },
        { mode: "máy bay", action: "cất cánh", returnAction: "hạ cánh", unit: "km/h" },
        { mode: "xe điện", action: "di chuyển", returnAction: "quay lại", unit: "km/h" },
        { mode: "xe tải", action: "chạy", returnAction: "trở về", unit: "km/h" },
        { mode: "xe ngựa", action: "phi nước đại", returnAction: "quay lại", unit: "km/h" },
        { mode: "patin", action: "trượt", returnAction: "lăn trở về", unit: "km/h" },
        { mode: "ván trượt", action: "trượt", returnAction: "trở lại", unit: "km/h" },
        { mode: "xe trượt tuyết", action: "trượt", returnAction: "trở lại", unit: "km/h" },
        { mode: "xe lăn", action: "lăn", returnAction: "quay lại", unit: "km/h" },
        { mode: "moto nước", action: "lướt", returnAction: "trở lại", unit: "km/h" },
        { mode: "cáp treo", action: "di chuyển", returnAction: "quay lại", unit: "km/h" },
        { mode: "xe kéo", action: "kéo", returnAction: "quay trở lại", unit: "km/h" },
        { mode: "xe đẩy", action: "đẩy", returnAction: "trở về", unit: "km/h" },
        { mode: "xe buýt điện", action: "tiến", returnAction: "quay về", unit: "km/h" }
    ];
    const locations = [
        ["A", "B"], ["Hà Nội", "Hải Phòng"], ["TP HCM", "Đà Lạt"],
        ["New York", "Boston"], ["Paris", "Lyon"], ["Berlin", "Munich"],
        ["Sydney", "Melbourne"], ["Tokyo", "Kyoto"], ["Seoul", "Busan"],["Thành phố Hồ Chí Minh", "Đà Nẵng"],
        ["Cần Thơ", "Huế"],
        ["Nha Trang", "Vũng Tàu"],
        ["Đà Lạt", "Quảng Ninh"],
        ["Thanh Hóa", "Nghệ An"],
        ["Hải Dương", "Bắc Ninh"],
        ["Phú Quốc", "Hội An"]
    ];
    const participants = [
        "một vận động viên", "một du khách", "một tài xế", "một hành khách",
        "một nhiếp ảnh gia", "một thám hiểm gia", "một người giao hàng",
        "một hướng dẫn viên du lịch", "một phi công", "một thuyền trưởng"
    ];
    // Chọn ngẫu nhiên một chủ đề, một địa điểm và một người tham gia
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const participant = participants[Math.floor(Math.random() * participants.length)];

    const distance = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // Khoảng cách từ 20km đến 100km
    const speedIncrease = Math.floor(Math.random() * (15 - 3 + 1)) + 3; // Tăng tốc độ từ 3km/h đến 15km/h
    const timeDifference = Math.floor(Math.random() * (120 - 10 + 1)) + 10; // Giảm thời gian từ 10 phút đến 120 phút

    // Tính toán vận tốc ban đầu và vận tốc khi quay về
    const timeInitial = distance / ((distance / (timeDifference / 60 + distance / (speedIncrease + distance / (timeDifference / 60)))));  // Thời gian đi (giờ)
    const speedInitial = distance / timeInitial;  // Vận tốc ban đầu
    const speedReturn = speedInitial + speedIncrease;  // Vận tốc khi quay về

    const question = `
    ${participant} ${topic.action} ${topic.mode} từ ${location[0]} đến ${location[1]} cách nhau ${distance}km. Khi ${topic.returnAction} từ ${location[1]} ${topic.action} ${location[0]}, người này tăng vận tốc thêm ${speedIncrease}${topic.unit} so với lúc ${topic.action}, nên thời gian ${topic.returnAction} ít hơn thời gian ${topic.action} là ${timeDifference} phút. Tính vận tốc của ${topic.mode} khi ${topic.action} từ ${location[0]} đến ${location[1]}.
    `;

    const solution = `
    Để giải bài toán này, chúng ta cần sử dụng các phương trình về thời gian và vận tốc. Thời gian đi lúc ban đầu là ${timeInitial.toFixed(2)} giờ, với vận tốc ban đầu là ${speedInitial.toFixed(2)}${topic.unit}. Vận tốc khi quay về là ${speedReturn.toFixed(2)}${topic.unit}. Vì thời gian quay về ít hơn ${timeDifference} phút, chúng ta có thể suy ra rằng vận tốc đã tăng thêm ${speedIncrease}${topic.unit}.
    `;

    return { question, solution };
}

module.exports = lapphuongtrinh;

