document.addEventListener('DOMContentLoaded', function() {
    const taskbar = document.getElementById('taskbar');

    function setChatAreaWidth() {
        const windowWidth = window.innerWidth;
        const taskbarWidth = taskbar.offsetWidth;
        const chatArea = document.querySelector('.chat-area');
        chatArea.style.width = windowWidth - taskbarWidth + 'px';
    }

    setChatAreaWidth();
    window.addEventListener('resize', setChatAreaWidth);

    // Kiểm tra khi khung chat được tải
    function checkChatMessages() {
        const chatMessages = document.querySelector('.chat');
        const noMessageText = document.querySelector('.no-message-text');
        // Nếu không có tin nhắn, hiển thị văn bản ở giữa
        if (chatMessages.innerHTML.trim() === '') {
            noMessageText.style.display = 'block';
        } else {
            // Nếu có tin nhắn, ẩn văn bản đi
            noMessageText.style.display = 'none';
        }
    }

    // Gọi hàm kiểm tra khi khung chat được tải
    checkChatMessages();

    // Kiểm tra khi có thêm tin nhắn mới
    function checkNewMessages() {
        // Gọi hàm kiểm tra lại
        checkChatMessages();
    }

    // Lắng nghe sự kiện khi có tin nhắn mới
    document.querySelector('.message-input').addEventListener('keyup', checkNewMessages);
});


let isReplying = false;
function toggleTaskbar() {
    const taskbar = document.getElementById('taskbar');
    const isExpanded = taskbar.classList.contains('expanded');
    const toggleButton = document.querySelector('.toggle-button');
    const nav = document.querySelector('.navigation');
    const chatArea = document.querySelector('.chat-area');
    // Toggle trạng thái của taskbar
    taskbar.classList.toggle('expanded');
    taskbar.classList.toggle('collapsed');

    // Lấy phần username
    const username = document.querySelector('.username');
    const icons = document.querySelectorAll('.list i');
    // Lấy menu navigation
    const navigation = document.querySelector('.navigation');

    if (!isExpanded) {
        toggleButton.classList.remove("collapsed");
        toggleButton.classList.add("expanded");
        toggleButton.style.left = '210px';
        // Nếu ban đầu là thu gọn, hiện phần username và thu lại menu navigation
        username.classList.remove('collapsed');
        navigation.style.width = '100px';
        chatArea.style.left = 'calc(180px + 10px)';
        chatArea.style.width = 'calc(100% - 220px)';
        
    } else {
        
        chatArea.style.left = '45px';
        chatArea.style.width = 'calc(100% - 80px)';
        toggleButton.style.left = '60px';
        toggleButton.classList.add("collapsed");
        toggleButton.classList.remove("expanded");
        // Nếu ban đầu là mở rộng, ẩn phần username và mở rộng lại menu navigation
        username.classList.add('collapsed');
        navigation.style.width = '200px';
    }

    // Lấy danh sách các mục menu
    const menuItems = document.querySelectorAll('.list .text');

    // Kiểm tra trạng thái ban đầu của taskbar
    if (!isExpanded) {
        // Nếu ban đầu là thu gọn, chuyển các icon về văn bản tương ứng
        menuItems.forEach(span => {
            switch (span.innerHTML.trim()) {
                case '<i class="fas fa-home"></i>':
                    span.innerHTML = 'Home';
                    break;
                case '<i class="fas fa-user"></i>':
                    span.innerHTML = 'Profile';
                    break;
                case '<i class="fas fa-envelope"></i>':
                    span.innerHTML = 'Messages';
                    break;
                case '<i class="fas fa-search"></i>':
                    span.innerHTML = 'Search';
                    break;
                case '<i class="fas fa-cog"></i>':
                    span.innerHTML = 'Settings';
                    break;
                default:
                    break;
            }
        });
    } else {
        // Nếu ban đầu là mở rộng, chuyển các văn bản về icon tương ứng
        menuItems.forEach(span => {
            switch (span.innerHTML.trim()) {
                case 'Home':
                    span.innerHTML = '<i class="fas fa-home"></i>';
                    break;
                case 'Profile':
                    span.innerHTML = '<i class="fas fa-user"></i>';
                    break;
                case 'Messages':
                    span.innerHTML = '<i class="fas fa-envelope"></i>';
                    break;
                case 'Search':
                    span.innerHTML = '<i class="fas fa-search"></i>';
                    break;
                case 'Settings':
                    span.innerHTML = '<i class="fas fa-cog"></i>';
                    break;
                default:
                    break;
            }
        });
    }
}


function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}';
}

