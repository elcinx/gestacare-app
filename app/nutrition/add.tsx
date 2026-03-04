import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useHealthStore } from '../../store/healthStore';

const MEALS = ['Sabah', 'Öğle', 'Akşam', 'Ara Öğün'];
const WEEKS = Array.from({ length: 42 }, (_, i) => `${i + 1}. Hafta`);

const FOOD_DATABASE = [
    { name: 'Ayran', calories: 40, unit: 'Bardak' },
    { name: 'Yoğurt', calories: 60, unit: 'Kase' },
    { name: 'Tam Buğday Ekmek', calories: 70, unit: 'Dilim' },
    { name: 'Yumurta', calories: 75, unit: 'Adet' },
    { name: 'Peynir', calories: 95, unit: 'Dilim' },
    { name: 'Zeytin', calories: 10, unit: 'Adet' },
    { name: 'Elma', calories: 50, unit: 'Adet' },
    { name: 'Tavuk Izgara', calories: 165, unit: '100g' },
    { name: 'Salata', calories: 45, unit: 'Porsiyon' },
];

export default function AddNutrition() {
    const router = useRouter();
    const addNutrition = useHealthStore((state) => state.addNutrition);

    const [step, setStep] = useState(1);
    const [week, setWeek] = useState('1. Hafta');
    const [meal, setMeal] = useState('Sabah');

    const [selectedItems, setSelectedItems] = useState<{ name: string; calories: number; amount: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFoodDropdown, setShowFoodDropdown] = useState(false);
    const [amount, setAmount] = useState('1');

    const filteredFood = FOOD_DATABASE.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddItem = (food: typeof FOOD_DATABASE[0]) => {
        setSelectedItems([...selectedItems, {
            name: food.name,
            calories: food.calories * parseFloat(amount || '1'),
            amount: `${amount} ${food.unit}`
        }]);
        setSearchQuery('');
        setAmount('1');
        setShowFoodDropdown(false);
    };

    const removeItem = (index: number) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
    };

    const totalCalories = selectedItems.reduce((sum, item) => sum + item.calories, 0);

    const handleSave = () => {
        if (selectedItems.length === 0) return;

        addNutrition({
            week: parseInt(week.split('.')[0]),
            meal,
            items: selectedItems,
            totalCalories,
            date: new Date().toLocaleDateString('tr-TR')
        });

        router.back();
    };

    if (step === 1) {
        return (
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <ProgressBar progress={0.5} style={styles.progressBar} />
                    <Text style={styles.stepText}>Adım 1/2: Genel Bilgiler</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        <Text style={styles.label}>Gebelik Haftası</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelector}>
                            {WEEKS.map((w) => (
                                <TouchableOpacity
                                    key={w}
                                    style={[styles.weekChip, week === w && styles.weekChipActive]}
                                    onPress={() => setWeek(w)}
                                >
                                    <Text style={[styles.chipText, week === w && styles.chipTextActive]}>{w}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.label}>Öğün Seçimi</Text>
                        <View style={styles.mealGrid}>
                            {MEALS.map((m) => (
                                <TouchableOpacity
                                    key={m}
                                    style={[styles.mealButton, meal === m && styles.mealActive]}
                                    onPress={() => setMeal(m)}
                                >
                                    <Text style={[styles.mealText, meal === m && styles.mealTextActive]}>{m}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Button
                            title="Besin Seçimine Git →"
                            onPress={() => setStep(2)}
                            style={styles.nextButton}
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.progressContainer}>
                <ProgressBar progress={1.0} style={styles.progressBar} />
                <Text style={styles.stepText}>Adım 2/2: Besin Ekleme</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <Input
                        label="Besin Ara"
                        placeholder="Besin adı yazın..."
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            setShowFoodDropdown(text.length > 0);
                        }}
                        leftIcon="search-outline"
                    />

                    {showFoodDropdown && (
                        <View style={styles.dropdownList}>
                            {filteredFood.length > 0 ? (
                                filteredFood.map((food, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.foodItem}
                                        onPress={() => handleAddItem(food)}
                                    >
                                        <View>
                                            <Text style={styles.foodItemName}>{food.name}</Text>
                                            <Text style={styles.foodItemMeta}>{food.calories} kcal / {food.unit}</Text>
                                        </View>
                                        <Ionicons name="add-circle" size={24} color={Colors.primary} />
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.noResult}>Sonuç bulunamadı.</Text>
                            )}
                        </View>
                    )}

                    <Text style={styles.label}>Eklenen Besinler</Text>
                    {selectedItems.length === 0 ? (
                        <View style={styles.emptyItems}>
                            <Ionicons name="restaurant-outline" size={32} color={Colors.border} />
                            <Text style={styles.emptyText}>Henüz besin eklenmedi.</Text>
                        </View>
                    ) : (
                        selectedItems.map((item, idx) => (
                            <View key={idx} style={styles.selectedFoodRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.selectedFoodName}>{item.name}</Text>
                                    <Text style={styles.selectedFoodMeta}>{item.amount} • {item.calories} kcal</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeItem(idx)}>
                                    <Ionicons name="close-circle" size={20} color={Colors.error} />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Toplam Alınan Kalori:</Text>
                        <Text style={styles.totalValue}>{totalCalories} kcal</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button
                            title="Geri"
                            variant="outline"
                            onPress={() => setStep(1)}
                            style={{ flex: 1, marginRight: 8 }}
                        />
                        <Button
                            title="Listeye Kaydet"
                            onPress={handleSave}
                            disabled={selectedItems.length === 0}
                            style={{ flex: 2 }}
                        />
                    </View>
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
    progressContainer: {
        padding: 24,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    progressBar: {
        marginBottom: 12,
    },
    stepText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.primary,
    },
    content: {
        padding: 20,
    },
    card: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
        marginBottom: 16,
        marginTop: 8,
    },
    weekSelector: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    weekChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: Colors.background,
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    weekChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    chipText: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
    },
    chipTextActive: {
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.surface,
    },
    mealGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32,
    },
    mealButton: {
        width: '47%',
        padding: 16,
        borderRadius: 12,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    mealActive: {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
    },
    mealText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textSecondary,
    },
    mealTextActive: {
        color: Colors.primary,
    },
    nextButton: {
        width: '100%',
    },
    dropdownList: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        marginTop: -8,
        marginBottom: 20,
        maxHeight: 200,
        zIndex: 100,
        ...Theme.shadow,
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background,
    },
    foodItemName: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    foodItemMeta: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
    },
    noResult: {
        padding: 16,
        textAlign: 'center',
        color: Colors.textSecondary,
        fontFamily: 'Poppins_400Regular',
    },
    selectedFoodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    selectedFoodName: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    selectedFoodMeta: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
    },
    emptyItems: {
        padding: 24,
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 12,
        marginBottom: 24,
    },
    emptyText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginTop: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.primaryLight,
        padding: 16,
        borderRadius: 12,
        marginVertical: 24,
    },
    totalLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    totalValue: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: Colors.primary,
    },
    buttonRow: {
        flexDirection: 'row',
    },
});
