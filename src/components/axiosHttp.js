import axios from 'axios'
import router from '../router'


//设置默认请求头
//部署上线
// axios.defaults.baseURL ='https://www.freelycar.com/api'
// 本地调试
// axios.defaults.baseURL ='/api'
axios.defaults.timeout = 60000
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
//请求数据拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器异常处理
axios.interceptors.response.use(response => {
  // console.log(response.data.message)
  //console.log(localStorage.getItem('wxinfo'))
  if(response.data.message=="JWT Expired"){
    localStorage.removeItem('Authorization')
    if(localStorage.getItem('clientId')){
      // console.log(router.currentRoute.fullPath)
      // localStorage.removeItem('wxinfo');
      localStorage.removeItem('jwt')
      router.replace({
        path: '/client-login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })

    }
    if(localStorage.getItem('staffId')){
      // localStorage.removeItem('staffinfo');
      localStorage.removeItem('jwt')
      router.replace({
        path: '/technic-login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})



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
