// import {useState} from 'react';


// function CardDone(props){
//   const [buttonTitle, setButtonTitle] = useState("");

//   const buttonTitleRenderHandler = function(props) {
//     if (props.isDone === true) {
//         return setButtonTitle("cancel");
//     } else {
//         return setButtonTitle("done");
//     }

//   return 
//   }
  


//   return(
//     <div className="card_area_core">
//       {props.doneLists.map(function(item){
//         return (
//             <div key={item.id} className="card">
//               <h2>{item.title}</h2>
//               <div className="content_box">{item.content}</div>
//               <div className="button_box">
//                 <button className="delete_btn" onClick={() => props.deleteCardBtnHandler(item.id)}>delete</button>
//                 <button className="cancel_btn" buttonTitleRenderHandler={buttonTitleRenderHandler} onClick={() => props.cancelBtnHandler(item.id)}></button>
//             </div>
//               </div>

//           );})
//       }
//     </div>

//   );
// }

// export default CardDone;


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


