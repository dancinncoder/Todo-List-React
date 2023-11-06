import './css/App.css';
import Layout from './component/Layout';
import Input from './component/Input';
import Submit from './component/Submit';
import List from './component/List';
import CardWorking from './component/CardWorking';
import CardDone from './component/CardDone';
import {useState} from 'react';

function App() {
  const initialToDoLists = JSON.parse(localStorage.getItem('toDoLists')) || [];
  const initialDoneLists = JSON.parse(localStorage.getItem('doneLists')) || [];
  const [toDoLists, setToDoLists] = useState(initialToDoLists);
  const [doneLists, setDoneLists] = useState(initialDoneLists);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
 
  // 할일 카드 '추가' 기능
  const addCardBtnHandler = function (event) {
    const newToDoList = {id: toDoLists.length + 1, title, content, isDone: false};
    setToDoLists([...toDoLists, newToDoList]);
    setTitle(""); 
    setContent(""); 
    localStorage.setItem('toDoLists', JSON.stringify([...toDoLists, newToDoList]));
  }

  // todo 카드, done 카드 '삭제' 기능
  const deleteCardBtnHandler = function (id) {
    const clickedDeletedInToDoLists = toDoLists.some(function(item){
      return item.id === id;
    });
    const clickedDeletedInDoneLists = doneLists.some(function(item){
      return item.id === id;
    });

    if (clickedDeletedInToDoLists) {
        const remainedToDoLists = toDoLists.filter(function(toDoList){
        return toDoList.id !== id;
     });
      setToDoLists(remainedToDoLists);
      localStorage.setItem('toDoLists', JSON.stringify(remainedToDoLists));
    } else if (clickedDeletedInDoneLists) {
        const remainedDoneLists = doneLists.filter(function(doneList){
        return doneList.id !== id;
      });
      setDoneLists(remainedDoneLists);
      localStorage.setItem('doneLists', JSON.stringify(remainedDoneLists));
    } else {
        alert("오류발생");
    }
  };
  
  // done 에서 working으로 보내는 '취소' 기능
  const cancelBtnHandler = function(id) {
    const clickedList = doneLists.find(function(doneList){
      return (doneList.id === id);
    })
    const canceledList = {...clickedList, isDone : false};
    toDoLists.push(canceledList);
    
    const updatedToDoLists = toDoLists.filter(function(toDoList){
      return clickedList;
    });

    const remainedDoneLists = doneLists.filter(function(doneList){
      return (doneList.id !== id);
    })
    setDoneLists(remainedDoneLists);
    setToDoLists(updatedToDoLists);
    localStorage.setItem('doneLists', JSON.stringify(remainedDoneLists));
    localStorage.setItem('toDoLists', JSON.stringify(updatedToDoLists));
  }

  // working 에서 done 으로 보내는 '완료' 기능
  const isDoneBtnHandler = function (id) {
    const clickedList = toDoLists.find(function(toDoList){
      return (toDoList.id === id);
    })
    const doneList = {...clickedList, isDone : true};
    doneLists.push(doneList);

    const remainedDoneLists = doneLists.filter(function(doneList){
      return clickedList;
    });

    // remainedToDoLists 에서 완료된 요소를 working 영역에서 삭제한다.
    const remainedToDoLists = toDoLists.filter(function(toDoList){
      return (toDoList.id !== id);
    })
    setDoneLists(remainedDoneLists);
    setToDoLists(remainedToDoLists);
    localStorage.setItem('doneLists', JSON.stringify(remainedDoneLists));
    localStorage.setItem('toDoLists', JSON.stringify(remainedToDoLists));
  }

  return (
    <Layout>
      <div className="input_area">
        <Input title={title} content={content} isDone={isDone} setTitle={setTitle} setContent={setContent}/>
        <Submit addCardBtnHandler={addCardBtnHandler}/>
      </div>
      <div className="card_display_area">
        <List>
          <h2>Working..</h2>
          <CardWorking isDone={isDone} toDoLists={toDoLists} deleteCardBtnHandler={deleteCardBtnHandler} isDoneBtnHandler={isDoneBtnHandler}/>
        </List>
        <List>
          <h2>Done..!</h2>
          <CardDone isDone={isDone} doneLists={doneLists} deleteCardBtnHandler={deleteCardBtnHandler} cancelBtnHandler={cancelBtnHandler}/>
        </List>
      </div>
    </Layout>
  );
}

export default App;



