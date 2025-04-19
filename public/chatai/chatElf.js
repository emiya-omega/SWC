document.addEventListener('DOMContentLoaded', function() {
    //const chatHistory = document.getElementById('chat-history');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-buttons');

    // 发送消息事件
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        sendMessage(message);
        messageInput.value = ''; // 清空输入框
    });

    //这个是推荐话题监听
    const topicButton=document.querySelectorAll('.empty-name');
    topicButton.forEach((topicB)=>{
        topicB.addEventListener('click',function(){
            const textContent = topicB.querySelector('p').textContent;
            sendMessage(textContent);
        });
    });

    //向后端发请求
   


    // 监听回车键发送消息
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
            messageInput.value = ''; // 清空输入框
        }
    });
});
const chatHistory=document.getElementById('chat-history');
let chatHistoryArray = []; // 新增一个数组用于存储对话历史

function sendMessage(message) {
    if (message) {
        const messageElement2 = document.createElement('div');
        messageElement2.className = 'flex justify-end';
        messageElement2.innerHTML = `<div class="chat-bubble-user px-6 py-4 max-w-[580px]"><p class="text-gray-800">${message}</p></div>`;
        chatHistory.appendChild(messageElement2);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // 将用户输入添加到对话历史数组
        chatHistoryArray.push({ role: 'user', content: message });
        if (chatHistoryArray.length > 5) {
            chatHistoryArray.shift(); // 限制数组长度为5
        }

        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message, history: chatHistoryArray }), // 发送对话历史
        })
        .then(response => response.json())
        .then(data => {
            const aiMessage = data.message || '抱歉，未能理解您的问题。';
            const messageElement = document.createElement('div');
            messageElement.className = 'flex justify-start';
            messageElement.innerHTML = `<div class="chat-bubble-ai px-6 py-4 max-w-[580px]"><p class="text-gray-800">${aiMessage}</p></div>`;
            chatHistory.appendChild(messageElement);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            // 将模型回复添加到对话历史数组
            chatHistoryArray.push({ role: 'assistant', content: aiMessage });
            if (chatHistoryArray.length > 5) {
                chatHistoryArray.shift(); // 限制数组长度为5
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
function navigateTohome(){
    window.location.href='../homepage/home.html';
}
function navigateToStoryIsland() {
    window.location.href='../ai-story/frontend/nowstory.html';
}

function navigateToAnimationHouse() {
    window.location.href='../animation/mation.html';
}

/*function navigateToAIChat() {
    alert('正在前往 AI 对话精灵...');
}*/

function navigateToTaskCards() {
    window.location.href='../parentchild/pa-ch.html';
}

function navigateToAchievementGarden() {
    window.location.href='../achievement/achieve.html';
}


function showModal() {
    const modal = document.getElementById('medalModal');
    modal.classList.remove('hidden'); // 移除 hidden 类，显示模态框
}

// 隐藏模态框
function hideModal() {
    const modal = document.getElementById('medalModal');
    modal.classList.add('hidden'); // 添加 hidden 类，隐藏模态框
}

// 语音识别功能
document.getElementById('microphoneButton').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.textContent = '正在监听...';

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = '识别结果：' + transcript;
        document.getElementById('confirmButton').dataset.transcript = transcript;
    };
   // 

    recognition.onerror = (event) => {
        console.error('语音识别错误：', event.error);
        output.textContent = '语音识别错误：' + event.error;
    };

    recognition.onend = () => {
        console.log('语音识别结束');
    };
    
    recognition.start();
    
});
function successModal(){
    const transcript = document.getElementById('confirmButton').dataset.transcript;
    if (transcript) {
        
            hideModal(); 
            
            sendMessage(transcript); // 调用 successModal 函数并传递 transcript
           
    } else {
        alert('请先进行语音识别！');
    }
}


