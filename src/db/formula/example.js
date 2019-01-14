let x = {
    "option": {
        // 本条计算的id,为递增数字
        "id": 1,

        // 本条计算的name,要符合js命名规范
        "name": "azurlanepaojidamage",

        // 本条计算的名称
        "description": "碧蓝航线炮击伤害",

        // 本条计算的介绍
        "introduce": "碧蓝航线炮击伤害计算器...cuculator试做用",

        // 触发计算方式,如为true,则点击按钮触发计算;为false则输入时计算
        "lazy": false,

        // 上传者
        "uploader": "HHHHhg",

    },
    "inputs": [
        {
            // 该条输入的变量名,要符合js命名规范
            "name": "paoji",

            // 该条输入的类型,可以为"input","choice","reduce","static"中的一个
            // input代表输入框
            // choice代表选择,详见弹药buff那条
            // reduce代表多栏输入框,详见属性加成那条
            // static为静态数据,本条的暴击伤害为静态的1.5
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

            // 显示的格式,用一对大括号代表变量,如设为"{}%",则会在输入框后面加上一个%
            "format": null,

            // 不填入数据时的缺省值
            "default": 100,

            // 暂时不管这个
            "example": 15,

            // choice代表选择,详见弹药buff那条
            "choice": null,

            // 暂时不管这个
            "area": 0,

            // 这个值在写这份json的时候没用,但是最好声明一下,写上null即可
            "value": 4959
        },
        {
            "name": "baojishanghai",
            "type": "static",
            "description": "暴击伤害",
            "introduce": "暴击伤害",
            "placeholder": "暴击伤害",
            "max": null,
            "min": null,
            "minor": false,
            "format": null,
            "default": 1.5,
            "example": 1.5,
            "choice": null,
            "area": 0,
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

            // reduce表示多输入框
            "type": "reduce",
            "accuracy": null,
            "description": "属性加成",
            "introduce": "攻击方的属性加成",
            "placeholder": "输入属性加成",
            "max": null,
            "min": null,
            "minor": false,
            "format": "${}%",

            // reduce的默认值为数组
            "default": [0],
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
                "example": 15,

                // 这个value暂时没用
                "value": 15,

                // reduce的每个选择项也可为choice
                "choice": null
            },
            "value": [
                0
            ],
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
                "default": [
                    15,
                    20
                ],
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
            "value": [
                0
            ]
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
                "default": [
                    15,
                    20
                ],
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
            "value": [
                0
            ]
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
    "outputs": [
        {
            // 该条输出的变量名,要符合js命名规范
            "name": "damage",
            "accuracy": 2,
            "fix": "round",
            "description": "伤害",
            "introduce": "伤害",
            "max": null,
            "min": null,
            "minor": false,
            "formula": "(1.1 - rand*0.2) * paoji * xiaolv/100 * (1 + shuxingjiacheng/100) * zhuangjiabuzheng/100 * (1 + dengjiyazhi) * (1+danyaobuff/100+zengshangjineng/100)*(1 + direndebuff/100)*(1 + lieshabuff/100)",
            "area": 0,
            "split": false,
            "value": 0
        },
        {
            "name": "damage2",
            "accuracy": 2,
            "fix": "round",
            "description": "伤害(暴击)",
            "introduce": "伤害",
            "max": null,
            "min": null,
            "minor": false,
            "formula": "baojishanghai * damage",
            "area": 0,
            "split": false,
            "value": 0
        }
    ]
}
console.log(x)