let isChatEmpty = true; // Biến kiểm tra khung chat có rỗng hay không
function createMessage(text, isUserMessage) {
    const chatArea = document.querySelector('.chat-area');
    const activeChat = document.querySelector('.user-chat.active .user-message-container');

    // Chỉ gửi tin nhắn của người dùng đến server
    if (isUserMessage) {
        // Tạo đối tượng dữ liệu để gửi tới server
        const messageData = {
            text: text,
            isUserMessage: isUserMessage
        };

        // Gửi yêu cầu tới server sử dụng Fetch API
        fetch('http://localhost:3000/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            const replyMessage = data.message; // Lấy phản hồi từ server
            displayMessage(replyMessage, false); // Hiển thị phản hồi trong khung chat
        })
        .catch(error => {
            console.error('Lỗi khi gửi tin nhắn:', error);
        });
    }

    // Tạo các thành phần UI cho tin nhắn mới
    const newMessageContainer = document.createElement('div');
    newMessageContainer.classList.add('message-container');

    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = isUserMessage ? 'Người dùng: ' + text : 'Phản hồi: ' + text;

    const avatar = document.createElement('img');
    avatar.src = "./img/avt.jpg";
    avatar.alt = "User Avatar";
    avatar.classList.add("user-avatar");

    const starButton = document.createElement('button');
    starButton.innerHTML = '<i class="fas fa-star"></i>';
    starButton.classList.add("star-button");

    starButton.addEventListener('click', function() {
        // Xử lý khi người dùng nhấn nút star (nếu cần)
    });

    if (!isUserMessage) {
        newMessageContainer.classList.add('reply-message');
        newMessageContainer.appendChild(avatar);
        newMessageContainer.appendChild(newMessage);
    } else {
        newMessageContainer.classList.add('user-message');
        newMessageContainer.appendChild(newMessage);
        newMessageContainer.appendChild(avatar);
    }

    newMessageContainer.appendChild(starButton);
    activeChat.appendChild(newMessageContainer);

    // Kiểm tra xem khung chat có rỗng không
    const isChatEmpty = (activeChat.children.length === 0);

    if (isChatEmpty) {
        const noMessageText = document.querySelector('.no-message-text');
        noMessageText.style.display = 'none';
    }
}

// Hàm hiển thị phản hồi từ server trong khung chat
function displayMessage(message, isUserMessage) {
    const activeChat = document.querySelector('.user-chat.active .user-message-container');

    // Kiểm tra xem khung chat có tồn tại không
    if (!activeChat) {
        console.error('Không tìm thấy container để hiển thị tin nhắn.');
        return;
    }

    // Tạo container cho tin nhắn mới
    const newMessageContainer = document.createElement('div');
    newMessageContainer.classList.add('message-container');

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.message { white-space: pre-wrap; }', 0);

    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = isUserMessage ? 'Người dùng: ' + message : 'Phản hồi: ' + message;
    document.body.appendChild(newMessage);



    const avatar = document.createElement('img');
    avatar.src = "./img/avt.jpg";
    avatar.alt = "User Avatar";
    avatar.classList.add("user-avatar");

    newMessageContainer.appendChild(newMessage);
    newMessageContainer.appendChild(avatar);

    // Thêm tin nhắn mới vào chat
    activeChat.appendChild(newMessageContainer);

    // Kiểm tra xem khung chat có rỗng không và ẩn thông báo "không có tin nhắn" nếu cần
    const noMessageText = document.querySelector('.no-message-text');
    if (noMessageText && activeChat.children.length > 0) {
        noMessageText.style.display = 'none';
    }
}


// Gọi hàm createMessage từ client (ví dụ: khi người dùng gửi tin nhắn)
const sendButton = document.querySelector('.send-button');
const messageInput = document.querySelector('.message-input');

sendButton.addEventListener('click', function() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        createMessage(message, true);
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});



function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Lấy giờ hiện tại và thêm số 0 đằng trước nếu cần
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Lấy phút hiện tại và thêm số 0 đằng trước nếu cần
    return hours + ':' + minutes; // Trả về chuỗi định dạng giờ:phút
}







function createNewChat() {
    document.querySelectorAll('.suggestion-btn').forEach(function(button) {
        button.style.display = 'block';
    });
    const activeChatContainer = document.querySelector('.chat-container.user-chat.active');
    const activeChat = activeChatContainer.querySelector('.user-message-container');
    activeChat.innerHTML = '';
    const timeSpan = document.createElement('span');
    timeSpan.innerHTML = getCurrentTime();
    timeSpan.classList.add('message-time');

    // Thêm thời gian vào tin nhắn container
    activeChat.appendChild(timeSpan);

    // Hiển thị lại văn bản ở giữa khi không có tin nhắn trong khung chat
    const noMessageText = document.querySelector('.no-message-text');
    noMessageText.style.display = 'block';

    // Hiển thị lại các nút suggestion
    document.querySelector('.suggestions').style.display = 'flex';
}






