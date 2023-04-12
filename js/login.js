// 获取用户注册信息
const doms = {
    btn: $('.submit'),
    form: $('.user-form')
}

const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) return '请填写账号'

})

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) return '请填写密码'
})

doms.form.onsubmit = async function (e) {
    e.preventDefault()
    const result = await FieldValidator.validate(
        loginIdValidator,
        loginPwdValidator
    )
    if (!result) return
    const formData = new FormData(doms.form)
    const data = Object.fromEntries(formData.entries())
    const resp = await API.login(data)
    if (resp.code !== 400) {
        alert('登录成功')
        location.href = './index.html'
    }else{
        alert('账号或密码错误，请重试')
        loginIdValidator.p.innerText = resp.msg 
        loginPwdValidator.input.value = ''
    }
}