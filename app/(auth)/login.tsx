import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!username || !password) return;

        setLoading(true);
        // Simulating login delay
        setTimeout(() => {
            login(username);
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.headerAbsolute}>
                <Image
                    source={require('../../assets/images/login_bg.png')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.4)', Colors.background]}
                    style={styles.headerGradient}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.spacer} />
                <Card style={styles.card}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>GC</Text>
                    </View>
                    <Text style={styles.title}>Hoş Geldiniz</Text>
                    <Text style={styles.subtitle}>GestaCare ile sağlığınızı takip edin</Text>

                    <Input
                        label="Kullanıcı Adı"
                        placeholder="Adınızı giriniz"
                        leftIcon="person-outline"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Input
                        label="Şifre"
                        placeholder="Şifrenizi giriniz"
                        leftIcon="lock-closed-outline"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Button
                        title="Giriş Yap"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={!username || !password}
                        style={styles.loginButton}
                        pill
                    />
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    headerAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 380,
        zIndex: 0,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        zIndex: 1,
    },
    spacer: {
        height: 280,
    },
    card: {
        padding: 24,
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        ...Theme.shadow,
        marginTop: -64,
        marginBottom: 16,
        borderWidth: 4,
        borderColor: Colors.surface,
    },
    logoText: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: Colors.primary,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginBottom: 32,
        textAlign: 'center',
    },
    loginButton: {
        width: '100%',
        marginTop: 16,
    },
});
