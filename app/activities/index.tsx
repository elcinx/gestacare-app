import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/shared/EmptyState';
import { useHealthStore, ActivityEntry } from '../../store/healthStore';

export default function ActivitiesIndex() {
    const router = useRouter();
    const { activityEntries, deleteActivity } = useHealthStore();

    const handleDelete = (id: string) => {
        Alert.alert(
            'Kaydı Sil',
            'Bu kaydı silmek istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Sil', style: 'destructive', onPress: () => deleteActivity(id) }
            ]
        );
    };

    const renderItem = ({ item }: { item: ActivityEntry }) => (
        <Card style={styles.entryCard}>
            <View style={styles.cardHeader}>
                <View style={styles.headerInfo}>
                    <Badge text={`${item.dayNumber}. Gün`} variant="primary" style={styles.dayBadge} />
                    <Text style={styles.activityType}>{item.type}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={18} color={Colors.error} />
                </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Ionicons name="timer-outline" size={16} color={Colors.textSecondary} />
                        <Text style={styles.infoValue}>{item.duration} dk.</Text>
                    </View>
                    <Badge
                        text={item.completed ? 'Yapıldı ✅' : 'Yapılmadı ❌'}
                        variant={item.completed ? 'success' : 'gray'}
                        style={styles.statusBadge}
                    />
                </View>

                <View style={styles.footerRow}>
                    <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
                    <Text style={styles.footerText}>{item.date} {item.time}</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/activities_banner.png')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.4)', Colors.background]}
                    style={styles.headerGradient}
                />
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color={Colors.textMain} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Aktivite Geçmişi</Text>
                    <Button
                        title="+ Yeni"
                        onPress={() => router.push('/activities/add')}
                        size="small"
                        pill
                        style={styles.addButton}
                    />
                </View>
            </View>

            <FlatList
                data={activityEntries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<EmptyState icon="walk-outline" message="Henüz bir aktivite kaydı bulunmuyor." />}
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
        height: 200,
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    addButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listContent: {
        padding: 16,
        flexGrow: 1,
    },
    entryCard: {
        marginBottom: 16,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayBadge: {
        marginRight: 10,
        paddingVertical: 2,
    },
    activityType: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    cardBody: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
        marginLeft: 6,
    },
    statusBadge: {
        paddingVertical: 2,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
    },
    footerText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginLeft: 6,
    },
});
