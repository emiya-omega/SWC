const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 确保uploads目录存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../public')));

// 解析JSON请求体
app.use(express.json());

// 设置文件存储




//---------------------------
//                               登录
app.get('/login',(req,res)=>{
    const {username,password}=req.query;
    if(username==='child'&&password==='123')
    {
        res.json({success : true});
    }
    else{
        res.json({success : false});
    }
})
//------------------------------------




//                             注册
app.get('/api/register',(req,res)=>{
    const {phone,age,gender,password}=req.query;
    res.json({success:true});
})
//-------------------------------------------------




//                         个人信息页面
const userdata={
    username:'张家豪',//这个地方应该是id账号不是名字定义错了（问就是故意的）
    age:3,
    gender:'male'
}
app.get('/api/user/info',(req,res)=>{
    res.json(userdata);
})
//--------------------------------------------------------------------


//                 aistory
//-------------------------------------------
//                     achieve--time这是个勋章只写了第一个听故事时长的其他没写 半成品！！！
const userachievetime={
    watchTime:30
}
app.get('/api/medal-detail',(req,res)=>{
    res.json(userachievetime);
})
//---------------------------------------
//                           人机对话
let messages=[];
app.post('/send-message', (req, res) => {
    const newMessage = req.body.message;
    if (newMessage) {
        messages.push({ text: newMessage, createdAt: new Date().toISOString() });
        res.status(201).json({ message: { text: newMessage, createdAt: new Date().toISOString() } });
    } else {
        res.status(400).send('No message provided');
    }
});

//-------------------------------------------------------------
app.get('/', (req, res) => {
    res.redirect('/login/login-child.html');
    //login-st-ad
});

app.listen(port, () => {
    console.log(`服务器运行在 http://10.10.79.237:${port}`);
});