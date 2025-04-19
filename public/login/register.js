document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value; // 新增 nickname 获取
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const password = document.querySelector('input[type="password"]').value;
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : null;

    if (!nickname || !phone || !age || !gender || !password || password !== confirmPassword) {
        alert('请检查输入信息');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, phone, age, gender, password }) // 新增 nickname 提交
        });
        const data = await response.json();
        if (data.success) {
            alert('注册成功');
        } else {
            alert(data.message || '注册失败');
        }
    } catch (error) {
        alert('网络错误');
    }
});