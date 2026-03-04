import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/login');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={40} color={Colors.primary} />
                </View>
                <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'gestacare@user.com'}</Text>
            </View>

            <Card style={styles.sectionCard}>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <Ionicons name="settings-outline" size={20} color={Colors.textMain} />
                    </View>
                    <Text style={styles.menuText}>Uygulama Ayarları</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <Ionicons name="shield-checkmark-outline" size={20} color={Colors.textMain} />
                    </View>
                    <Text style={styles.menuText}>Gizlilik ve Güvenlik</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <Ionicons name="help-buoy-outline" size={20} color={Colors.textMain} />
                    </View>
                    <Text style={styles.menuText}>Yardım ve Destek</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
            </Card>

            <Button
                title="Çıkış Yap"
                onPress={handleLogout}
                variant="danger"
                style={styles.logoutButton}
            />

            <Text style={styles.versionText}>Versiyon 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 24,
        paddingTop: 60,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
    },
    sectionCard: {
        width: '100%',
        padding: 0,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginHorizontal: 20,
    },
    logoutButton: {
        width: '100%',
        marginTop: 32,
    },
    versionText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginTop: 24,
        marginBottom: 40,
    },
});
