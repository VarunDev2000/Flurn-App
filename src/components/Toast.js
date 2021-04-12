import { ToastAndroid } from "react-native";

export const showToast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    60
  );
};