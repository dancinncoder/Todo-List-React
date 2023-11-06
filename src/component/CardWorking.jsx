
import '../css/Card.css';

function CardWorking (props) {

  return(
    <div className="card_area_core">
      {props.toDoLists.map(function(item){
        return (
              <div key={item.id} className="card">
                <h2>{item.title}</h2>
                <div className="content_box">{item.content}</div>
                <div className="button_box">
                  <button className="delete_btn" onClick={() => props.deleteCardBtnHandler(item.id)}>delete</button>
                  <button className="done_btn" onClick={() => props.isDoneBtnHandler(item.id)}>done</button>
                </div>

                {/* <deleteBtn />
                <doneBtn /> */}
              </div>
            );})
      }
    </div>

  );
}

export default CardWorking;





