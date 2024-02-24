import AppNavigation from './navigation';
import TabNavigation from './navigation/TabNavigation';
import SignInScreen from './ui/screens/SignInScreen';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential

} from 'firebase/auth';
import { auth } from './firebaseConfig';


WebBrowser.maybeCompleteAuthSession();


export default function App() {

  const [userInfo, setUserInfo] =React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
    '533028887636-h4soebmski6pobpbvot28752d5rjataa.apps.googleusercontent.com',
    androidClientId:
    '533028887636-vrs7jo8dbsce6thti3fhdj9rkjuhcqpf.apps.googleusercontent.com'
  });

  React.useEffect(() => {
    if(response?.type ==='success') {
      const {id_token}=response.params
      const credentials = GoogleAuthProvider.credential(id_token);
      signInWithCredential(credentials);
    }
  },
  [response])

  return (
      // <AppNavigation />
      // <TabNavigation/>
      <SignInScreen promptAsync={promptAsync}/>
  );
}
