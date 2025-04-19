const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const bcrypt = require('bcrypt');
const path = require('path');
const storyData = require('./public/ai-story/frontend/story-data.json');
const fs = require('fs');
const app = express();
app.use(express.static('public'));

// 引入 axios 用于发送 HTTP 请求
const axios = require('axios');

// 数据库连接池
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'SpyZjh2023',
    database: 'studywork',
    connectionLimit: 5
});

// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 注册 API
app.post('/api/register', async (req, res) => {
    const { phone, nickname, age, gender, password } = req.body; 

    // 检查用户是否已存在
    const conn = await pool.getConnection();
    try {
        const existingUser = await conn.query('SELECT * FROM users WHERE phone = ? OR nickname = ?', [phone, nickname]);
        if (existingUser.length > 0) {
            return res.json({ success: false, message: '用户已存在' });
        }

        // 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入新用户
        await conn.query(
            'INSERT INTO users (phone, nickname, age, gender, password) VALUES (?, ?, ?, ?, ?)',
            [phone, nickname, age, gender, hashedPassword]
        );
        res.json({ success: true, message: '注册成功' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: '服务器错误' });
    } finally {
        conn.release();
    }
});

// 登录 API
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const conn = await pool.getConnection();
    try {
        const user = await conn.query('SELECT * FROM users WHERE phone = ? ', [username]);
        if (user.length === 0) {
            return res.json({ success: false, message: '用户不存在' });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.json({ success: false, message: '密码错误' });
        }

        res.json({ success: true, message: '登录成功' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: '服务器错误' });
    } finally {
        conn.release();
    }
});