const dislikeButton = document.querySelector('.dislike-button');

function createMessage(text, isUserMessage) {
    const chatArea = document.querySelector('.chat-area');
    const activeChat = document.querySelector('.user-chat.active .user-message-container');

    // Lấy giá trị từ ô nhập số (num-input)
    const numInput = document.querySelector('.num-input');
    const numberOfReplies = parseInt(numInput.value); // Chuyển đổi giá trị sang kiểu số nguyên

    // Xử lý gửi tin nhắn của người dùng đến server
    if (isUserMessage) {
        const messageData = {
            text: text,
            isUserMessage: isUserMessage,
            numberOfReplies: numberOfReplies // Gửi số lượng phản hồi cùng với tin nhắn
        };

        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:3000/sendMessage';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const replyMessages = response.messages;
        
                // Tạo tin nhắn phản hồi theo số lượng đã nhận từ server
                for (let i = 0; i < replyMessages.length; i++) {
                    createMessage(replyMessages[i], false);
                }
            }
        };
        

        xhr.send(JSON.stringify(messageData));
    }

    // Tạo các thành phần UI cho tin nhắn mới
    const newMessageContainer = document.createElement('div');
    newMessageContainer.classList.add('message-container');

    const newMessage = document.createElement('div');
    newMessage.classList.add('message', 'typing');  // Thêm class 'typing' để áp dụng animation
    newMessage.innerHTML = isUserMessage ? 'Người dùng: ' : 'Phản hồi: '; // Ban đầu để trống nội dung
    newMessage.style.whiteSpace = 'pre-wrap'; 
    activeChat.appendChild(newMessageContainer);
    newMessageContainer.appendChild(newMessage);
    let i = 0;
    const typingSpeed = 1; // Tốc độ gõ chữ, thời gian tính bằng ms
    function typeWriter() {
        if (i < text.length) {
            newMessage.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            newMessage.classList.remove('typing'); // Xóa class 'typing' khi hoàn tất gõ chữ
        }
    }
    setTimeout(typeWriter, typingSpeed);

    const avatar = document.createElement('img');
    avatar.src = "./img/avt.jpg";
    avatar.alt = "User Avatar";
    avatar.classList.add("user-avatar");

    const starButton = document.createElement('button');
    starButton.innerHTML = '<i class="fas fa-star"></i>';
    starButton.classList.add("star-button");

    starButton.addEventListener('click', function() {
        const messageText = newMessage.innerHTML;
        saveMessageToData(messageText);
        showMessageSavedSuccessfully();
    });

    const reactionButtons = document.createElement('div');
    reactionButtons.classList.add('reaction-buttons');

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    likeButton.onclick = function() { alert('Liked!'); };

    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('dislike-button');
    dislikeButton.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    dislikeButton.onclick = function() { alert('Disliked!'); };

    reactionButtons.appendChild(likeButton);
    reactionButtons.appendChild(dislikeButton);


    if (!isUserMessage) {
        newMessageContainer.classList.add('reply-message');
        newMessageContainer.appendChild(avatar);
        newMessageContainer.appendChild(newMessage);
    } else {
        newMessageContainer.classList.add('user-message');
        newMessageContainer.appendChild(newMessage);
        newMessageContainer.appendChild(avatar);
    }

    likeButton.onclick = function() {
        sendFeedback(text, true); // true cho biết dự đoán là đúng
    };
    
    dislikeButton.onclick = function() {
        sendFeedback(text, false); // false cho biết dự đoán là sai
    };
    

    newMessageContainer.appendChild(starButton);
        newMessageContainer.appendChild(reactionButtons); // Ensure this is at the bottom

    activeChat.appendChild(newMessageContainer);
    activeChat.appendChild(newMessageContainer);

    // Kiểm tra xem khung chat có rỗng không
    const isChatEmpty = (activeChat.children.length === 0);

    if (isChatEmpty) {
        const noMessageText = document.querySelector('.no-message-text');
        noMessageText.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');

    if (likeButton) {
        likeButton.addEventListener('click', function(event) {
            sendFeedback("Current problem text", true, event);
        });
    } else {
        console.error('Like button not found');
    }

    if (dislikeButton) {
        dislikeButton.addEventListener('click', function(event) {
            sendFeedback("Current problem text", false, event);
        });
    } else {
        console.error('Dislike button not found');
    }
}
console.log(document.getElementById('like-button'));
console.log(document.getElementById('dislike-button'));
function sendSuggestion(message) {
    createMessage(message, true); // true nghĩa là tin nhắn này là của người dùng
    document.querySelector('.message-input').value = message; // Điền tin nhắn vào khung nhập
    document.querySelector('.no-message-text').style.display = 'none'; // Ẩn chữ welcome
}

