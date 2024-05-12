const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(bodyParser.json());
app.use(cors({ // Set up CORS middleware
    origin: 'http://localhost:5501', // Allow requests from this origin
    credentials: true // Allow credentials (cookies) to be included in requests
  }));
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));

const dataFolderPath = path.resolve(__dirname, 'scr\\Data_train');
const dataFilePath = path.resolve(dataFolderPath, 'data.json');
const feedbackDataPath = path.resolve(dataFolderPath, 'feedback_data.json');
const lapphuongtrinh = require('./LPT');
const laphephuongtrinh = require('./LHPT');
const tilephantram = require('./TLPT');


// Kiểm tra và tạo thư mục nếu nó không tồn tại
if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath, { recursive: true });  // Đảm bảo tạo thư mục lồng nhau
    console.log('Đã tạo thư mục:', dataFolderPath);
}

// Khởi tạo các tệp dữ liệu nếu chúng không tồn tại
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '{}');
    console.log('Đã khởi tạo file data.json');
}
if (!fs.existsSync(feedbackDataPath)) {
    fs.writeFileSync(feedbackDataPath, '[]');
    console.log('Đã khởi tạo file feedback_data.json');
}

async function sendToPython(problem) {
    console.log('Sending problem to Python script:', problem);
    try {
        const response = await axios.post('http://localhost:5000/predict', {problems: [problem]});
        return response.data;
    } catch (error) {
        console.error('Error from Python script:', error);
        throw error;
    }
}


// Một số câu trả lời thông thường
const responses = {
    "hello": "Xin chào! Chào mừng bạn đến với trang web tạo bài tập STEMPage. Hãy cho tôi biết nếu bạn cần bất kỳ sự hỗ trợ nào!",
    "hi": "Chào bạn! Đây là STEMPage - nơi bạn có thể tạo ra những bài tập tuyệt vời cho học sinh. Cần giúp đỡ gì không?",
    "hướng dẫn": "Để bắt đầu, bạn có thể nhập 'tạo bài tập' và tiếp tục theo hướng dẫn.",
    "giáo viên": "STEMPage là một công cụ tuyệt vời cho giáo viên! Bạn có thể tạo bài tập dễ dàng và nhanh chóng.",
    "học sinh": "Học sinh có thể sử dụng STEMPage để làm bài tập và rèn luyện kiến thức một cách hiệu quả.",
    "ok": "Để bắt đầu, bạn có thể nhập 'tạo bài tập' và tiếp tục theo hướng dẫn.",
    "cảm ơn": "Không có gì! Hãy cho tôi biết nếu bạn cần thêm sự trợ giúp nào khác.",
    "có": "bạn cần gì thì hãy nói tôi nhé, để bắt đầu sử dụng hãy nhập 'tạo bài tập'",
    "không":"bất kể khi nào cần giúp tạo bài tập hãy tìm đến tôi nhé, để bắt đầu sử dụng hãy nhập 'tạo bài tập'",
    "bye": "Chúc bạn một ngày tốt lành! Hãy quay lại nếu bạn cần bất kỳ sự trợ giúp nào khác.",
    "xin chào":"xin chào, tôi có thể giúp gì cho bạn, để bắt đầu hãy nhập 'tạo bài tập'",
    "chào":"xin chào, tôi có thể giúp gì cho bạn, để bắt đầu hãy nhập 'tạo bài tập'",
    "bạn có thể làm gì": "tôi là AI có thể nhận diện và tạo ra những dạng bài tập tương tự với dạng bài mà bạn đã đưa vào, mục đích để bạn rèn luyện và thành thào kĩ năng xử lý vấn đề."
};

app.post('/IsSignIn', (req, res) => {
    const { user, userpass } = req.body;
    // Check user credentials here
    
    // Assuming user credentials are valid\
    
    req.session.user = user;
    
    res.json({ status: "success", message: "User signed in successfully" });
  });
  
  // Endpoint to check if a user is signed in
  app.get('/IsSignIn', (req, res) => {
    const user = req.session.user;
    if (user) {
      res.json({ name: user });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  });

  app.post('/logout', async (req, res) => {
    const user = req.session.user;
    // Assuming you have some user-specific data stored on the server
    // Delete or reset user-specific data here (if applicable)

    req.session.destroy(err => {
        if (err) {
            // Check if the error is due to an intentional logout failure
            if (req.session) {
                console.error('Error destroying session:', err);
                res.status(500).json({ status: "error", message: "Failed to sign out" });
            } else {
                // If there is no session, it's likely already destroyed, so send success response
                res.json({ status: "success", message: "User signed out successfully" });
            }
        } else {
            // Clear the session cookie by setting an expired date
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ status: "success", message: "User signed out successfully" });
        }
    });
});

