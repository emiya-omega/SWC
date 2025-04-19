// 全局状态
let currentSceneId = 'start';

// 初始化故事
document.addEventListener('DOMContentLoaded', () => {
  loadScene(currentSceneId);
});

// 加载场景
async function loadScene(sceneId) {
  showLoading(true);
  
  try {
    const response = await fetch('http://localhost:3000/api/scenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sceneId })
    });

    if (!response.ok) throw new Error('网络响应异常');
    
    const scene = await response.json();
    
    // 更新DOM
    document.querySelector('.scene').style.backgroundImage = `url('${scene.image}')`;
    document.getElementById('story-text').textContent = scene.text;
    
    // 清空并重建选项按钮
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    scene.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.onclick = () => {
        playSound(`assets/sounds/click.mp3`);
        loadScene(choice.nextId);
      };
      choicesContainer.appendChild(btn);
    });
    
  } catch (error) {
    console.error('加载失败:', error);
    document.getElementById('story-text').textContent = `加载失败: ${error.message}`;
  } finally {
    showLoading(false);
  }
}

// 显示/隐藏加载状态
function showLoading(show) {
  document.getElementById('loading').classList.toggle('hidden', !show);
}

// 播放音效
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play().catch(e => console.log("音效播放失败:", e));
}
//---------------------------监听--------------------------------------------------------------------
function navigateTohome()
{
  window.location.href='../../homepage/home.html';
}
/*function navigateToStoryIsland() {
  window.location.href='../../';
}*/

function navigateToAnimationHouse() {
  window.location.href='../../animation/mation.html';
}

function navigateToAIChat() {
  window.location.href='../../chatai/chatElf.html';
}

function navigateToTaskCards() {
  window.location.href='../../parentchild/pa-ch.html';
}

function navigateToAchievementGarden() {
  window.location.href='../../achievement/achieve.html';
}
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('jane').addEventListener('click',function(e){
    e.preventDefault();
    window.open('../janestory/jane.html','_blank');
  })
})