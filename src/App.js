import React, {useState} from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import './App.css';

export const AppContext = React.createContext({});


function App() {
  const [currentLocation, setCurrentLocation] = useState('Alpharetta, GA');

  const globals = {
    currentLocation,
    setCurrentLocation
  };

  return (
      <AppContext.Provider value={globals}>
        <div className="App">
            <header className="App-header">
              <Header />
            </header>
            <main className="main-container">
              <SearchResultsContainer />
            </main>
            <footer>
              <Footer />
            </footer>
        </div>
      </AppContext.Provider>
  );
}

export default App;
