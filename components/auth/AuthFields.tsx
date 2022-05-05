import { ScrollView, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import styles from '../../styles/Base.js';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {

    function validateEmail(text: string) {
        //regex
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltig email",
                description: "Email-addressen uppfyller ej kraven.",
                type: "warning"
            });
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltigt lösenord",
                description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver, mist en siffra och specialtecken",
                type: "warning"
            });
        }
    }
    return (
        <ScrollView style={styles.base}>
            <Text style={styles.info}>{title}</Text>
            <Text style={styles.form}>E-post</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    validateEmail(content);
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID = "email-field"
            />
            <Text style={styles.form}>Lösenord:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    validatePassword(content);
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID = "password-field"
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera konto"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </ScrollView>
    );
};