import React from 'react';
import Nav from './nav.js'
import './css/App.css';
import Data from './data.js';
import { store } from './index.js';
import { set_data } from './reducers/allReducers.js'

const styleLeft = {
  'float': 'left',
  'width': '50%'
}
const styleLeft2 = {
  'float': 'left',
  'width': '10%',
  'marginTop': '20px',
  'marginLeft': '20px',
}
var appData;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      liCSS: 'nestedClosed',
      listLi: []
    }
  }

  myfetch(mydata) {
    this.setState({ data: mydata });
  }

  componentDidMount() {
    Data('user').then((serverData) => {
      this.setState({ data: serverData.data })
      store.dispatch({ type: 'set', payLoad: serverData.data });
      })
      .catch(err => console.log('There was an error:' + err));
    console.log('componentDidMount');
  }

  setCSS(e) {
    let id = e.target.title;
    console.log(id + "-" + document.getElementById(id).className);
    if (document.getElementById(id).className === 'nestedClosed') {
      document.getElementById(id).classList.remove('nestedClosed');
      document.getElementById(id).classList.add('nestedShow');
      document.querySelector("[title='" + id + "']").classList.add('myCaret-down');
    } else {
      document.getElementById(id).classList.remove('nestedShow');
      document.getElementById(id).classList.add('nestedClosed');
      document.querySelector("[title='" + id + "']").classList.remove('myCaret-down');
    }
  }
  showData(e) {
    alert("data");
  }

  query(parentRow, startRow) {
    let arrCh = [];
    appData = this.state.data;
    console.log('P:' + parentRow + ' ' + appData.length);
    for (let row1 = 0; row1 < appData.length; row1++) {
      if (Number(appData[row1].parent) === Number(parentRow)) {
        arrCh.push(
          row1
        );
      }
    }
    return arrCh;
  }

  tree_(parentRow, startRow) {
    appData = this.state.data;
    if (appData.length === 0) {
      return;
    }
    let eArry = [];
    var arry = this.query(parentRow, startRow);
    console.log('Array: ' + arry);

    for (var row = 0; row < arry.length; row++) {
      let i = arry[row];
      let id = appData[i].id;
      let parent = appData[i].parent;
      let text = appData[i].text;
      let caption = appData[i].caption;

      if ((i + 1) < appData.length && appData[i + 1].parent === id) {
        eArry.push(
          <li ref={id} key={id}>
            <span title={id} className="myCaret" onClick={(id) => this.setCSS(id)}>
              <div title={id} className="btn btn-danger addBtnTop" >NO:{row}- P:{parent} id: {id}-- {caption}</div>
            </span>
            <ul id={id} ref={id} className={this.state.liCSS} data={text}>
              {this.tree_(id, id)}
            </ul>
          </li>
        );
      } else {
        eArry.push(
          <li key={id} data1={text}><span className="myCaret"></span>
            <button id={id} type="button" className="btn btn-primary addBtnTop" onClick={(e) => this.showData(e)}>ID : {id} ; P : {parent} - {caption}</button>
          </li>);
      }
    }
    return eArry;
  }

  render() {
    console.log('render');
    return <div>
      <Nav />
      <div style={styleLeft}>
        <ul className="myUL">
          {this.tree_(0, 0)}
        </ul>
      </div>
      <div id="myText" style={styleLeft2}></div>
    </div>
  };
}
export default App;