import logo from './static/search-icon.jpg';
import './App.css';
import SearchHome from './components/SearchHome';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="searchIcon" className="App-logo"/>
      <SearchHome/>
      </div>
  );
}

export default App;