let isCreatingExercise = false;
let isConfirmingQuantity = false;
let lhpt = false;
let tlpt = false;
let lpt = false;
app.post('/sendMessage', async (req, res) => {
    const { text, isUserMessage, numberOfReplies } = req.body;
    const lowerText = text.toLowerCase();


    // Kiểm tra và phản hồi các câu hỏi thường gặp
    if (isUserMessage && responses[lowerText]) {
        return res.json({ messages: Array(numberOfReplies).fill(responses[lowerText]) });
    }

    // Quy trình tạo bài tập
    if (isUserMessage && lowerText.includes('tạo bài tập')) {
        isCreatingExercise = true;
        return res.json({ messages: Array(numberOfReplies).fill('Bạn hãy nhập nội dung bài tập vào đi, tôi sẽ hoạt động tốt hơn nếu bạn nhập cụ thể đó là dạng bài gì đấy🥰') });
    }

    // Xử lý nhập nội dung bài tập
    if (isUserMessage && isCreatingExercise) {
        if (lowerText.includes('lập hệ phương trình')){ /*|| lowerText.includes('lập phương trình') || lowerText.includes('tỉ lệ phần trăm')) {*/
            isCreatingExercise = false;
            isConfirmingQuantity = true;
            lhpt = true;
            tlpt = false;
            lpt = false;
            return res.json({ messages: Array(numberOfReplies).fill('Cảm ơn bạn! Bạn cần tạo bao nhiêu bài dạng lập hệ phương trình ?') }); 
        } 

        if (lowerText.includes('lập phương trình')) {
            isCreatingExercise = false;
            isConfirmingQuantity = true;
            lhpt = false;
            tlpt = false;
            lpt = true;
            return res.json({ messages: Array(numberOfReplies).fill('Cảm ơn bạn! Bạn cần tạo bao nhiêu bài dạng lập phương trình ?') });
        }

        if (lowerText.includes('tỉ lệ phần trăm')) {
            isCreatingExercise = false;
            isConfirmingQuantity = true;
            lhpt = false;
            tlpt = true;
            lpt = false;
            return res.json({ messages: Array(numberOfReplies).fill('Cảm ơn bạn! Bạn cần tạo bao nhiêu bài dạng tỉ lệ phần trăm ?') });
        }
        else {
            // Gửi nội dung bài tập cho Python xử lý
            try {
                const results = await sendToPython(text);
                const predictedLabel = results[0].predicted_label.toLowerCase();
                let responseMessage;

                if (predictedLabel.includes('tỉ lệ phần trăm')) {

                    responseMessage = predictedLabel;
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false;
                    isConfirmingQuantity = true;
                    lhpt = false;
                    tlpt = true;
                    lpt = false;
                } else {
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false; // Kết thúc quá trình tạo bài tập
                }

                if (predictedLabel.includes('phương trình')) {
                    responseMessage = predictedLabel;
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false;
                    isConfirmingQuantity = true;
                    lhpt = false;
                    tlpt = false;
                    lpt = true;
                } else {
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false; // Kết thúc quá trình tạo bài tập
                }

                if (predictedLabel.includes('lập hệ phương trình')) {
                    responseMessage = predictedLabel;
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false;
                    isConfirmingQuantity = true;
                    lhpt = true;
                    tlpt = false;
                    lpt = false;
                } else {
                    responseMessage = 'Cảm ơn bạn đây là dạng ' + predictedLabel + ' Bạn cần tạo bao nhiêu bài?😅';
                    isCreatingExercise = false; // Kết thúc quá trình tạo bài tập
                }

                return res.json({ messages: Array(numberOfReplies).fill(responseMessage) });
            } catch (error) {
                console.error('Error calling Python script:', error);
                return res.status(500).json({ messages: [`Server: Đã xảy ra lỗi khi xử lý bài tập.`], error: error.message });
            }
        }
    }

    // Xử lý nhập số lượng bài tập muốn tạo
    if (isUserMessage && isConfirmingQuantity) {
        const numberOfExercises = parseInt(lowerText, 10); // Parse the number from text correctly
        let QT;

        if (!isNaN(numberOfExercises) && (lhpt)) {
            isConfirmingQuantity = false;
            QT = 'lập hệ phương trình'
            const questions = []; // Initialize an array to store the questions
            for (let i = 0; i < numberOfExercises; i++) {
                const {question, answer}  = laphephuongtrinh(); // Generate a question
                questions.push(question, answer); // Add the generated question to the array
            }
            
            return res.json({ messages: [`Bạn cần tạo ${numberOfExercises} bài dạng ${QT}`].concat(questions)});
        }
        
        if (!isNaN(numberOfExercises) && (tlpt)) {
            isConfirmingQuantity = false;
            QT = 'tỉ lệ phần trăm'
            const questions = []; // Initialize an array to store the questions
            for (let i = 0; i < numberOfExercises; i++) {
                const {question, solution} = tilephantram(); // Generate a question
                questions.push(question, solution); // Add the generated question to the array
            }
            return res.json({ messages: [`Bạn cần tạo ${numberOfExercises} bài dạng ${QT}`].concat(questions)});
        }

        if (!isNaN(numberOfExercises) && (lpt)) {
            isConfirmingQuantity = false;
            QT = 'lập phương trình'
            const questions = []; // Initialize an array to store the questions
            for (let i = 0; i < numberOfExercises; i++) {
                const {question, solution} = lapphuongtrinh(); // Generate a question
                questions.push(question, solution); 
            }
            
            return res.json({ messages: [`Bạn cần tạo ${numberOfExercises} bài dạng ${QT}`].concat(questions)});
        }
            
            // Return the number of exercises and all generated questions
    } else {
        return res.json({ messages: ['Vui lòng nhập số lượng bài tập là một số nguyên.'] });
    }
    
    // Phản hồi mặc định khi không tìm thấy từ khóa nào trong tin nhắn của người dùng
    res.json({ messages: Array(numberOfReplies).fill(`Server: Tôi không hiểu "${text}", bạn có thể nhập lại không?`) });
});

