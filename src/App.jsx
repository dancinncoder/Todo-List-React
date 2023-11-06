import './css/App.css';
import Layout from './component/Layout';
import Input from './component/Input';
import Submit from './component/Submit';
import List from './component/List';
import CardWorking from './component/CardWorking';
import CardDone from './component/CardDone';
import {useState} from 'react';

function App() {
  // Local Storage 초기 데이터 (빈 배열이거나, local storage에서 가져오기)
  const initialToDoLists = JSON.parse(localStorage.getItem('toDoLists')) || [];
  const initialDoneLists = JSON.parse(localStorage.getItem('doneLists')) || [];

  // working 카드 리스트, done 카드 리스트, 카드 제목 입력값, 카드 내용 입력값, 완료여부
  const [toDoLists, setToDoLists] = useState(initialToDoLists);
  const [doneLists, setDoneLists] = useState(initialDoneLists);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
 
  // 할일 카드 '추가' 기능
  const addCardBtnHandler = function (event) {
    const newToDoList = {id: toDoLists.length + 1, title, content, isDone: false};
    setToDoLists([...toDoLists, newToDoList]);

    setTitle(""); // 추가 버튼 클릭 후, 제목 입력창 내용 초기화
    setContent(""); // 추가 버튼 클릭 후, 내용 입력창 내용 초기화

    // 업데이트된 working 카드 리스트, local storage에 저장
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

    // 삭제하기로 클릭한 카드를 진행중 카드에서 걸러낸 나머지 카드들
    if (clickedDeletedInToDoLists) {
      const remainedToDoLists = toDoLists.filter(function(toDoList){
        return toDoList.id !== id;
     });
      setToDoLists(remainedToDoLists);
      localStorage.setItem('toDoLists', JSON.stringify(remainedToDoLists));
      console.log('진행중에서 삭제된거 뺴고 나머지',remainedToDoLists)

    } else if (clickedDeletedInDoneLists) {
      const remainedDoneLists = doneLists.filter(function(doneList){
        return doneList.id !== id;
      });
      setDoneLists(remainedDoneLists);
      localStorage.setItem('doneLists', JSON.stringify(remainedDoneLists));
      console.log('완료중에서 삭제된거 빼고 나머지', remainedDoneLists);
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

    // 업데이트된 todo 카드 리스트와 done 카드 리스트를 local storage에 저장
    localStorage.setItem('doneLists', JSON.stringify(remainedDoneLists));
    localStorage.setItem('toDoLists', JSON.stringify(updatedToDoLists));
  }

  // working 에서 done 으로 보내는 '완료' 기능
  const isDoneBtnHandler = function (id) {
    // 로직 순서
    // 완료버튼을 누른 객체(카드)를 뽑아낸다.
    // 이렇게 뽑은 객체의 isDone의 value를 true로 바꾼다.
    // value 값이 바뀐 객체(카드)를 반환한다.
    // doneLists 배열에 하나씩 추가한다 push
    
    const clickedList = toDoLists.find(function(toDoList){
      return (toDoList.id === id);
    })
    // console.log('클릭만 된, 아직 false 상태카드', clickedList);
    const doneList = {...clickedList, isDone : true};
    // console.log('트루로바뀐', doneList);
    doneLists.push(doneList);
    // console.log('완료된 리스트 모음의 배열', doneLists);
    
    // isDone이 false인 카드를 제외한 모든 카드 배열
    const remainedDoneLists = doneLists.filter(function(doneList){
      return clickedList;
    });

    console.log('remainedDoneLists!!!!!!!', remainedDoneLists);

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



