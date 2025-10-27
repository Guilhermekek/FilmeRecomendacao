
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIZE = 200;
const MARGIN = 20;
const INITIAL_OFFSET = (SCREEN_WIDTH - SIZE) / 2;

interface Filme {
  titulo: string;
  poster: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function HomeScreen() {
  const { darkMode } = useTheme();
  const styles = getStyles(darkMode);

  // Intro states
  const [showIntro, setShowIntro] = useState(true);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const dashOffset = useSharedValue(0);
  const scale = useSharedValue(1);

  // Carousel states
  const [items, setItems] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const offset = useSharedValue<number>(INITIAL_OFFSET);

  // Medir o "N" invisível
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setDims({ width, height });
    dashOffset.value = width + Math.hypot(width, height) + height;
  };

  // Sequência da intro: revelar → pausa → zoom → esconder
  useEffect(() => {
    const { width, height } = dims;
    if (width && height) {
      const total = height + Math.hypot(width, height) + height;
      dashOffset.value = withSequence(
        withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) }),
        withDelay(400,
          withTiming(-total, { duration: 1000, easing: Easing.in(Easing.quad) })
        )
      );
      scale.value = withDelay(1000, withTiming(2, { duration: 2000 }));
    }
  }, [dims, dashOffset, scale]);

  // Esconde a intro depois de 2.5s
  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // Buscar filmes via API
  useEffect(() => {
    fetch('http://localhost:3000/filmes/now-playing')
      .then(r => r.json())
      .then((data: Filme[]) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Animação do carrossel
  const animatedCarouselStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const advanceBy = (position: number) => {
    const step = SIZE + 2 * MARGIN;
    const TOTAL_WIDTH = items.length * (SIZE + 2 * MARGIN);
    const RIGHT_BOUNDARY = -(TOTAL_WIDTH - SCREEN_WIDTH);
    const maxLeft = INITIAL_OFFSET;
    const maxRight = RIGHT_BOUNDARY + INITIAL_OFFSET;
    const newOffset = offset.value + step * -position;

    if (newOffset <= maxLeft && newOffset >= maxRight) {
      offset.value = withSpring(newOffset, {
        restDisplacementThreshold: 5,
        restSpeedThreshold: 5,
      });
    }
  };

  // Props animados da intro
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));
  const animatedMaskStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Se ainda no loading de filmes, mostra spinner (após intro)
  if (!showIntro && loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={darkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  // Se no intro, renderiza só ela
  if (showIntro) {
    return (
      <View style={styles.container}>
        {dims.width === 0 ? (
          <Text
            onLayout={onLayout}
            style={[styles.introText, styles.invisible]}
          >
            N
          </Text>
        ) : (
          <MaskedView
            style={{ width: dims.width, height: dims.height }}
            maskElement={
              <Animated.View style={animatedMaskStyle}>
                <Svg width={dims.width} height={dims.height}>
                  <AnimatedPath
                    d={`M0 ${dims.height} L0 0 L${dims.width} ${dims.height} L${dims.width} 0`}
                    stroke="#E50914"
                    strokeWidth={dims.height * 0.25}
                    strokeDasharray={
                      dims.height +
                      Math.hypot(dims.width, dims.height) +
                      dims.height
                    }
                    animatedProps={animatedProps}
                    fill="none"
                  />
                </Svg>
              </Animated.View>
            }
          >
            <Text style={styles.introText}>N</Text>
          </MaskedView>
        )}
      </View>
    );
  }

  // Resto: carrossel
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Pressable onPress={() => advanceBy(-1)} style={styles.navButton}>
          <Text style={styles.buttonItem}>{'<'}</Text>
        </Pressable>
        <Pressable onPress={() => advanceBy(1)} style={styles.navButton}>
          <Text style={styles.buttonItem}>{'>'}</Text>
        </Pressable>
      </View>

      <Animated.View style={[styles.row, animatedCarouselStyle]}>
        {items.map(item => (
          <View key={item.titulo} style={styles.box}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <Text style={styles.title}>{item.titulo}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    buttonWrapper: {
      position: 'absolute',
      top: '45%',
      width: '100%',
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    navButton: {
      width: SIZE / 3,
      height: SIZE / 3,
      borderRadius: SIZE,
      backgroundColor: isDark ? '#666' : '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonItem: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },

    row: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    box: {
      width: SIZE,
      marginHorizontal: MARGIN,
      alignItems: 'center',
    },
    poster: {
      width: SIZE,
      height: SIZE,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    title: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
      textAlign: 'center',
    },
    // intro
    introText: {
      fontSize: 120,
      fontWeight: '900',
      color: '#E50914',
    },
    invisible: {
      position: 'absolute',
      opacity: 0,
    },
  });
