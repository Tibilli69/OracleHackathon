import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Heatmaps} from './Screens/Heatmap';
import {Intro} from './Screens/Intro';
import {Home} from './Screens/HomeScreen';
import {Cart} from './Screens/Cart';
// import {Splash} from './Screens/Splash'
// import {Chart} from './Screens/chart'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
      {/* <Stack.Screen name="Splash" component={Splash}/> */}
        <Stack.Screen name="Intro" component={Intro}/>
        <Stack.Screen name="Heatmap" component={Heatmaps}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Cart" component={Cart}/>
        
        {/* <Stack.Screen name="Chart" component={Chart}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

