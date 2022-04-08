// ** React Imports
// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss';
import axios from 'axios';
// ** PrismJS
import 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism-tomorrow.css';
import {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
// ** Redux Imports
import {Provider} from 'react-redux';
// ** Toast & ThemeColors Context
import {ToastContainer} from 'react-toastify';
// ** Core styles
import './@core/assets/fonts/feather/iconfont.css';
// ** Ripple Button
import './@core/components/ripple-button';
// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner';
import './@core/scss/core.scss';
import './assets/scss/style.scss';
import {store} from './redux/storeConfig/store';
// ** Service Worker
import * as serviceWorker from './serviceWorker';
import {ModalProvider} from './utility/context/Modal';
import {ThemeContext} from './utility/context/ThemeColors';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const queryClient = new QueryClient();

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      if (error.response.data.error === 'User not found') {
        throw new Error('unf');
      } else if (error.response.data.error === 'Incorrect password') {
        throw new Error('pin');
      }
    }
    if (error.response.status === 401) {
      if (localStorage.getItem('userData').length) {
        localStorage.removeItem('userData');
        window.location.reload();
      }
      throw new Error(error);
    }
    throw new Error(error);
  }
);
// axios.defaults.baseURL = "http://dev.clinic.speroprev.com/api";
console.log('Running at port', process.env.REACT_APP_API_URL);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = JSON.parse(
  localStorage.getItem('userData')
)?.token;

// axios.defaults.headers.common["Authorization"] = token;

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <ModalProvider>
            <LazyApp />
            <ToastContainer newestOnTop />
          </ModalProvider>
        </ThemeContext>
      </Suspense>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
