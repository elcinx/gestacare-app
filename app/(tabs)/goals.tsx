import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

const GOALS = [
    {
        id: 'blood-sugar',
        title: '🩸 Kan Şekeri Hedefleri',
        items: [
            'Açlık: ≤ 95 mg/dl',
            'Tokluk 1. saat: ≤ 140 mg/dl',
            'Tokluk 2. saat: ≤ 120 mg/dl'
        ],
        icon: 'water'
    },
    {
        id: 'nutrition',
        title: '🍽️ Beslenme',
        items: [
            'Günlük hedef: 2200 kcal',
            'Dengeli protein ve karbonhidrat dağılımı'
        ],
        icon: 'restaurant'
    },
    {
        id: 'exercise',
        title: '🏃 Egzersiz',
        items: [
            'Haftada en az 3 gün',
            '20–30 dakika orta tempolu yürüyüş'
        ],
        icon: 'walk'
    },
    {
        id: 'water',
        title: '💧 Su Tüketimi',
        items: [
            'Günlük 2,5 – 3 litre su',
            'Düzenli aralıklarla içilmelidir'
        ],
        icon: 'cafe'
    }
];

export default function GoalsScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <LinearGradient
                colors={['#fbcfe8', '#fce7f3']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Günlük Hedefler</Text>
                    <Text style={styles.headerSubtitle}>Sağlıklı bir gebelik süreci için bu hedeflere uyun.</Text>
                </View>
            </LinearGradient>

            <View style={styles.goalsContainer}>
                {GOALS.map((goal) => (
                    <Card key={goal.id} style={styles.goalCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <Ionicons name={goal.icon as any} size={24} color={Colors.primary} />
                            </View>
                            <Text style={styles.goalTitle}>{goal.title}</Text>
                        </View>
                        <View style={styles.itemsContainer}>
                            {goal.items.map((item, index) => (
                                <View key={index} style={styles.goalItem}>
                                    <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                                    <Text style={styles.goalItemText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        paddingBottom: 24,
    },
    header: {
        height: 180,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    headerContent: {
        width: '100%',
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textMain,
        opacity: 0.8,
    },
    goalsContainer: {
        paddingHorizontal: 24,
    },
    goalCard: {
        marginBottom: 20,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    goalTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    itemsContainer: {
        paddingLeft: 4,
    },
    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    goalItemText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textMain,
        marginLeft: 12,
    },
});
