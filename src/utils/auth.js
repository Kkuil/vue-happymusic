import Cookies from 'js-cookie'

export const setCookies = cookie => {
    if (cookie) {
        const temp = cookie.split(';')
        for (var i = 0; i < temp.length; i++) {
            const t = temp.slice(i * 5, i * 5 + 5).join(';')
            if(t) {
                document.cookie = t
                // localStorage.setItem()
            }
        }
    }
}

export const getCookies = key => {
    return Cookies.get(key) ?? localStorage.getItem(key);
}