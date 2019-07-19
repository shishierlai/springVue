import axios from 'axios'
import { MessageBox } from 'element-ui';
import { Loading } from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

let loadingInstance;
var isLoading = true;

//拦截请求
axios.interceptors.request.use(function (config){
   //loading
   if (isLoading == undefined || isLoading) {
      loadingInstance = Loading.service({background:'rgba(0,0,0,0)'});
   } else {
      loadingInstance = null;
   }
   // loadingInstance = Loading.service();
   return config;
 }, function (error){
    if (loadingInstance != null) {
      loadingInstance.close();
    }
    return Promise.reject(error);
 });

//拦截返回
axios.interceptors.response.use((response) => {
  const data = response.data
  //这里抓走所有错误
  switch (data.code) {
    case 1000:{
      //正确的情况
      if (loadingInstance != null) {
        loadingInstance.close();
      }
      return data;
    }
    case 9100:{
      if (loadingInstance != null) {
        loadingInstance.close();
      }
      MessageBox.confirm('是否重新登录？', data.desc, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        window.open('../login');
      }).catch(() => {
            
      });
      const err = new Error("没有权限")
      err.data = data
      err.response = response
      throw err;
    }
    case 9500:{
      if (loadingInstance != null) {
        loadingInstance.close();
      }
      MessageBox.alert(data.desc, '服务错误', {
        confirmButtonText: '确定'
      });
      const err = new Error(data.desc)
      err.data = data
      err.response = response
      throw err;
    }
    default:{
      if (loadingInstance != null) {
        loadingInstance.close();
      }
      return data;
    }
      
  }

}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    if (loadingInstance != null) {
      loadingInstance.close();
    }
    MessageBox.alert(err.response.status, '网络错误', {
      confirmButtonText: '确定'
    });
  }
  return Promise.reject(err)
})

export default {
  get: function (url,callback,loading) {
    isLoading = loading;
    axios.get(url).then(function (response) {
      callback(response.data);
    });
  },
  delete: function (url,callback,loading) {
    isLoading = loading;
    axios.delete(url).then(function (response) {
      callback(response.data);
    });
  },
  post: function (url,param,callback,loading) {
    isLoading = loading;
    axios.post(url,param).then(function (response) {
      callback(response.data,response);
    });
  },
  put: function (url,param,callback,loading) {
    isLoading = loading;
    axios.put(url,param).then(function (response) {
      callback(response.data);
    });
  },
  upload:function(url,data,config,callback){
    isLoading = false;
    axios.post(url,data,config).then( response => {
      callback(response);
    })
  }
};