document.querySelector('.message-input').addEventListener('input', function() {
    document.querySelector('.suggestions').style.display = 'none';
});
function sendFeedback(inputText, isCorrect, event) {
    event.preventDefault();  // This will prevent the default form submission behavior.

    const feedbackData = { input: inputText, isCorrect: isCorrect };
    const xhr = new XMLHttpRequest();
    const feedbackUrl = 'http://localhost:3000/feedback';

    xhr.open('POST', feedbackUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Feedback sent successfully');
            retrainModel(inputText); // Tái huấn luyện mô hình và dự đoán lại
        } else {
            console.error('Error sending feedback');
        }
    };
    xhr.send(JSON.stringify(feedbackData));
}

// Modify your button click handlers to pass the event:
document.getElementById('like-button').addEventListener('click', function(event) {
    sendFeedback("Current problem text", true, event); // Example text, replace with actual problem text
});

document.getElementById('dislike-button').addEventListener('click', function(event) {
    sendFeedback("Current problem text", false, event); // Example text, replace with actual problem text
});





// Xử lý sự kiện click vào nút "Start"
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            const message = 'Nội dung tin nhắn mà bạn muốn lưu vào file data.json';
            saveMessageToData(message);
        });
    } 
});

// Hàm gửi yêu cầu POST để lưu tin nhắn vào file data.json
function saveMessageToData(message) {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:3000/save-message'; // Endpoint của server

    const data = {
        message: message
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Tin nhắn đã được lưu thành công vào file data.json!');
            } else {
                alert('Đã xảy ra lỗi khi lưu tin nhắn vào file data.json.');
            }
        }
    };

    xhr.send(JSON.stringify(data));
}


// Sự kiện DOMContentLoaded được đặt ở cuối để đảm bảo các hàm đã được định nghĩa trước khi sử dụng
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.querySelector('.send-button');
    const messageInput = document.querySelector('.message-input');

    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            createMessage(message, true);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {   
            sendButton.click();
        }
    });

    const newChatButton = document.getElementById('new-chat-button');
    newChatButton.addEventListener('click', createNewChat);

    const chatObserver = new MutationObserver(function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const newMessages = mutation.target.querySelectorAll('.message-container');
                newMessages.forEach(function(newMessage) {
                    const messageType = newMessage.getAttribute('data-type');
                    if (messageType === 'user') {
                        const messageText = newMessage.querySelector('.message').innerHTML;
                        createMessage(messageText, false);
                    }
                });
            }
        });
    });

    const chatContainer = document.querySelector('.chat');
    chatObserver.observe(chatContainer, { childList: true });
});
function showMessageSavedSuccessfully() {
    console.log('Message saved successfully!');
    // Implement your UI logic here (e.g., show a success message)
}
function redirectToHistory() {
    const historyPageUrl = '../history/history.html';
    window.location.href = historyPageUrl;
}


document.getElementById('toggle-theme').addEventListener('click', function() {
    const body = document.body;
    const waveOverlay = document.getElementById('wave-overlay');
    const isPressed = this.getAttribute('aria-pressed') === 'true';
    this.setAttribute('aria-pressed', !isPressed);
    // Hiển thị làn sóng bằng cách di chuyển nó vào màn hình
    waveOverlay.style.left = '0'; // Di chuyển làn sóng vào màn hình
  
    // Thiết lập thời gian chờ để hoàn thành animation
    setTimeout(function() {
      body.classList.toggle('dark-mode'); // Chuyển đổi chế độ sáng/tối
      waveOverlay.style.left = '100%'; // Di chuyển làn sóng ra khỏi màn hình phía bên phải và giữ nó ở đó
    }, 1000); // Đợi 1 giây để hoàn thành animation
  });
  

// Khi tải trang, áp dụng chế độ đã được lưu
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});


console.log(startButton);
console.log('Text:', text);
console.log('isUserMessage:', isUserMessage);
console.log('Request ID:', requestId);
console.log('Message:', message);
console.log('New Message Container:', newMessageContainer);
