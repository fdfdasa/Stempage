const axios = require('axios');

async function sendExerciseToServer(exercise) {
    try {
        const response = await axios.post('http://localhost:3000/receive-exercise', {
            exercise: exercise
        });
        console.log(response.data);
    } catch (error) {
        console.error('Lỗi khi gửi bài tập đến server:', error);
    }
}

function processMessage(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Kiểm tra nếu có từ khóa "tạo bài tập"
    if (lowerCaseMessage.includes('tạo bài tập')) {
        isCreatingExercise = true; // Chuyển sang chế độ tạo bài tập
        return "Bot: Vui lòng nhập đề bài mà bạn muốn tạo thành bài tập.";
    }

    if (isCreatingExercise) {
        try {
            isCreatingExercise = false; // Kết thúc chế độ tạo bài tập sau khi nhận diện xong
            const exercise = {
                type: "unknown", // Hoặc bạn có thể gán một giá trị mặc định cho loại bài tập ở đây
                content: message
            };
            sendExerciseToServer(exercise); // Gửi bài tập đến server
            return "Bot: Đã gửi bài tập đến server.";
        } catch (error) {
            console.error('Lỗi khi xử lý tin nhắn bằng AI:', error);
            return "Bot: Xin lỗi, tôi không thể nhận diện loại bài toán từ đề bài này.";
        }
    }
}

module.exports = processMessage;
