/*document.addEventListener('DOMContentLoaded',function(e){
    e.preventDefault();
    fetch('/api/medal-detail').then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data)=>{
        const watchTimes = data.find(item => item.watchTime)?.watchTime || 0;
         const medalItemsWatch=document.querySelectorAll('.medal-empty');
        watchJudgements(watchTimes,medalItemsWatch);

        const listenTimes = data.find(item => item.listenTime)?.listenTime || 0;
        const medalItemsListen=document.querySelectorAll('.medal-empty2');
        listenJudgements(listenTimes,medalItemsListen);

        const workCounts = data.find(item => item.workCount)?.workCount || 0;
        const medalItemswork=document.querySelectorAll('.medal-empty3');
        countswork(workCounts,medalItemswork);

        const exchangeCounts=data.find(item=>item.exchangeCount)?.exchangeCount||0;
        const medalItemschange=document.querySelectorAll('.medal-empty4');
        changejudg(exchangeCounts,medalItemschange);

        /*const medals=[
            { level: "青铜", threshold: 5,conditions:'观看故事5分钟',dataFrom:'2025-3-20' },
        { level: "白银", threshold: 15,conditions:'故事观看5分钟',dataFrom:'2025-3-20'},
        { level: "黄金", threshold: 30,conditions:'观看故事5分钟',dataFrom:'2025-3-20'},
        {level:  "钻石",  threshold:60,conditions:'观看故事5分钟',dataFrom:'2025-3-20'}
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
*/
        const watchTimes = 0;
         const medalItemsWatch=document.querySelectorAll('.medal-empty');
        watchJudgements(watchTimes,medalItemsWatch);

        const listenTimes = 0;
        const medalItemsListen=document.querySelectorAll('.medal-empty2');
        listenJudgements(listenTimes,medalItemsListen);

        const workCounts = 0;
        const medalItemswork=document.querySelectorAll('.medal-empty3');
        countswork(workCounts,medalItemswork);

        const exchangeCounts=0;
        const medalItemschange=document.querySelectorAll('.medal-empty4');
        changejudg(exchangeCounts,medalItemschange);

function watchJudgements(watchTimes,medalItemFirst)
{
    const medals=[
        { level: "青铜", threshold: 5,conditions:'观看视频5分钟',dataFrom:'2025-3-20' },
    { level: "白银", threshold: 15,conditions:'观看视频15分钟',dataFrom:'2025-3-20'},
    { level: "黄金", threshold: 30,conditions:'观看视频30分钟',dataFrom:'2025-3-20'},
    {level:  "钻石",  threshold:60,conditions:'观看视频60分钟',dataFrom:'2025-3-20'}
    ]
    medals.forEach((medal,index)=>{
        const medalItem=medalItemFirst[index];
        
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
}


function listenJudgements(listenTimes,medalItems)
{
    const medals=[
        { level: "青铜", threshold: 5,conditions:'聆听故事5分钟',dataFrom:'2025-3-20' },
    { level: "白银", threshold: 15,conditions:'聆听故事15分钟',dataFrom:'2025-3-20'},
    { level: "黄金", threshold: 30,conditions:'聆听故事30分钟',dataFrom:'2025-3-20'},
    {level:  "钻石",  threshold:60,conditions:'聆听故事60分钟',dataFrom:'2025-3-20'}
    ]
    medals.forEach((medal,index)=>{
        const medalItem=medalItems[index];
        
        if(listenTimes>=medal.threshold)
        {
            medalItem.classList.add('active','cursor-pointer');
            medalItem.onclick=function()
            {
                showMedalDetail('智慧聆听时',medal.level,medal.conditions,medal.dataFrom);
            };
        }
        if(listenTimes<medal.threshold)
        {
            medalItem.classList.add('inactive','cursor-not-allowed');
        }
    })
}

function countswork(workCounts,medalItems)
{
    const medals=[
        { level: "青铜", threshold: 5,conditions:'完成作业5份',dataFrom:'2025-3-20' },
    { level: "白银", threshold: 15,conditions:'完成作业10份',dataFrom:'2025-3-20'},
    { level: "黄金", threshold: 30,conditions:'完成作业15份',dataFrom:'2025-3-20'},
    {level:  "钻石",  threshold:60,conditions:'完成作业30份',dataFrom:'2025-3-20'}
    ]
    medals.forEach((medal,index)=>{
        const medalItem=medalItems[index];
        
        if(workCounts>=medal.threshold)
        {
            medalItem.classList.add('active','cursor-pointer');
            medalItem.onclick=function()
            {
                showMedalDetail('智慧聆听时',medal.level,medal.conditions,medal.dataFrom);
            };
        }
        if(workCounts<medal.threshold)
        {
            medalItem.classList.add('inactive','cursor-not-allowed');
        }
    })
}

function changejudg(exchangeCounts,medalItems)
{
    const medals=[
        { level: "青铜", threshold: 5,conditions:'与ai对话10次',dataFrom:'2025-3-20' },
    { level: "白银", threshold: 15,conditions:'与ai对话15次',dataFrom:'2025-3-20'},
    { level: "黄金", threshold: 30,conditions:'与ai对话30次',dataFrom:'2025-3-20'},
    {level:  "钻石",  threshold:60,conditions:'与ai对话60次',dataFrom:'2025-3-20'}
    ]
    medals.forEach((medal,index)=>{
        const medalItem=medalItems[index];
        
        if(exchangeCounts>=medal.threshold)
        {
            medalItem.classList.add('active','cursor-pointer');
            medalItem.onclick=function()
            {
                showMedalDetail('智慧聆听时',medal.level,medal.conditions,medal.dataFrom);
            };
        }
        if(exchangeCounts<medal.threshold)
        {
            medalItem.classList.add('inactive','cursor-not-allowed');
        }
    })
}

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