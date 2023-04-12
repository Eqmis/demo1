// 获取用户注册信息
const doms = {
    btn: $('.submit'),
    form: $('.user-form')
}

const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) return '请填写账号'
    const resp = await API.exists(val)
    return resp.data ? '账号已存在' : ''

})

const loginNickValidator = new FieldValidator('txtNickname', async function (val) {
    if (!val) return '请填写昵称'
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) return '请填写密码'
})

const loginPwd2Validator = new FieldValidator('txtLoginPwdConfirm', async function (val) {
    if (!val) return '请填写确认密码'
    if (val !== loginPwdValidator.input.value) return '两次密码输入不匹配，请重新输入'
})

doms.form.onsubmit = async function (e) {
    e.preventDefault()
    const result = await FieldValidator.validate(
        loginIdValidator,
        loginNickValidator,
        loginPwdValidator,
        loginPwd2Validator
    )
    if (!result) return
    // 注册
    // const data = {
    //     loginId: loginIdValidator.input.value,
    //     nickname: loginNickValidator.input.value,
    //     loginPwd: loginPwdValidator.input.value
    // }
    const formData = new FormData(doms.form)
    const data = Object.fromEntries(formData.entries())
    const resp = await API.reg(data)
    if (resp.code !== 400) {
        alert('注册成功')
        location.href = './login.html'
    }
}