import  {combineReducers} from 'redux';

let init= {
   data:[],
   parents:-1,
   activeElement:-1,
   text:'',
   ratingScore:0,
   myTextarea: {
    height: '100%',
    width: '100%',
    backgroundColor:'#222',
    fontSize: '18px',
    color:'#ccc'
  },
   log:false
}
   
const dataR = (state=init,action) => {    
    const newState = {...state};

    switch(action.type){
        case 'set':  newState.data = action.payLoad;  return newState;
        case 'get': return newState;
        case 'setElement':  const newS = {
            ...newState,
            activeElement :action.payLoad,
            parents : action.parents,
            text : action.text,
            ratingScore: parseInt(action.ratingScore),
        } 
        return newS;
        case 'textSizeUpDown':
            const newO = {
                height: '100%',
                width: '100%',
                backgroundColor:'#222',
                color:'#ccc'
            }
            newO.fontSize= action.payLoad +'px';
            newState.myTextarea = newO;            
        return newState;
        case 'setText':        
        newState.data.forEach(element => {
            if (element.id === action.id){
              element.text=action.text;
            }
          });          
       
        newState.text = action.text; 
        return newState;
        case 'setRatingScore':        
        newState.data.forEach(element => {
            if (element.id === action.id){
              element.ratingScore = action.ratingScore;
            }
          });          
        return newState;
        default: return  newState;
    }
}

export const set_data = (nr) => {
    return {
        type: 'set',
        payLoad: nr
    }
}

export const set_activeElement = (nr,text,parent) => {
    return {
        type: 'setElement',
        payLoad: nr,
        parent: parent,    
        text:text
    }
}


export const allReducers = combineReducers({
    reduceData:dataR
})