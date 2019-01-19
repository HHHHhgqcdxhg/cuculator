import Vue from 'vue'
// window.Vue = Vue
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// import {Notification} from 'element-ui'

const elels = `Menu,Submenu,MenuItem,MenuItemGroup,Input,InputNumber,Radio,RadioGroup,RadioButton,Switch,Button,ButtonGroup,Tooltip,Form,FormItem,Row,Col,Container,Aside,Header,Main,Footer,Notification,Select,Option,Collapse,CollapseItem,Alert`;
import {Menu,Submenu,MenuItem,MenuItemGroup,Input,InputNumber,Radio,RadioGroup,RadioButton,Switch,Button,ButtonGroup,Tooltip,Form,FormItem,Row,Col,Container,Aside,Header,Main,Footer,Notification,Select,Option,Collapse,CollapseItem,Alert } from 'element-ui'
let ss = ''
for (let x of elels.split(",")){
    let s = `Vue.use(${x});\n`
    ss += s
    // eval(s)
}
// console.log(ss)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Switch);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
// Vue.use(Notification);
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Alert);
Vue.prototype.$notify = Notification;

// Vue.use(ElementUI);
