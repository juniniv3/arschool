import React from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroText,
} from '@reactvision/react-viro';

const initialScene = ( {onUpdateCounter}: { onUpdateCounter: (data: { foundedAnimals: number, currentAnimal: string }) => void } ) => {

  const [foundedAnimals, setfoundedAnimals] = React.useState<number>(0); // --- IGNORE ---

  const animals = [
    'lion',
    'dog',
    'monkey',
    'bunny',
    'fish',
    'bird',
  ];

  const models = [
    'lion',
    'dog',
    'monkey',
    'bunny',
    'fish',
    'bird',
    'mug',
    'wood',
  ];

  const handleTouch = (model:string) => {
    if (animals[foundedAnimals] === model) {
      setfoundedAnimals(foundedAnimals + 1);
    }
    onUpdateCounter({ foundedAnimals, currentAnimal: animals[foundedAnimals] }); // --- IGNORE ---
  };

  ViroARTrackingTargets.createTargets({
    lion: {
      source: require('./assets/targets/lion.png'),
      orientation: 'down',
      physicalWidth: 0.15, // This sets the real-world width of the image to 15cm (0.15 meters)
    },
    dog: {
      source: require('./assets/targets/dog.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    monkey: {
      source: require('./assets/targets/monkey.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    bunny: {
      source: require('./assets/targets/bunny.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    fish: {
      source: require('./assets/targets/fish.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    bird: {
      source: require('./assets/targets/bird.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    mug: {
      source: require('./assets/targets/mug.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
    wood: {
      source: require('./assets/targets/wood.png'),
      orientation: 'down',
      physicalWidth: 0.15,
    },
  });

  const modelAssets: { [key: string]: any } = {
    lion: require('./assets/3dModels/cartoon_lion.glb'),
    dog: require('./assets/3dModels/cartoon_dog.glb'),
    bird: require('./assets/3dModels/cartoon_bird.glb'),
    monkey: require('./assets/3dModels/cartoon_monkey.glb'),
    fish: require('./assets/3dModels/cartoon_fish.glb'),
    mug: require('./assets/3dModels/cartoon_mug.glb'),
    wood: require('./assets/3dModels/cartoon_wood.glb'),
    bunny: require('./assets/3dModels/cartoon_bunny.glb'),
  };
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />

      {models.map(model => (
        <ViroARImageMarker
          key={model}
          target={model}
        >
          <Viro3DObject
            source={modelAssets[model]}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            type="GLB"
            onTouch={() => handleTouch(model)}
            onClick={() => handleTouch(model)}
          />
        </ViroARImageMarker>
      ))}
    </ViroARScene>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [foundedAnimals, setfoundedAnimals] = React.useState(0);
  const [currentAnimal, setCurrentAnimal] = React.useState('León');

    const animalTranslations: { [key: string]: string } = {
      lion: 'León',
      dog: 'Perro',
      monkey: 'Mono',
      bunny: 'Conejo',
      fish: 'Pez',
      bird: 'Pájaro',
    };

    const animalEmojis: { [key: string]: string } = {
      León: '🦁',
      Perro: '🐶',
      Mono: '🐒',
      Conejo: '🐰',
      Pez: '🐟',
      Pájaro: '🐦',
    };

  const updateCounter = (animalsData: { foundedAnimals: number, currentAnimal: string }) => {
    setfoundedAnimals(animalsData.foundedAnimals);
    setCurrentAnimal(animalTranslations[animalsData.currentAnimal]);
  };
  return (
    <SafeAreaProvider>
      {foundedAnimals < 6 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Busca al {currentAnimal}</Text>
          <Text style={styles.headerEmoji}>{animalEmojis[currentAnimal]}</Text>
        </View>
      )}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {foundedAnimals < 6 && (
        <View style={styles.container}>
          <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => initialScene({ onUpdateCounter: updateCounter }),
        }}
        style={styles.arNavigator}
          />
        </View>
      )}
      {foundedAnimals === 6 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 100, textAlign: 'center', marginBottom: 20 , color: '#fff' }}>🎉</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 20 , color: '#fff' }}>
            ¡Felicidades! Has encontrado todos los animales.{"\n\n"}🦁 🐶 🐒 🐰 🐟 🐦
            </Text>
        </View>
      )}

      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              backgroundColor: '#FFD275',
              color: '#000',
              paddingVertical: 20,
              paddingHorizontal: 40,
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              flex: 1,
            }}
          > 
            Animales encontrados: {foundedAnimals}/6
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arNavigator: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
    backgroundColor: '#FFD275',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerEmoji: {
    fontSize: 60,
    lineHeight: 60,
  },
  footer: {
    alignItems: 'center',
  },
});

export default App;
