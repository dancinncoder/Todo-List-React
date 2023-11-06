import '../css/Input.css';

function Input (props) {
    // 제목 입력 박스
  const titleHandler = function (event) {
      props.setTitle(event.target.value);
     }
   
     // 내용 입력 박스
  const contentHandler = function (event) {
       props.setContent(event.target.value);
     }

  return(
    <div className="input_area_input">
      Title <input value={props.title} required onChange={titleHandler}/>
      Content <input value={props.content} required onChange={contentHandler}/>{props.isDone}
    </div>
  );
}


export default Input;