/**
 * 储存 localStorage
 * @param {string} name
 * @param {string | object} content
 */
export const setLocalStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取 localStorage
 * @param {string} name
 * @returns
 */
export const getLocalStorage = (name) => {
  if (!name) return
  let data = window.localStorage.getItem(name)
  return data ? JSON.parse(data) : undefined
}

/**
 * 删除 localStorage
 * @param {string} name
 */
export const removeLocalStorage = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const Cookie = {
  /**
   * 获取 cookie
   * @param {string} name
   */
  get(name) {
    let strCookie = document.cookie
    let arrCookie = strCookie.split('; ')
    for (let item of arrCookie) {
      let arr = item.split('=')
      if (arr[0] === name) return arr[1]
    }
    return ''
  },
  /**
   * 添加 cookie
   * @param {{name: string, value: string, expiresDays: number, domain?: string, path?: string}} param0
   */
  set({ name, value, expiresDays, domain, path }) {
    let cookieString = `${name}=${value ? value : ''}`
    let date = new Date()
    if (domain != undefined) domain = `;domain=${domain}`
    else domain = ''
    date.setTime(date.getTime() + (expiresDays || 1) * 24 * 3600 * 1000)
    cookieString = `${cookieString}${domain}; path=${path ||
      '/'}; expires=${date.toUTCString()}`
    document.cookie = cookieString
  },
  /**
   * 删除 cookie
   * @param {string} name
   */
  remove(name) {
    this.set(name, '', -1)
  },
}
