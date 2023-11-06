
import '../css/Header.css';

function Header () {

  function Reload (event) {
    window.location.replace('./app');
  }


  return(
    <header className="header">
          <a onClick={Reload}>My Todo List</a>
          <p>React</p>
    </header>
  );
}


export default Header;