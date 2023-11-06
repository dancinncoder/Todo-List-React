import Header from './Header';
import '../css/Layout.css';

function Layout (props) {
  
  return(
    <div className="outer_frame">
      <div className="main_box">
        <Header></Header>
        {props.children}
      </div>
    </div>
  );
}

export default Layout;