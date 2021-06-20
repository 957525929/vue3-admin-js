// https://vue-i18n-next.intlify.dev/
//语言的配置
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    // something vue-i18n options here ...
    locale: 'ch',  //默认语言
    messages: {
        ch: require("./ch"),
        en: require("./en")
    }
})
export default i18n