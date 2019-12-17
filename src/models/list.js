import request from '../utils/request';

export default {
  namespace : "list",
  state : {
    editobj : {},
    datalist : [],
  },

  effects : {
    *showListEf( { _ }, {call, put}) {
        const url = 'http://localhost:8000/index/list';
        const payload = yield call(request, url);
        yield put({type: 'showListRe', payload});          
    },
    *addOne( {payload,flag}, {call, put} ) {

      console.log("addOne flag", flag);
      yield  put({type:'addOneItem', payload,flag})
    },
    *delOne({payload}, {call, put}) {
      console.log("pay：", payload);
      yield  put({type:'delOneItem', payload});
    },
    *editOneShow({payload,flag}, {call, put}) {
      // const url = 'http://localhost:8000/index/list';
      // const allList = yield call(request, url);
      // yield put({type:'editOneShowItem', payload, allList})
      console.log("editOneShow payload:", payload);
      yield put({type:'editOneShowItem', payload,flag});
    },
    *search({name, age, desc}, {call, put}) {
      console.log("name, age,desc:",name, age, desc);
      yield put({type:'searchList', name, age, desc});
    }


  },

  reducers: {
    showListRe(state, {type, payload}) {        
      const newList = payload;
      return {
        datalist: newList,
      }
    },

    addOneItem(state, {type, payload,flag}) {
      console.log("addOneItem payload:", payload);

      const newList = state.datalist;

      if(flag === "add") {
        return {
          datalist: [...newList, payload],
        }
      } else {
        for(var i=0; i<newList.length; i++) {
          if(newList[i].id === payload.id) {//为0为添加
            newList[i] = payload;
            break;
          }
        }
        return {
          datalist: newList,
        }
      }    
    },

    delOneItem(state, {type, payload}) {
      const newList = state.datalist;
      for(var i=0; i<newList.length; i++){
        if(newList[i].id === payload) {
          newList.splice(i, 1);
          break;
        }
      }
      return {
        datalist: newList,
      }
    },

    //editOneShowItem(state, {type, payload, allList}) {
    editOneShowItem(state, {type, payload,flag}) {
      const newList = state.datalist;
      var editobj= {};

      if(flag === "add") {
        return {
          editobj: editobj,
          datalist: newList,
        }
      }else{
        for(var i=0; i<newList.length; i++){
          if(newList[i].id === payload) {
            editobj = newList[i];
            break;
          }
        }
        console.log("editOneShowItem editobj:", editobj);
        return {
          editobj: editobj,
          datalist: newList,
        }
      }
    },

    searchList(state, {type, name, age, desc}) {
      const list = state.datalist;
      var rlist = [];
      for(var i=0; i< list.length; i++) {
        if((name==="" || list[i].name===name) && (age==undefined ||list[i].age == age) && (desc==="" || list[i].desc===desc)){
          rlist = [...rlist, list[i]];
        }
      }
      console.log("rlist:", rlist);
      return {
        datalist: rlist,
      }


    }
  },
}