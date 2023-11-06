
import '../css/Card.css';

function CardDone(props){

  return(
    <div className="card_area_core">
      {props.doneLists.map(function(item){
        return (
            <div key={item.id} className="card">
              <h2>{item.title}</h2>
              <div className="content_box">{item.content}</div>
              <div className="button_box">
                <button className="delete_btn" onClick={() => props.deleteCardBtnHandler(item.id)}>delete</button>
                <button className="cancel_btn" onClick={() => props.cancelBtnHandler(item.id)}>cancel</button>
            </div>
              </div>

          );})
      }
    </div>

  );
}

export default CardDone;


