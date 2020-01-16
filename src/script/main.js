
//导入css文件
import "../stylesheets/index.css";
import "../stylesheets/registry.css";
import "../stylesheets/login.css";
import "../stylesheets/details.css";
import "../stylesheets/cartlist.css";


//ES6
import "jquery";
//首页效果
import {
    indexShow
} from './index_module';
indexShow();

//注册表单
import {
    registryShow
} from './registry_module'
registryShow();

//登录表单
import {
    loginShow
} from './login_module'
loginShow();

//详情效果
import {
    detailsShow
} from './details_module';
detailsShow();

//购物车列表
import{
    cartlistShow
} from './cartlist_module';
cartlistShow();