// 新增 /send-message API 路由
app.post('/send-message', async (req, res) => {
    const { message, history } = req.body; // 接收对话历史

    if (!message) {
        return res.json({ success: false, message: '消息不能为空' });
    }

    try {
        const apiKey = 'sk-8a63bd3075ff41eaae33632a25759760'; 
        const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'; 

        // 构造完整的对话历史
        let fullPrompt = `
            你是一个专为学龄前儿童设计的友好、耐心且知识丰富的 AI 对话精灵，名叫“小智”。
            你的主要任务是帮助孩子们学习新知识、解答他们的问题，并通过互动激发他们的好奇心和创造力。
            同时，你也能够为家长和老师提供育儿建议或教学灵感。

            在与用户互动时，请遵循以下原则：
            1. 语言简单易懂：使用适合学龄前儿童的语言，避免复杂词汇和抽象概念。
            2. 积极正面：始终保持友好、鼓励和乐观的语气，传递正能量。
            3. 安全可靠：确保所有回答符合儿童教育标准，不包含任何敏感、危险或不适合的内容。
            4. 寓教于乐：结合故事、游戏、歌曲或其他有趣的方式进行教学。
            5. 多角色支持：
               - 如果用户是孩子，用生动有趣的语言引导他们探索世界。
               - 如果用户是家长或老师，提供科学实用的建议，帮助他们更好地陪伴孩子成长。

            如果遇到无法回答的问题，可以礼貌地告诉用户：“这个问题有点难哦！我们可以一起查资料或者问问爸爸妈妈/老师。”
        `;

        if (history && Array.isArray(history)) {
            fullPrompt += '\n\n对话历史：\n';
            history.forEach((item, index) => {
                fullPrompt += `${index + 1}. ${item.role === 'user' ? '用户' : 'AI'}: ${item.content}\n`;
            });
        }

        fullPrompt += `\n当前用户输入：${message}`;

        const response = await axios.post(
            apiUrl,
            {
                model: 'qwen-turbo',
                input: {
                    prompt: fullPrompt, 
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reply = response.data.output?.text || '抱歉，未能理解您的问题。';
        res.json({ success: true, message: reply });
    } catch (error) {
        console.error('调用通义千问-Turbo模型失败:', error.response ? error.response.data : error.message);
        res.json({ success: false, message: '服务器错误，请稍后再试。' });
    }
});

app.use(express.static(path.join(__dirname, 'public/')));

// API路由
app.post('/api/scenes', (req, res) => {
  try {
    const { sceneId } = req.body;

    // 确保 storyData 已正确加载
    if (!storyData || !storyData.scenes) {
      throw new Error('故事数据未正确加载');
      
    }

    // 获取指定场景或默认场景
    const scene = storyData.scenes[sceneId] || storyData.scenes['default'];
    if (!scene) {
      throw new Error('未找到指定场景');
    }

    // 模拟处理延迟并返回场景数据
    setTimeout(() => {
      res.json({
        text: scene.text,
        choices: scene.choices || [],
        image: scene.image ? `/assets/images/${scene.image}` : null
      });
    }, 800);

  } catch (error) {
    console.error('API 错误:', error.message);
    res.status(500).json({
      error: '服务器内部错误',
      message: error.message
    });
  }
});
app.get('/', (req, res) => {
  res.redirect('/login/login-child.html');
  //login-st-ad
});

// 调用阿里云百炼 API 获取故事数据并保存到 story-data.json
async function fetchAndSaveStoryData() {
  const apiKey = 'sk-8a63bd3075ff41eaae33632a25759760';
  const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

  const prompt = `你是一位充满创意和智慧的童话故事讲述者，正在为一个学前教育平台上的“晚安故事岛”功能生成互动式童话故事。请根据以下规则生成一个简短的童话故事，并提供分支选项供用户选择。



          规则：

          故事主题：以温馨、有趣、教育意义为核心，适合3-6岁儿童。

          故事长度：每段叙述不超过80字，确保内容简洁易懂。

          分支设计：每次提供2-3个选项，让用户选择接下来的故事发展。

          分支次数：总共允许用户选择4次分支（包括最终结局）。

          结局多样性：每个分支路径都有独特的结局，鼓励积极价值观（如勇敢、善良、合作等）。

          语气风格：语言活泼生动，使用简单词汇和拟人化手法吸引孩子注意力。

          示例结构：

          初始故事：

          在一个遥远的森林里，小兔子莉莉发现了一扇神秘的门。“这扇门后面会是什么呢？”莉莉好奇地想。



          请选择：

          A. 莉莉推开门，走进去一探究竟。



          B. 莉莉叫上她的好朋友小熊一起去看看。



          用户选择后的延续：

          （根据用户选择继续展开情节，逐步引入新的场景和决策点，直到第四次分支后呈现结局。）
          确保nextId指向的scenes必须存在

          返回样例json：

          {

          "scenes": {

          "start": {

          "text": "在一个阳光明媚的早晨，小松鼠奇奇在树洞里发现了一封神秘信件。‘亲爱的奇奇，如果你想知道你的祖先是谁，请找到山顶的老橡树。’ 奇奇好奇极了。",

          "choices": [

          { "text": "立刻出发去山顶", "nextId": "go-to-hill" },

          { "text": "先问问妈妈", "nextId": "ask-mom" }

          ]

          },

          "go-to-hill": {

          "text": "奇奇蹦蹦跳跳地跑向山顶，途中遇到了迷路的小鸟皮皮。",

          "choices": [

          { "text": "帮助皮皮找到回家的路", "nextId": "help-bird" },

          { "text": "自己赶路", "nextId": "continue-alone" }

          ]

          },

          "help-bird": {

          "text": "皮皮感激地带着奇奇飞过树林，最终来到了老橡树下。",

          "choices": [

          { "text": "仔细观察老橡树", "nextId": "inspect-tree" },

          { "text": "坐下来休息一下", "nextId": "rest" }

          ]

          },

          "inspect-tree": {

          "text": "奇奇在树干上发现了一个隐藏的洞口，里面似乎藏着什么宝贝！",

          "choices": [

          { "text": "钻进去看看", "nextId": "enter-tree" },

          { "text": "叫来朋友们一起探索", "nextId": "call-friends" }

          ]

          },

          "enter-tree": {

          "text": "哇！里面有一个装满坚果的宝箱，原来这是祖先留给奇奇的礼物！奇奇学会了分享，邀请所有动物朋友一起享用。",

          "choices": []

          },

          "ask-mom": {

          "text": "妈妈告诉奇奇关于老橡树的秘密，还给了他一张地图。",

          "choices": [

          { "text": "按照地图直接去山顶", "nextId": "follow-map" },

          { "text": "带上妈妈一起去", "nextId": "go-with-mom" }

          ]

          },

          "follow-map": {

          "text": "奇奇独自沿着地图指引来到老橡树，却发现树旁有个陷阱。",

          "choices": [

          { "text": "想办法解救被困的小刺猬", "nextId": "rescue-hedgehog" },

          { "text": "小心绕开陷阱继续前进", "nextId": "avoid-trap" }

          ]

          },

          "rescue-hedgehog": {

          "text": "小刺猬非常感谢奇奇，带领他找到了通往树洞的秘密入口。",

          "choices": [

          { "text": "勇敢地进入树洞", "nextId": "enter-tree-rescue" },

          { "text": "在外面等待救援队", "nextId": "wait-for-help" }

          ]

          },

          "enter-tree-rescue": {

          "text": "奇奇发现了祖先留下的坚果宝箱，并用这些坚果种出了更多树木，让森林变得更加茂密。",

          "choices": []

          },

          "default": {

          "text": "故事还在创作中，请期待后续发展...",

          "choices": [

          { "text": "重新开始", "nextId": "start" }

          ]

          }

          }

          }`; // 后面可以把prompt内容写到文件中，然后调用api

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'qwen-turbo',
        input: {
          prompt: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 清理返回数据，移除可能存在的代码块标记，这个必须有
    let rawResponse = response.data.output.text;
    if (rawResponse.startsWith('```json')) {
      rawResponse = rawResponse.slice(7).trim(); // 移除开头的 ```json
    }
    if (rawResponse.endsWith('```')) {
      rawResponse = rawResponse.slice(0, -3).trim(); // 移除结尾的 ```
    }

    // 解析清理后的 JSON 数据
    const storyContent = JSON.parse(rawResponse);

    // 将解析后的数据写入 public/ai-story/frontend/story-data.json
    fs.writeFileSync(path.join(__dirname, './public/ai-story/frontend/story-data.json'), JSON.stringify(storyContent, null, 2));
    console.log('故事数据已成功保存到 public/ai-story/frontend/story-data.json');
  } catch (error) {
    console.error('调用阿里云百炼 API 失败:', error.message);
    // 防止服务器因单次 API 调用失败而崩溃，也方便排点错
    if (error.message.includes('Unexpected token')) {
      console.error('返回数据格式异常，请检查 API 返回内容是否为有效 JSON');
      console.error('原始返回数据:', error.response?.data || '无详细数据');
    }
  }
}


// 启动服务器时调用 fetchAndSaveStoryData(这个策略后面还得改)
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
  fetchAndSaveStoryData();
});
