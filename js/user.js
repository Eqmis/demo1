// 用户登录注册的表单验证通用代码

// 对某一个表单进行验证的构造函数
class FieldValidator {
    /**
     * 构造器
     * @param {String} txtId 表单id
     * @param {Function} validatorFunction 验证规则，当需要对该文本框进行验证时，会调用该函数，函数的参数是当前文本框的值，函数的返回值为验证的错误信息，返回值为空则无错误
     */
    constructor(txtId, validatorFunction) {
        this.input = $('#' + txtId)
        this.validatorFunction = validatorFunction
        this.p = this.input.nextElementSibling
        // 失去焦点、表单提交
        this.input.onblur = () => {
            this.validator()
        }
    }

    // 验证 成功返回true 失败返回false
    async validator() {
        const err = await this.validatorFunction(this.input.value)
        if (err) {
            // 设置提示信息
            this.p.innerText = err
            return false
        } else {
            this.p.innerText = ''
            return true
        }
    }


    /**
     * 对传入的所有表单进行验证，如果所有的验证都通过返回true否则返回false
     * @param {Array} validators 表单数组
     */
    static async validate(...validators) {
        const pro = validators.map(v => v.validator())
        const result = await Promise.all(pro)
        return result.every(r=>r)
    }
}