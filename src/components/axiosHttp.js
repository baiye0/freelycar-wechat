import axios from 'axios'

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get('/api' + url, {
      params: params
    })
      .then(response => {
        if (response.data.code === 1) {
          resolve(response.data.data)
        } else {
          alert(response.data.msg)
        }
      })
      .catch(err => {
        alert(err)
      })
  })
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post('/api' + url, data)
      .then(response => {
        if (response.data.code === 1 || response.data.status === 0) {
          if (response.data.result) {
            resolve(response.data.result)
          } else {
            resolve(response.data.data)
          }
        } else {
          if (response.data.message) {
            alert(response.data.message)
          } else {
            alert(response.data.msg)
          }
        }
      }, err => {
        alert(err)
      })
  })
}

export function getExcel(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get('/api' + url, {
      params: params,
      responseType: 'blob',
    })
      .then(res => {
        if (!res) {
          return
        }
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
      })
      .catch(err => {
        alert(err)
      })
  })
}

export function postExcel(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post('/api' + url, data, {responseType: 'blob'})
      .then(res => {
        if (!res) {
          return
        }
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
      }, err => {
        alert(err)
      })
  })
}
