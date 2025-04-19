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

function navigateToAchievementGarden() {
    window.location.href='../achievement/achieve.html';
}

function showUserProfile() {
    window.open('viewport.html','_blank');
}

function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
        window.location.href='../login/login-child.html';
    }
}

function showStoryDetail(id) {
    alert('正在打开故事 #' + id);
}