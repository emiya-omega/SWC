window.onload = function() {
    // phone 参数从用户登录状态中获取，例如 localStorage 或 sessionStorage别瞎吉尔写
    const userPhone = localStorage.getItem('userPhone'); // 动态获取 phone 参数

    if (!userPhone) {
        console.error('用户未登录或登录状态丢失');
        return;
    }

    fetch(`/userName?phone=${userPhone}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('userName').textContent = data.data; // 更新用户名显示
        } else {
            console.error('获取用户信息失败:', data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
};