// function sendFeedback(inputText, isCorrect) {
//     const feedbackData = { input: inputText, isCorrect: isCorrect };
//     const xhr = new XMLHttpRequest();
//     const feedbackUrl = 'http://localhost:3000/feedback';

//     xhr.open('POST', feedbackUrl, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             console.log('Feedback sent successfully');
//             retrainModel(inputText); // Tái huấn luyện mô hình và dự đoán lại
//         } else {
//             console.error('Error sending feedback');
//         }
//     };
//     xhr.send(JSON.stringify(feedbackData));
// }

// function retrainModel(inputText) {
//     const xhrRetrain = new XMLHttpRequest();
//     xhrRetrain.open('POST', 'http://localhost:5000/retrain_model', true);
//     xhrRetrain.onload = function() {
//         if (xhrRetrain.status === 200) {
//             console.log('Model retrained successfully');
//             requestPrediction(inputText); // Gửi yêu cầu dự đoán mới sau khi tái huấn luyện
//         } else {
//             console.error('Error retraining model');
//         }
//     };
//     xhrRetrain.send(); // Không cần data cho retrain
// }

// function requestPrediction(inputText) {
//     const xhrPrediction = new XMLHttpRequest();
//     xhrPrediction.open('POST', 'http://localhost:5000/predict', true);
//     xhrPrediction.setRequestHeader('Content-Type', 'application/json');
//     xhrPrediction.onload = function() {
//         if (xhrPrediction.status === 200) {
//             const results = JSON.parse(xhrPrediction.responseText);
//             console.log('New prediction received', results);
//             // Hiển thị kết quả dự đoán mới, hoặc xử lý tiếp theo nhu cầu
//         } else {
//             console.error('Error requesting new prediction');
//         }
//     };
//     xhrPrediction.send(JSON.stringify({ problems: [inputText] }));
// }

function saveFeedback(problem, isCorrect) {
    let feedbackData = JSON.parse(fs.readFileSync(feedbackDataPath));
    feedbackData.push({ problem, isCorrect });
    fs.writeFileSync(feedbackDataPath, JSON.stringify(feedbackData, null, 2));
    console.log('Feedback saved');
}

app.post('/feedback', async (req, res) => {
    const { input, isCorrect } = req.body;
    saveFeedback(input, isCorrect);
    try {
        const response = await axios.post('http://localhost:5000/retrain_model');
        res.status(200).json({ message: "Feedback received and model retraining initiated.", retrainResponse: response.data });
    } catch (error) {
        console.error('Retrain request failed:', error);
        res.status(500).json({ message: "Model retraining failed." });
    }
});

app.post('/save-message', (req, res) => {
    const { message } = req.body;
    let data = {};
    try {
        const jsonData = fs.readFileSync(dataFilePath, 'utf8');
        data = JSON.parse(jsonData);
    } catch (err) {
        console.error('Không thể đọc file:', err);
    }
    const timestamp = new Date().toISOString();
    data[timestamp] = message;
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4));
        console.log('Đã lưu tin nhắn vào file data.json');
        res.sendStatus(200);
    } catch (err) {
        console.error('Lỗi khi ghi vào file:', err);
        res.sendStatus(500);
    }
});

app.get('/get-messages', (req, res) => {
    try {
        const jsonData = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(jsonData);
        res.json(data);
    } catch (err) {
        console.error('Lỗi khi đọc file:', err);
        res.status(500).send('Đã xảy ra lỗi khi lấy lịch sử tin nhắn');
    }
});

app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
