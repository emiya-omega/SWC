document.addEventListener('DOMContentLoaded',function(e){
    e.preventDefault();
    fetch('/api/medal-detail').then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data)=>{
        const watchTimes=data.watchTime;
        const medalItems=document.querySelectorAll('.medal-empty');

        const medals=[
            { level: "青铜", threshold: 5,conditions:'聆听故事5分钟',dataFrom:'2025-3-20' },
        { level: "白银", threshold: 15,conditions:'聆听故事5分钟',dataFrom:'2025-3-20'},
        { level: "黄金", threshold: 30,conditions:'聆听故事5分钟',dataFrom:'2025-3-20'},
        {level:  "钻石",  threshold:60,conditions:'聆听故事5分钟',dataFrom:'2025-3-20'}
        ]

        medals.forEach((medal,index)=>{
            const medalItem=medalItems[index];
            
            if(watchTimes>=medal.threshold)
            {
                medalItem.classList.add('active','cursor-pointer');
                medalItem.onclick=function()
                {
                    showMedalDetail('智慧观影时',medal.level,medal.conditions,medal.dataFrom);
                };
            }
            if(watchTimes<medal.threshold)
            {
                medalItem.classList.add('inactive','cursor-not-allowed');
            }
        })
      }).catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
})
function showMedalDetail(title, level, condition, date) {
    const modal = document.getElementById('medalModal');
    const medalTitle = document.getElementById('medalTitle');
    const medalLevel = document.getElementById('medalLevel');
    const medalCondition = document.getElementById('medalCondition');
    const medalDate = document.getElementById('medalDate');
    const medalIcon = document.getElementById('medalIcon');
    const medalProgress = document.getElementById('medalProgress');
    medalTitle.textContent = title;
    medalLevel.textContent = level;
    medalCondition.textContent = condition;
    medalDate.textContent = date;
    // 设置勋章图标样式
    medalIcon.className =
        'w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold';
    if (level === '青铜') {
        medalIcon.classList.add('bg-gradient-to-br', 'from-yellow-600', 'to-yellow-400');
        medalIcon.innerHTML = '<i class="fas fa-medal"></i>';
    } else if (level === '白银') {
        medalIcon.classList.add('bg-gradient-to-br', 'from-gray-300', 'to-gray-200');
        medalIcon.innerHTML = '<i class="fas fa-medal"></i>';
    } else if (level === '黄金') {
        medalIcon.classList.add('bg-gradient-to-br', 'from-yellow-300', 'to-yellow-200');
        medalIcon.innerHTML = '<i class="fas fa-medal"></i>';
    } else {
        medalIcon.classList.add('bg-gradient-to-br', 'from-blue-300', 'to-blue-200');
        medalIcon.innerHTML = '<i class="fas fa-medal"></i>';
    }
    // 设置进度条
    const randomProgress = Math.floor(Math.random() * 30) + 70;
    medalProgress.style.width = `${randomProgress}%`;
    modal.classList.remove('hidden');
}

function hideMedalDetail() {
    const modal = document.getElementById('medalModal');
    modal.classList.add('hidden');
}
//导航栏监听
function navigateTohome(){
    window.location.href='../homepage/home.html';
}
function navigateToStoryIsland() {
    window.location.href='../ai-story/frontend/nowstory.html';
}

function navigateToAnimationHouse() {
    window.location.href='../animation/mation.html';
}

function navigateToAIChat() {
    window.location.href='../chatai/chatElf.html';
}

function navigateToTaskCards() {
    window.location.href='../parentchild/pa-ch.html';
}

/*function navigateToAchievementGarden() {
    window.location.href='../achievement/achieve.html';
}*/