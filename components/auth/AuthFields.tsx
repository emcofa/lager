import { ScrollView, Text, TextInput, Button } from "react-native";
import styles from '../../styles/Base.js';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <ScrollView style={styles.base}>
            <Text style={styles.info}>{title}</Text>
            <Text style={styles.form}>E-post:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.form}>Lösenord:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
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