(async () => {
    const doms = {
        nickname: $('#nickname'),
        loginId: $('#loginId'),
        chatContainer: $('.chat-container'),
        form: $('.msg-container'),
        formValue: $('#txtMsg'),
        close: $('.close')
    }
    // 初始化
    await init()

    // 绑定信息提交时间
    doms.form.onsubmit = async (e) => {
        e.preventDefault()
        // 发送信息
        const content = doms.formValue.value
        if (content.trim() === '') {
            alert('输入内容不能为空')
            doms.formValue.value = ''
            return
        }
        // 添加消息
        createChat({
            content,
            from: 'me'
        })
        // 回复消息
        const resp = await API.sendChat(content)
        createChat({
            content: resp.data.content
        })
    }

    doms.close.onclick = function () {
        location.href = './login.html'
        localStorage.removeItem('token')
    }



    // 初始化
    async function init() {
        // 检查是否登录
        const isLogin = await API.profile()
        if (isLogin.code === 401) {
            alert(isLogin.msg)
            location.href = './login.html'
        }
        await setUserMsg()
        await setChatMsg()
    }

    // 获取用户数据、更新用户数据
    async function setUserMsg() {
        const userData = await API.profile()
        // 更新用户信息
        doms.nickname.innerText = userData.data.nickname
        doms.loginId.innerText = userData.data.loginId
    }
    // 获取聊天数据，更新聊天数据
    async function setChatMsg() {
        // 获取用户数据，聊天记录
        const chatData = await API.getHistory()
        chatData.data.forEach(chat => {
            createChat({
                content: chat.content,
                from: chat.from,
                to: chat.to,
                time: chat.time
            })
        })
    }
    // 设置静态聊天内容
    function createChat(option) {
        const content = option.content
        const time = option.time || timeToggle(Date.now())
        const from = option.from || ''
        const to = option.to || ''
        doms.chatContainer.innerHTML +=
            `<div class="chat-item ${from ? 'me' : ''}">
            <img class="chat-avatar" src="./asset/${from ? 'avatar.png' : 'robot-avatar.jpg'}" />
            <div class="chat-content">${content}</div>
            <div class="chat-date">${time}</div>
        </div>`
        // 清空聊天框
        if(from) doms.formValue.value = ''
        doms.chatContainer.scrollTo(0, doms.chatContainer.scrollHeight)
    }
    // 时间戳转时间
    function timeToggle(time) {
        const date = new Date(time)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
})()


/*
    <div class="chat-item me">
          <img class="chat-avatar" src="./asset/avatar.png" />
          <div class="chat-content">你几岁啦？</div>
          <div class="chat-date">2022-04-29 14:18:13</div>
        </div>
        <div class="chat-item">
          <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
          <div class="chat-content">讨厌，不要随便问女生年龄知道不</div>
          <div class="chat-date">2022-04-29 14:18:16</div>
        </div>
*/