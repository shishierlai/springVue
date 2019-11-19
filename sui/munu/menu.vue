<template>
    <div id="app" style="display: flex;flex-direction: row">

        
        <el-menu :router="true" default-active="moduleCode" class="el-menu-vertical-demo" :collapse="false">
            
            <div v-for="(menuItem,index) in this.menuTree" :key="index">
                   <el-submenu :index="menuItem.code">
                       <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{menuItem.name}}</span>
                        </template>
                        <el-menu-item-group>
                             <div class="child-menu"> 
                                
                                <li v-for="item3 in menuItem.children" :key="item3.code"
                                    :class="{'active':item3.path == currSubMenuPath}">
                                    <a :href="menuItem.path+item3.path">{{item3.name}}</a>
                                </li>
                                <!-- <el-menu-item :index="item.code" :route="item.path">{{item.name}}</el-menu-item> -->
                               
                            </div> 
                        </el-menu-item-group>
                   </el-submenu>
            </div>

           
        </el-menu>


    <div class="m-page">
            <transition :name="transitionName">
                <router-view class="m-page-trans" v-wechat-title="$route.meta.title"></router-view>
            </transition>
    </div>

    </div>
</template>
<script>
import {menuTree} from './menu'
export default {
    data(){
        return{
            isCollapse: true,
            transitionName: 'slide-left', 
            currNavMenuCode: this.moduleCode,
            currSubMenuPath:this.$route.path,
            menuTree: [
                {
                    code:"shi",
                    name:"个人网站",
                    path:"boot.html#",
                    visible:false,
                    children:[
                        {
                            code: "shi:test1",
                            name: "ceshi1",
                            path: "/boot",
                            visible: false
                        },
                        {
                            code: "shi:test2",
                            name: "ceshi2",
                            path: "/boot2",
                            visible: false
                        },
                    ]
                },
                {
                    code:"shiro",
                    name:"权限管理",
                    path:"shiro_management.html#",
                    visible:false,
                    children:[
                        {
                            code: "shiro:user",
                            name: "用户管理",
                            path: "/user",
                            visible: false
                        },
                        {
                            code: "shiro:role",
                            name: "角色管理",
                            path: "/role",
                            visible: false
                        },
                    ]
                }
            ],
        }
    },
    props: {
        moduleCode: String
    },
    watch: {
        '$route'(to, from) {
                this.currSubMenuPath = to.path;
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    methods:{

        handleData(){
            //  this.$ajax.post('../api/user/menu',{}, function (data) {
            //     if (data) {
            //             var logincode = data.operatorName;
                        
            //             var permissionList = data.userPermission;
            //             console.log(logincode);
            //              console.log(permissionList);
            //     }
            //  }.bind(this));
            
        }
    
    },
    mounted(){
        this.handleData();
    }
    
}
</script>
<style scoped>

.child-menu{
    line-height: 45px;
    min-height: 100%;
    text-align: center;
}
.child-menu .li{
    padding-left: 12px;
    cursor: pointer;
}
.child-menu .active {
    background: #d9d9d9;
        
}
.child-menu li:hover{
    background: #f2f2f2;
}
.child-menu a{
    color:#303133;
    width: 100%;
    display: block;
    text-decoration: none;
}
.m-page {
    flex: auto;
    /* 如果出现伸缩时有组件被遮住的问题，取消这个注释  overflow*/
    /* overflow: auto; */
     background: #f2f2f2;
    min-height: calc(100vh - 12px);
    width: 800px;
	padding-bottom:12px;
}

.m-page-trans {
    transition: all .2s cubic-bezier(.25, .1, .25, 1);
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.left-menu{
    margin-top:10px;
    text-align: center;
    width:180px;
    flex: 0 0 auto;
    background: #FFF;
    height: calc(100vh - 100px);
}


.menu-info {
        flex: 0 0 auto;
        background: #FFF;
        height: calc(100vh - 100px);
        overflow-y: scroll;
}
.menu-click-info {
        height: 56px;
        line-height: 56px;
        font-size: 13px;
        color: #303133;
        padding: 0 20px;
        cursor: pointer;
        border-bottom: 1px solid #d9d9d9;
    }
.menu-info .active {
    background-color: rgb(204, 200, 200);
}
</style>