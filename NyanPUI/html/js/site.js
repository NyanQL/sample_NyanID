console.log('loaded site.js')
let access_token = ''
let clientToken = ''
let refreshTokenName = 'nyanID_Refresh'

async function postNyan8JSON (data) {
  return new Promise(function (resolve, reject) {
    data.client_id = clientId
    data.client_secret = clientSecret
    data.access_token = clientToken

    const xhr = new XMLHttpRequest()
    xhr.open('POST', nyan8URL, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const resText = xhr.responseText

        if (xhr.status === 200) {
          if (resText.trim() === '') {
            reject(new Error('レスポンスが空です'))
            return
          }

          try {
            const jsonResponse = JSON.parse(resText)
            resolve(jsonResponse)
          } catch (e) {
            console.error('JSONパースエラー:', e)
            console.error('受信データ:', resText)
            reject(new Error('レスポンスのJSONパースエラー: ' + e.message))
          }
        } else {
          console.error('HTTPエラー:', xhr.status)
          console.error('レスポンス:', resText)
          reject(new Error('HTTPエラー: ' + xhr.status))
        }
      }
    }

    xhr.onerror = function () {
      reject(new Error('ネットワークエラー'))
    }

    xhr.send(JSON.stringify(data))
  })
}

function getCookie (name) {
  const cookies = document.cookie.split('; ')
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (key === decodeURIComponent(name)) {
      return decodeURIComponent(value)
    }
  }
  return null
}

async function refreshToken () {
  const token_text = getCookie(refreshTokenName)
  const token = JSON.parse(token_text)
  if (!token || !token.token) {
    console.log('refresh tokenが見つかりません。')
    location.href = '/login'
    return
  }

  return postNyan8JSON({
    api: 'refresh_token',
    refresh_token: token.token
  })
    .then(response => {
      console.log(response)
      if (response.success) {
        clientToken = response.result.access_token
      } else {
        //リフレッシュトークンが無効なので削除する
        deleteCookie(refreshTokenName)
        clientToken = ''
        alert('ログインから一定時間が経過したためログアウトしました')
        location.href = '/login'
        return
      }
    })
    .catch(response => {
      alert('ログインから一定時間が経過したためログアウトしました')
      location.href = '/login'
    })
    .finally(function (response) {
      return
    })
  return
}

function logout () {
  if (confirm('ログアウトしますか？')) {
    deleteCookie(refreshTokenName)
    clientToken = ''
    location.href = '/login'
  }
}

//cookieの削除
function deleteCookie (name, path = '/', domain) {
  let cookieStr = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=' + path
  if (domain) {
    cookieStr += ';domain=' + domain
  }
  document.cookie = cookieStr
}
