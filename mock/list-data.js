const list = [
  { 
    id : '1',
    name: '李四',
    age : 18,
    desc: '我是李四'
  },
  { 
    id : '2',
    name: '金所炫',
    age : 19,
    desc: '我是所选'
  },
  { 
    id : '3',
    name: '李智恩',
    age : 22,
    desc: '我是智恩'
  },
  { 
    id : '4',
    name: '杨幂',
    age : 35,
    desc: '我是杨幂'
  },
];

export default {

  'get /index/list': function (req, res) {
    res.json(list);
  },
}