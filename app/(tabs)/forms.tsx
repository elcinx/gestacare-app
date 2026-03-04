import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

const FORMS = [
    {
        id: 'blood-sugar',
        title: '🩸 Kan Şekeri İzlem',
        description: 'Günlük kan şekeri değerlerinizi kaydedin.',
        route: '/blood-sugar/index',
        icon: 'water'
    },
    {
        id: 'activities',
        title: '🏃 Fiziksel Aktivite',
        description: 'Yaptığınız egzersiz ve aktiviteleri takip edin.',
        route: '/activities/index',
        icon: 'walk'
    },
    {
        id: 'nutrition',
        title: '🥗 Beslenme Değerlendirme',
        description: 'Öğünlerinizin besin değerlerini analiz edin.',
        route: '/nutrition/index',
        icon: 'restaurant'
    }
];

export default function FormsScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.headerTitle}>Takip Formları</Text>
            <Text style={styles.headerSubtitle}>Sağlık verilerinizi düzenli olarak kayıt altına alın.</Text>

            {FORMS.map((form) => (
                <TouchableOpacity
                    key={form.id}
                    onPress={() => router.push(form.route as any)}
                    activeOpacity={0.7}
                >
                    <Card style={styles.formCard}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={form.icon as any} size={24} color={Colors.primary} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.formTitle}>{form.title}</Text>
                            <Text style={styles.formDescription}>{form.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
                    </Card>
                </TouchableOpacity>
            ))}
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
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginBottom: 32,
    },
    formCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 20,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    formTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    formDescription: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginTop: 2,
    },
});
