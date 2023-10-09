import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';


const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
const optionsTimes = {
	0: 25,
	1: 5,
	2: 15,
};

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
      setTime(optionsTimes[currentTime] * 60);
    }
    
    return () => clearInterval(interval);

  }, [isActive, time])


function handleIsActive() {
  setIsActive(!isActive);
}

  return (
    <View style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <Text style={styles.text}>Pomodoro</Text>

      <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} />
      <Timer time={time} />
      
      <TouchableOpacity onPress={handleIsActive} style={styles.button}>
        <Text style={{color:"white", fontWeight:"bold"}}>{isActive ? "Stop" : "Start"}</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    paddingHorizontal: 15
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center'
  }
});
