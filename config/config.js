export default {
  plugins: [
    ['umi-plugin-react', {
      //目前先空，后面用到会配置
      antd: true,
      dva: true,
      // locale: {
      //   enable: true,
      // },
    }],
  ],
  routes:[
    {
      path: '/index',
      component: '../layouts',
      //可以理解为路由的嵌套/qwe/asd/hello 
      routes: [
        {
          path: 'index',
          component: './index'
        },
        {
          path: 'list', // /qwe/asd/hello访问这里 
          component: '../pages/list/index',
        },
      ],
    },
  ],

}