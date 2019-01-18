// 网站会根据这样的json生成计算页面,
// 可能我写注释的某条跟类型相同的某条有冲突,以写注释的那条为准

let x = {
    "option": {
        // 本条计算的id,为递增数字
        "id": 3,

        // 本条计算的name,要符合js命名规范
        // 关于js命名规范,没有编程基础的同学可以理解为,只能使用数字字母下划线,且以字母或下划线开头
        "name": "azurlanepaojidamage",

        // 本条计算的名称
        "description": "碧蓝航线踩踩踩伤害",

        // 本条计算的介绍
        "introduce": "碧蓝航线炮击伤害计算器...cuculator试做用",

        // 触发计算方式,如为true,则点击按钮触发计算;为false则输入时计算
        "lazy": false,

        // 上传者
        "uploader": "HHHHhg",

        // 本公式最后一次编辑的时间,在浏览器中按f12打开开发者工具,点到上面的console,标签,在console下面空白处点一下,输入new Date().getTime()回车,就能得到当前时间,
        "time":1547348683

    },
    "inputs": [
        {
            // 该条输入的变量名,要符合js命名规范
            "name": "paoji",

            // 该条输入的类型,可以为"input","choice","reduce","static","buttons"和"switch"中的一个
            // input代表输入框
            // choice代表选择,详见弹药buff那条
            // reduce代表多栏输入框,详见属性加成那条
            // static为静态数据,本条的暴击伤害为静态的1.5
            // "buttons"和"switch"见下面switches
            "type": "input",

            // 本条输入的名称
            "description": "面板",

            // 本条输入的介绍,使用时鼠标直到输入框,会出现悬浮框显示介绍
            "introduce": "攻击方的炮击",

            // 在没输入数据时,在输入框内显示的提示信息
            "placeholder": "输入炮击",

            // 最大和最小值,超过最大值或小于最小值时将将值改为最大值或最小值
            "max": null,
            "min": null,

            // 暂时不用管这个
            "minor": false,

            // 显示的格式,用一对大括号前面加"$"代表变量,如设为"${}%",则会在输入框后面加上一个%
            "format": null,

            // 不填入数据时的缺省值
            "default": 100,

            // 暂时不管这个
            "example": 15,

            // choice代表选择,详见弹药buff那条
            "choice": null,

            // 暂时不管这个
            "area": 0,

            // 这个值在写这份json的时候没用,但是要声明一下,写上null即可
            "value": 4959
        },
        {
            "name": "baojishanghai",

            // static为静态数据,暴击伤害倍率为静态的1.5
            "type": "static",

            "description": "暴击伤害",
            "introduce": "暴击伤害",
            "placeholder": "暴击伤害",
            "max": null,
            "min": null,
            "minor": false,
            "format": null,
            "default": null,
            "example": 1.5,
            "choice": null,
            "area": 0,

            // static必须设置value
            "value": 1.5
        },
        {
            "name": "xiaolv",
            "type": "input",
            "accuracy": null,
            "description": "武器效率",
            "introduce": "攻击方的武器效率",
            "placeholder": "输入武器效率",
            "max": null,
            "min": null,
            "minor": false,
            "format": "${}%",
            "default": null,
            "example": 15,
            "choice": null,
            "area": 0,
            "value": 150
        },
        {
            "name": "shuxingjiacheng",

            // reduce表示一组多输入框
            "type": "reduce",
            "accuracy": null,
            "description": "属性加成",
            "introduce": "攻击方的属性加成",
            "placeholder": "输入属性加成",
            // 本组输入整合计算后得到的值的最大最小值
            "max": 100,
            "min": 0,
            "minor": false,
            "format": "${}%",

            // reduce的默认值为数组
            "default": 0,
            "example": null,
            "choice": null,
            "reduce": {
                // formula为这些输入框之间的规则,可以理解为reduce( (a,b)=>{ 这里执行并返回你填入的formula } , [ 数组 ] )   这里的数组是用户在该条输入的多条数据组成的数组,不懂reduce函数的可以看下http://www.runoob.com/jsref/jsref-reduce.html
                "formula": "a + b",

                // 同输入的type,可以为"input","choice","reduce","static"中的一个( reduce可以嵌套reduce )
                // 下面几条都与输入的对应一致,作用于改组内每条输入
                "type": "input",
                "max": null,
                "min": null,
                "placeholder": "输入属性加成",
                "format": "${}%",

                // 本组reduce的每条输入的默认值
                "default": 15,

                // 暂时没用
                "example": [15],

                // 这个value为数组
                "value": [15],

                // reduce的每个选择项也可为choice
                "choice": null
            },

            // 这里的value为本组计算结果,是number而非数组
            "value": 15,

            // 这条暂时没用
            "area": 0
        },
        {
            "name": "zhuangjiabuzheng",
            "type": "input",
            "accuracy": null,
            "description": "装甲补正",
            "introduce": "装甲补正",
            "placeholder": "装甲补正",
            "max": null,
            "min": null,
            "minor": false,
            "format": "${}%",
            "default": null,
            "example": null,
            "choice": null,
            "area": 0,
            "value": 60
        },
        {
            "name": "dengjiyazhi",
            "type": "input",
            "accuracy": null,
            "description": "等级压制",
            "introduce": "等级压制",
            "placeholder": "等级压制",
            "max": 119,
            "min": -119,
            "minor": false,
            "format": null,
            "default": 0,
            "example": 0,
            "choice": null,
            "area": 0,
            "value": 0
        },
        {
            "name": "danyaobuff",

            // 将type设为choice
            "type": "choice",
            "accuracy": 0,
            "description": "弹药Buff",
            "introduce": "弹药Buff",
            "placeholder": "弹药Buff",
            "max": 100,
            "min": null,
            "minor": true,
            "format": "{}",
            "default": 0,
            "example": 0,

            "choice": {
                "config": {
                    // 如果此条为true,则允许用户新建新选择项
                    "allowCreate": true
                },

                //data为一个数组,存放选择项.
                "data": [
                    {
                        // 选择项显示的文字
                        "text": "弹药充足(30%增伤)",

                        // 选择该项时,本条输入的值
                        "value": 30
                    },
                    {
                        "text": "弹药一般",
                        "value": 0
                    },
                    {
                        "text": "弹药缺少(20%减伤)",
                        "value": -20
                    }
                ]
            },
            "area": 0,
            "value": 0
        },
        {
            "name": "zengshangjineng",
            "type": "reduce",
            "accuracy": 2,
            "description": "增伤技能",
            "introduce": "增伤技能",
            "placeholder": "增伤技能",
            "max": null,
            "min": null,
            "minor": true,
            "format": "{}%",
            "default": null,
            "example": null,
            "choice": null,
            "reduce": {
                "formula": "a + b",
                "type": "input",
                "accuracy": null,
                "max": null,
                "min": null,
                "format": "${}%",
                "default": 15,
                "_default": null,
                "example": [
                    15,
                    20
                ],
                "choice": null,
                "value": [
                    0
                ]
            },
            "area": 0,
            "value": 0
        },
        {
            "name": "direndebuff",
            "type": "reduce",
            "accuracy": 2,
            "description": "敌人Debuff",
            "introduce": "敌人Debuff",
            "placeholder": "敌人Debuff",
            "max": null,
            "min": null,
            "minor": true,
            "format": "{}%",
            "default": null,
            "example": null,
            "choice": null,
            "reduce": {
                "formula": "a + b",
                "type": "input",
                "accuracy": null,
                "max": null,
                "min": null,
                "format": "${}%",
                "default": 15,
                "example": [
                    15,
                    20
                ],
                "value": [
                    0
                ],
                "choice": null,
                "_default": null
            },
            "area": 0,
            "value": 0
        },
        {
            "name": "lieshabuff",
            "type": "input",
            "accuracy": 2,
            "description": "特种猎杀Buff",
            "introduce": "特种猎杀Buff",
            "placeholder": "特种猎杀Buff",
            "max": null,
            "min": null,
            "minor": true,
            "format": "{}%",
            "default": 0,
            "example": 0,
            "choice": null,
            "area": 0,
            "value": 0
        },
        {
            "name": "rand",
            "type": "input",
            "accuracy": 2,
            "description": "随机补正",
            "introduce": "随机补正",
            "placeholder": "随机补正",
            "max": 1,
            "min": 0,
            "minor": true,
            "format": "",
            "default": "Math.random()",
            "example": 1,
            "choice": null,
            "area": 0,
            "value": 0.5
        }
    ],

    // "switches"表示切换状态,里面的内容将会在页面右侧,结果栏的上面显示,方便切换状态显示结果
    "switches":[
        {
            "name":"kezhi",
            // type可选buttons或switch
            // buttons和switch类似上面的choice,都是创建好选项给用户选择,但是choice可以允许用户新建选择项,buttons和switch则不可以
            // buttons代表按钮组,限制一组内最多有4条选项,再多请选择在inputs里面用choice
            // switch代表开关,必须有2条选项
            // buttons和switch也可作为inputs的type,在inputs里面的时候,将渲染在页面中间的inputs栏而非右侧的switches栏
            "type":"buttons",
            "description": "属性克制",
            "introduce": "属性克制",
            "default": 1,
            "example": 1,
            "format": null,
            "data":[
                {
                    "text":"克制",
                    "value":2,
                },
                {
                    "text":"不被克制",
                    "value":1
                },
                {
                    "text":"被被被克克克克克制",
                    "value":0.5
                }
            ],
            "value":1,
        },
        {
            "name":"tuzi",
            "type":"switch",
            "description": "秃子",
            "introduce": "秃子",
            "default": 1,
            "example": 1,
            "format": null,
            "data":[
                {
                    "text":"是",
                    "value":2,
                },
                {
                    "text":"否",
                    "value":1
                }
            ],
            "value":1,
        }
    ],
    "outputs": [
        {
            // 该条输出的变量名,要符合js命名规范
            "name": "damage",

            // 该条输出的精确度,精确到小数点后几位
            "accuracy": 2,

            // 精确近位时的规则,可选:
            // "round" : 表示四舍五入
            // "ceil" : 向上取整
            // "floor" : 向下取整
            "fix": "round",

            // 若将show设为false,则不会在页面上显示本条输出,但是可以作为中间变量,供后面的其他output作为参数使用
            "show":true,

            // 这两天同input
            "description": "伤害",
            "introduce": "伤害",

            // 大于max会得到max,小于min会得到min
            "max": null,
            "min": null,

            // 本条计算的公式,可以用本条output上面所有input,output和switch的name作为参数,下面的一条output就使用了本条output作为参数
            // 出于安全考虑,formula只准写一行,不允许出现分号(';')
            // 下面说的有编程基础的话比较容易理解,没有编程基础也可以看下,尽量写得浅显易懂.不懂的话也问题不大,不妨碍写基本的算式
            // 实际上formula是传递给eval函数执行并返回结果,因此可以在本行里面使用一些js固有的对象,例如Number和Math对象,比如可以用Math.PI表示圆周率,亦可执行函数,例如用Math.random()生成随机数
            // 但是,出于安全考虑,本条表达式只准写一行,不允许出现分号(';'),且必须返回一个number类型的返回值
            "formula": "(1.1 - rand*0.2) * paoji * xiaolv/100 * (1 + shuxingjiacheng/100) * zhuangjiabuzheng/100 * (1 + dengjiyazhi) * (1+danyaobuff/100+zengshangjineng/100)*(1 + direndebuff/100)*(1 + lieshabuff/100)",

            // 暂时没用
            "area": 0,

            // 设为true,则显示结果时,将把结果用逗号(",")分割以增加可读性
            "split": false,

            // 初始值
            "value": 0
        },
        {
            "name": "damage2",
            "accuracy": 2,
            "fix": "round",
            "show":true,
            "description": "伤害(暴击)",
            "introduce": "伤害",
            "max": null,
            "min": null,
            "minor": false,

            // 可以使用上面出现过的output作为参数
            "formula": "baojishanghai * damage * tuzi * kezhi",

            "area": 0,
            "split": false,
            "value": 0
        }
    ]
}
console.log(x)
console.log(JSON.stringify(x))
