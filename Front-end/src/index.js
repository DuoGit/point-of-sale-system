import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/App.css'
import AppRouter from './components/AppRouter/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <AppRouter />
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
