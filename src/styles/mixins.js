import {Dimensions, PixelRatio} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Scale the given size to fit for the device screen size
export const scale = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const verticalScale = (size) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const scaleFont = (size) => size * PixelRatio.getFontScale();