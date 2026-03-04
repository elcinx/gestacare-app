import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Su Hatırlatıcısı',
        description: 'Bir bardak su alma vaktiniz geldi!',
        date: '10:30',
        read: false,
        icon: 'water-outline'
    },
    {
        id: '2',
        title: 'Öğle Yemeği Kaydı',
        description: 'Öğle yemeği kan şekerinizi ölçmeyi unutmayın.',
        date: '13:00',
        read: false,
        icon: 'restaurant-outline'
    },
    {
        id: '3',
        title: 'Egzersiz Zamanı',
        description: 'Bugünkü 20 dakikalık yürüyüşünüzü henüz gerçekleştirmediniz.',
        date: 'Dün',
        read: true,
        icon: 'walk-outline'
    },
    {
        id: '4',
        title: 'Haftalık Rapor',
        description: 'Geçen haftanın kan şekeri raporu hazır.',
        date: '2 gün önce',
        read: true,
        icon: 'stats-chart-outline'
    }
];

export default function NotificationsScreen() {
    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer}>
            <Card style={[styles.card, !item.read && styles.unreadCard]}>
                {!item.read && <View style={styles.unreadIndicator} />}
                <View style={styles.iconContainer}>
                    <Ionicons name={item.icon as any} size={24} color={item.read ? Colors.textSecondary : Colors.primary} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={[styles.title, !item.read && styles.unreadText]}>{item.title}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bildirimler</Text>
            </View>
            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 24,
        backgroundColor: Colors.surface,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    unreadCard: {
        borderColor: Colors.primaryLight,
        borderWidth: 1,
    },
    unreadIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: Colors.primary,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    unreadText: {
        fontFamily: 'Poppins_700Bold',
    },
    date: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        lineHeight: 20,
    },
});
