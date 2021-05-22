module.exports = {
  root: true, // 当前配置为根配置，将不再从上级文件夹查找配置
  parserOptions: {
    parser: 'babel-eslint', // 采用 babel-eslint 作为语法解析器
    sourceType: 'module', // 指定来源的类型，有两种script或module
    ecmaVersion: 6 // 指定ECMAScript支持的版本，6为ES6
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    process: true,
    require: true,
    __dirname: true,
    module: true
  },
  env: {
    browser: true, // 设置为所需检查的代码是在浏览器环境运行的
    es6: true // 设置所需检查代码为 es6 语法书写
  },
  plugins: ['vue'],
  extends: ['plugin:vue/recommended', 'eslint:recommended'], // 扩展使用 vue 检查规则和eslint推荐规则
  rules: {
    // 'vue/attribute-hyphenation': 0, // 忽略属性连字
    'vue/max-attributes-per-line': [2, { singleline: 20, multiline: { max: 1, allowFirstLine: true } }], // 每行最大属性
    // 允许props修改
    'vue/no-mutating-props': 0,
    'vue/singleline-html-element-content-newline': 'off', // 单行html元素内容在新的一行
    // 'vue/multiline-html-element-content-newline': 'off', // 多行html元素内容在新的一行
    // 'vue/html-closing-bracket-newline': 'off', // html右括号在新的一行
    semi: ['error', 'always'],
    'vue/attributes-order': [
      'off',
      {
        order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'EVENTS'],
        alphabetical: false
      }
    ],
    'vue/no-v-html': 'off', // 不使用v-html
    'vue/html-self-closing': 0, // 忽略html标签自闭合
    // 'accessor-pairs': 2, // 应同时设置setter和getter
    'arrow-spacing': [2, { before: true, after: true }], // 箭头间距
    'vue/require-default-prop': 0, // 不检查默认属性
    'comma-dangle': [2, 'never'], // 对象文字中的尾随逗号
    indent: ['error', 2, { SwitchCase: 1 }], // 缩进风格
    // 'no-lone-blocks': 2, // 消除脚本顶层或其他块中不必要的和可能混淆的块
    'no-mixed-spaces-and-tabs': 2, // 不允许使用混合空格和制表符进行缩进
    // 'no-multi-spaces': 2, // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
    // 'no-multi-str': 2, // 防止使用多行字符串
    'no-multiple-empty-lines': [2, { max: 1 }], // 最多一个空行
    'no-undef': 2, // 任何对未声明的变量的引用都会导致错误
    'no-undef-init': 2, // 消除初始化为undefined的变量声明
    'no-underscore-dangle': 0, // 标识符不能以_开头或结尾
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    'no-with': 2, // 禁用with
    'no-var': 2, // 禁用var
    'one-var': [2, { initialized: 'never' }], // 强制将变量声明为每个函数（对于var）或块（对于let和const）范围一起声明或单独声明。 initialized: 'never' 每个作用域要求多个变量声明用于初始化变量
    'space-infix-ops': 2, // 强制二元运算符左右各有一个空格
    'spaced-comment': [2, 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }], // 注释开始后，此规则将强制间距的一致性//或/*
    'template-curly-spacing': [2, 'never'], // 不允许大括号内的空格
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'array-bracket-spacing': [2, 'never'] // 不允许数组括号内的空格
  }
};
