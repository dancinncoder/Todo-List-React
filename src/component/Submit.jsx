import '../css/Submit.css';

function Submit (props) {

  return(
    <div className="input_area_button">
      <button onClick={props.addCardBtnHandler}>Add</button>
    </div>
  );
}

export default Submit;