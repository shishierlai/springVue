<template>
  <div id="app">
    
    <div class="index-title-left">
        
      <div class="web-name">施施而来的个人网站</div>
      <div class="index-title-right">
        <div style="height:80%;padding-top:20px;width:80%;padding-left:5%;">
          <el-form ref="userVo" :model="userVo" :rules="rules" label-width="80px" label-position="right">
              <el-form-item label="用户名:"  prop="name">
                <el-input v-model="userVo.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码:"  prop="password">
                <el-input v-model="userVo.password" show-password clearable></el-input>
              </el-form-item>
               <el-form-item label="验证码:"  prop="confirmCode">
                 <el-input type="text" v-model="userVo.confirmCode" placeholder="请输入验证码" clearable>
                   <template slot="append">
                    <div class="login-code" @click="refreshCode">
                      <Identify :identifyCode="identifyCode"></Identify>
                    </div>
                   </template>
                  </el-input>
              </el-form-item>
              <el-form-item >
                <el-button style="width:200px;" type="primary" @click="handleLogin('userVo')">登录</el-button>
              
              </el-form-item>
          </el-form>
        </div>
        <div class="another-action">
          <div class="regist-action" @click="handleRegister()">注册账户</div>
          <div class="forget-action" @click="handleForget()">忘记密码?</div>
        </div>

      </div>
    </div>
    <el-dialog title="用户注册" :visible.sync="registerVisable" width="30%">
        <el-form ref="registerVo" :model="registerVo" :rules="Registrules" label-width="90px" label-position="right">
              <el-form-item label="用户名:"  prop="name">
                <el-input v-model="registerVo.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码:"  prop="password">
                <el-input v-model="registerVo.password" show-password clearable></el-input>
              </el-form-item>
              <el-form-item label="确认密码:"  prop="confirmPassword" >
                <el-input v-model="registerVo.confirmPassword" show-password clearable></el-input>
              </el-form-item> 
             
       </el-form>
         <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancle(1,'registerVo')">取 消</el-button>
              <el-button type="primary" @click="handleRegist('registerVo')">确 定</el-button>
          </span> 
           
    </el-dialog>

    <el-dialog title="找回密码" :visible.sync="forgetVisable" :before-close="handleBeforeClose" width="30%">
      <div style="height:100px;" v-show="step==0">
        <el-input placeholder="请输入用户名" v-model="forgetName" clearable>
          <template slot="prepend">用户名</template>
        </el-input>

        <div  class="btn-next">
           <el-button type="primary" @click="handleStep1()">下一步</el-button>
        </div>

      </div>

      <div style="height:150px;" v-show="step==1">
        <div>
          <el-input placeholder="请输新密码" v-model="forgetPsd" show-password clearable>
              <template slot="prepend">密&emsp;&emsp;码</template>
          </el-input>
        </div>
        <div style="padding-top:10px;">
          <el-input placeholder="请输入确认密码" v-model="forgetConfirmPsd" show-password clearable>
            <template slot="prepend">确认密码</template>
          </el-input>
        </div>
        
        
        <div class="btn-next">
           
            <el-button  type="primary" @click="handleStep2()">确 认</el-button>
        </div>
      </div>
       
    </el-dialog>
    
    
    
  </div>
</template>

<script>
import Identify from './component/Identify';
export default {
  components:{
    Identify
  },
  name: 'HelloWorld',
  data () {
    return {
      registerVo:{
        name:'',
        password:'',
        confirmPassword:''
      },
      forgetVo:{},
      userVo:{
        name:'',
        password:'',
        confirmCode:''
      },
      step:0,
      forgetName:'',
      forgetPsd:'',
      forgetConfirmPsd:'',
      registerVisable:false,
      forgetVisable:false,
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      identifyCode: '',
      Registrules:{
         name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          confirmPassword:[
            { required: true, message: '请输入确认密码', trigger: 'blur' },
          ]
      },
       rules: {
          name: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
          ],
          confirmCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
       }
     
    }
  },
  methods:{
    handleBeforeClose(done){
      this.forgetName='';
      this.forgetPsd='';
      this.forgetConfirmPsd='';
      this.step=0;
      done();
    },
    handleStep1(){
      if(this.forgetName!=''){
        
        this.$ajax.post('../getUserName',{user_name:this.forgetName},function(data){
              if(data.exist==true){
                this.step=1;
              }     
        }.bind(this));
         this.step=1;

      }else{
        this.$message.error('输入用户名不能为空!');
      }
    },
    handleStep2(){
      if(this.forgetPsd=='' || this.forgetConfirmPsd==''){
        this.message.error('输入的密码不能为空!');
      }
      if(this.forgetPsd==this.forgetConfirmPsd){
        this.$ajax.post('../getBackPsd',{user_name:this.forgetName,password:this.forgetPsd},function(data){
             this.$message.success("密码找回成功!");
             this.forgetName='';
             this.forgetPsd='';
             this.forgetConfirmPsd='';
             this.forgetVisable=false;
        }.bind(this));
      }else{
        this.$message.error('两次输入的密码不匹配!');
      }
    },
    handleCancle(type,formName){
      if(type==1){
       this.registerVisable=false;
      }
      if(type==2){
        this.forgetVisable=false;
        return;
      }
      this.$refs[formName].resetFields();
    },
    handleRegist(formName){
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.identifyCode.password!=this.registerVo.confirmpassword){
               alert('两次输入的密码不一致!');
                return false;
            }else{
             
              this.$ajax.post('../register',{user_name:this.registerVo.name,password:this.registerVo.password},function(data){
                  this.$message.success("注册成功!");
                  this.$refs[formName].resetFields();
                  this.registerVisable=false;

              }.bind(this));
            }
           
          } else {
           
            return false;
          }
      });
    },
    handleLogin(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.identifyCode!=this.userVo.confirmCode){
               alert('输入的验证码不匹配,请重新输入');
            }else{
              this.$ajax.post('../verify',{login_code:this.userVo.name,login_password:this.userVo.password},function(data,response){
                  if (response.code != 1000) {
                        var error_msg = response.desc;
                        this.$message.error(error_msg);
                        this.refreshCode();
                    }else{
                        this.handleVerifySuccess();
                    }
              }.bind(this));
            }
           
          } else {
           
            return false;
          }
      });
    },
    handleVerifySuccess:function(){
                const loading = this.$loading({
                    lock: true,
                    text: '登录成功...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.3)'
                });
                this.error_msg = null;
                self.location = '../main';
            },
 
    refreshCode () {
       this.identifyCode = '';
        for (let i = 0; i < 4; i++) {
        this.identifyCode+= this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
       }
    },

  
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    handleRegister(){
      this.registerVisable=true;
    },
    handleForget(){
      this.forgetVisable=true;
    },
  }
}
</script>

<style scoped>

.index-title-left{
  background: url("../../assets/timg.jpg");
  width: 100%;
	height: 100%;
	position: fixed;
	background-repeat: no-repeat;
	background-position: 0px 0px;
	background-size: 100% 100%;
}
.web-name{
  font-size: 30px;
  text-align: center;
  color: aliceblue;
  padding-top: 10%;
}

.index-title-right{
  margin: 5% auto auto 65%;
  text-align: center;
  
  width: 30%;
  height: 280px;
  background-color: wheat;
}

.login-code {

    text-align: center;
    border-radius: 4px;
    width: 80px;

   
}
.another-action{
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}
.regist-action{
  float: left;
  font-size: 14px;
}
.forget-action{
  float: right;
  font-size: 14px;
}
.btn-next{
  padding-top: 30px;
  padding-right: 5px;
  float: right;
}
</style>
