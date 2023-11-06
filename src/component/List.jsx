import '../css/List.css';

function List (props) {

  return (
    <div className="card_list_area">
      {props.children}
    </div>
  );
}


export default List;