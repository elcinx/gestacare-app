import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/shared/EmptyState';
import { useHealthStore, BloodSugarEntry } from '../../store/healthStore';

export default function BloodSugarIndex() {
    const router = useRouter();
    const { bloodSugarEntries, deleteBloodSugar } = useHealthStore();
    const [date, setDate] = useState(new Date());

    const changeDate = (days: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };

    const filteredEntries = bloodSugarEntries.filter(entry =>
        entry.date === date.toLocaleDateString('tr-TR')
    );

    const getStatusVariant = (value: number) => {
        if (value < 70) return 'error';
        if (value <= 140) return 'success';
        return 'warning';
    };

    const getStatusLabel = (value: number) => {
        if (value < 70) return 'Düşük';
        if (value <= 140) return 'Normal';
        return 'Yüksek';
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Kaydı Sil',
            'Bu kaydı silmek istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Sil', style: 'destructive', onPress: () => deleteBloodSugar(id) }
            ]
        );
    };

    const renderItem = ({ item }: { item: BloodSugarEntry }) => (
        <Card style={styles.entryCard}>
            <View style={styles.cardHeader}>
                <View style={styles.mealInfo}>
                    <Text style={styles.mealName}>{item.meal}</Text>
                    <Badge text={item.type} variant="primary" style={styles.typeBadge} />
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{item.value}</Text>
                    <Text style={styles.unitText}>mg/dL</Text>
                    <Badge
                        text={getStatusLabel(item.value)}
                        variant={getStatusVariant(item.value)}
                        style={styles.statusBadge}
                    />
                </View>

                <View style={styles.footerRow}>
                    <View style={styles.timeInfo}>
                        <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                    {item.insulin && (
                        <View style={styles.insulinInfo}>
                            <Ionicons name="medical-outline" size={14} color={Colors.primary} />
                            <Text style={styles.insulinText}>{item.insulin} Ünite İnsülin</Text>
                        </View>
                    )}
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={Colors.gradient}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View style={styles.headerTopRow}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={22} color={Colors.surface} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Kan Şekeri İzlem</Text>
                        <View style={{ width: 36 }} />
                    </View>
                    <View style={styles.dateRow}>
                        <View style={styles.dateSelectorRow}>
                            <TouchableOpacity onPress={() => changeDate(-1)} style={styles.arrowButton}>
                                <Ionicons name="chevron-back" size={20} color={Colors.surface} />
                            </TouchableOpacity>
                            <View style={styles.dateSelector}>
                                <Ionicons name="calendar-outline" size={16} color={Colors.surface} />
                                <Text style={styles.dateText}>{date.toLocaleDateString('tr-TR')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => changeDate(1)} style={styles.arrowButton}>
                                <Ionicons name="chevron-forward" size={20} color={Colors.surface} />
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="+ Yeni"
                            onPress={() => router.push('/blood-sugar/add')}
                            size="small"
                            pill
                            variant="secondary"
                            style={styles.addButton}
                        />
                    </View>
                </View>
            </LinearGradient>



            <FlatList
                data={filteredEntries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<EmptyState icon="water-outline" message="Bu tarihe ait kayıt bulunamadı." />}
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
        height: 220,
        paddingTop: 50,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
    },
    headerContent: {
        gap: 8,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: Colors.surface,
        marginBottom: 8,
    },
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    dateText: {
        marginHorizontal: 8,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: Colors.surface,
    },
    addButton: {
        paddingHorizontal: 20,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    dateSelectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    mealInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealName: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginRight: 8,
    },
    typeBadge: {
        paddingVertical: 2,
    },
    cardBody: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 12,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    valueText: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
    },
    unitText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginLeft: 4,
        marginRight: 12,
    },
    statusBadge: {
        alignSelf: 'center',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
    },
    timeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    insulinInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insulinText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.primary,
        marginLeft: 4,
    },
});
