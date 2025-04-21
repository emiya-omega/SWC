document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value; // 支持 phone 或 nickname
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            // 将 phone 存储到 localStorage
            localStorage.setItem('userPhone', data.phone); 
            window.location.href = '../homepage/home.html';
        } else {
            alert(data.message || '登录失败');
        }
    } catch (error) {
        alert('网络错误');
    }
});