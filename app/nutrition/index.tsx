import React from 'react';
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
import { useHealthStore, NutritionEntry } from '../../store/healthStore';

export default function NutritionIndex() {
    const router = useRouter();
    const { nutritionEntries, deleteNutrition } = useHealthStore();

    const handleDelete = (id: string) => {
        Alert.alert(
            'Kaydı Sil',
            'Bu kaydı silmek istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Sil', style: 'destructive', onPress: () => deleteNutrition(id) }
            ]
        );
    };

    const renderItem = ({ item }: { item: NutritionEntry }) => (
        <Card style={styles.entryCard}>
            <View style={styles.cardHeader}>
                <View style={styles.headerInfo}>
                    <Badge text={`${item.week}. Hafta`} variant="info" style={styles.weekBadge} />
                    <Text style={styles.mealName}>{item.meal}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={18} color={Colors.error} />
                </TouchableOpacity>
            </View>

            <View style={styles.itemsList}>
                {item.items.map((food, idx) => (
                    <View key={idx} style={styles.foodRow}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        <Text style={styles.foodAmount}>{food.amount}</Text>
                        <Text style={styles.foodCals}>{food.calories} kcal</Text>
                    </View>
                ))}
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.totalText}>Toplam:</Text>
                <Text style={styles.totalValue}>{item.totalCalories} kcal</Text>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#86efac', '#a7f3d0']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color={Colors.surface} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Beslenme Geçmişi</Text>
                    <Button
                        title="+ Yeni"
                        onPress={() => router.push('/nutrition/add')}
                        size="small"
                        pill
                        variant="secondary"
                        style={styles.addButton}
                    />
                </View>
            </LinearGradient>

            <FlatList
                data={nutritionEntries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<EmptyState icon="restaurant-outline" message="Henüz bir beslenme kaydı bulunmuyor." />}
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
        height: 140,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
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
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
    },
    addButton: {
        paddingHorizontal: 20,
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
        marginBottom: 12,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weekBadge: {
        marginRight: 10,
    },
    mealName: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    itemsList: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    foodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    foodName: {
        flex: 2,
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textMain,
    },
    foodAmount: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    foodCals: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.primary,
        textAlign: 'right',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
    },
    totalText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginRight: 8,
    },
    totalValue: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: Colors.primary,
    },
});
