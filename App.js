import { StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux'
import Index from './components/Index';
import store from './components/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={ Platform.OS === "android" ? "light-content" : "light-content" } />
      <Index />
    </Provider>
  );
}