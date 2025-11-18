import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="main-content">
        {/* <SignIn /> */}
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App
