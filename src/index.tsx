import { App } from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReactDOM from 'react-dom';
import reducer from './Reducers';
import thunk from "redux-thunk";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { CSSreset } from './Styles/CssReset';
import { ThemeProvider } from 'styled-components';
import theme from './Styles/Theme';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSreset />
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();