###CUSTOM FONTS

#INSTALL 

expo install expo-font

#USE

import {useFonts} from 'expo-font';
function App() {
    const [loaded] = useFonts({
        QuicksandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }
  return <Text style={{ fontFamily: 'QuicksandBold' }} />;
}


###PICKER (SELECTOR)

expo install @react-native-community/picker