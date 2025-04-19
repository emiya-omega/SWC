
document.addEventListener('DOMContentLoaded', function () {
    // 模拟视频数据
    const videos = [{
            id: 1,
            title: "快乐动物乐园",
            desc: "跟随小动物们一起探索大自然的奥秘",
            duration: "12分钟",
            tags: ["启蒙教育"],
            src: "https://example.com/video1.mp4"
        },
        {
            id: 2,
            title: "小火车历险记",
            desc: "勇敢的小火车带你环游奇妙世界",
            duration: "15分钟",
            tags: ["冒险故事"],
            src: "https://example.com/video2.mp4"
        },
        {
            id: 3,
            title: "快乐幼儿园",
            desc: "学习分享与友谊的温暖故事",
            duration: "10分钟",
            tags: ["社交启蒙"],
            src: "https://example.com/video3.mp4"
        },
        {
            id: 4,
            title: "创意手工课",
            desc: "用简单材料制作可爱小动物",
            duration: "8分钟",
            tags: ["动手能力", "创造力"],
            src: "https://example.com/video4.mp4"
        },
        {
            id: 5,
            title: "小小艺术家",
            desc: "学习基础色彩搭配与绘画技巧",
            duration: "12分钟",
            tags: ["艺术启蒙", "色彩认知"],
            src: "https://example.com/video5.mp4"
        },
        {
            id: 6,
            title: "积木工程师",
            desc: "用积木搭建奇妙世界",
            duration: "10分钟",
            tags: ["空间思维", "逻辑能力"],
            src: "https://example.com/video6.mp4"
        },
        {
            id: 7,
            title: "奇妙太空之旅",
            desc: "认识太阳系和八大行星",
            duration: "15分钟",
            tags: ["天文知识", "科学启蒙"],
            src: "https://example.com/video7.mp4"
        },
        {
            id: 8,
            title: "丛林探险家",
            desc: "认识热带雨林中的奇妙生物",
            duration: "12分钟",
            tags: ["自然知识", "生物多样性"],
            src: "https://example.com/video8.mp4"
        },
        {
            id: 9,
            title: "数字小天才",
            desc: "趣味数学启蒙课",
            duration: "10分钟",
            tags: ["数学启蒙", "逻辑思维"],
            src: "https://example.com/video9.mp4"
        }
    ];
    // 获取DOM元素
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const videoDuration = document.getElementById('videoDuration');
    const videoTags = document.getElementById('videoTags');
    const closeModal = document.getElementById('closeModal');
    // 为所有视频卡片添加点击事件
    document.querySelectorAll('.video-thumbnail').forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            const videoData = videos[index];
            // 设置模态框内容
            videoTitle.textContent = videoData.title;
            videoDesc.textContent = videoData.desc;
            videoDuration.innerHTML =
                `<i class="fas fa-clock mr-1"></i> ${videoData.duration}`;
            // 设置标签
            videoTags.innerHTML = '';
            videoData.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className =
                    'mr-2 px-2 py-1 bg-primary bg-opacity-10 text-primary rounded text-xs';
                span.textContent = tag;
                videoTags.appendChild(span);
            });
            // 设置视频源
            modalVideo.src = videoData.src;
            // 显示模态框
            videoModal.classList.remove('hidden');
            modalVideo.play();
        });
    });
    // 关闭模态框
    closeModal.addEventListener('click', function () {
        videoModal.classList.add('hidden');
        modalVideo.pause();
    });
    // 点击模态框外部关闭
    videoModal.addEventListener('click', function (e) {
        if (e.target === videoModal) {
            videoModal.classList.add('hidden');
            modalVideo.pause();
        }
    });
});



function navigateTohome()
{
    window.location.href='../homepage/home.html';
}
function navigateToStoryIsland() {
    window.location.href='../ai-story/frontend/nowstory.html';
}



function navigateToAIChat() {
    window.location.href='../chatai/chatElf.html';
}

function navigateToTaskCards() {
    window.location.href='../parentchild/pa-ch.html';
}

function navigateToAchievementGarden() {
    window.location.href='../achievement/achieve.html';
}




