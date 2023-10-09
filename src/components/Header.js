import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ setTime, currentTime, setCurrentTime }) {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={styles.viewHeader}>
            {options.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(index)} style={[styles.itemStyle, currentTime !== index && { borderColor: "transparent" }]}>
                    <Text style={{fontWeight: "bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: "row",

    },
    itemStyle: {
        width: "33%",
        borderColor: "white",
        marginVertical: 20,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 3,
        padding: 5,

    }
})