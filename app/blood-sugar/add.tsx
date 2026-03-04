import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { WarningModal } from '../../components/shared/WarningModal';
import { useHealthStore, MealType, EntryType } from '../../store/healthStore';

const MEALS: { label: string; value: MealType; icon: string }[] = [
    { label: 'Sabah', value: 'Sabah', icon: '🌅' },
    { label: 'Öğle', value: 'Öğle', icon: '☀️' },
    { label: 'Akşam', value: 'Akşam', icon: '🌙' },
    { label: 'Gece', value: 'Gece', icon: '🌛' },
];

export default function AddBloodSugar() {
    const router = useRouter();
    const addBloodSugar = useHealthStore((state) => state.addBloodSugar);

    const [meal, setMeal] = useState<MealType>('Sabah');
    const [type, setType] = useState<EntryType>('Açlık');
    const [value, setValue] = useState('');
    const [insulin, setInsulin] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const now = new Date();
    const todayStr = now.toLocaleDateString('tr-TR');
    const nowTimeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = () => {
        const val = parseInt(value);
        if (!val || isNaN(val)) {
            Alert.alert('Hata', 'Lütfen geçerli bir kan şekeri değeri girin.');
            return;
        }

        addBloodSugar({
            value: val,
            meal,
            type,
            insulin: insulin ? parseInt(insulin) : undefined,
            date: todayStr,
            time: nowTimeStr,
        });

        if (val < 70 || val > 200) {
            setShowWarning(true);
        } else {
            Alert.alert('✓ Kaydedildi', `Kan şekeri değeriniz (${val} mg/dL) başarıyla eklendi.`, [
                { text: 'Tamam', onPress: () => router.back() }
            ]);
        }
    };

    const isFormValid = value.length > 0 && !isNaN(parseInt(value));

    const getStatusColor = () => {
        const v = parseInt(value);
        if (!v || isNaN(v)) return Colors.border;
        if (v < 70) return Colors.error;
        if (v <= 140) return Colors.success;
        return Colors.warning;
    };

    const getStatusLabel = () => {
        const v = parseInt(value);
        if (!v || isNaN(v)) return '';
        if (v < 70) return '⚠️ Düşük';
        if (v <= 140) return '✓ Normal';
        return '⚠️ Yüksek';
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient colors={Colors.gradient} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.surface} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kan Şekeri Ekle</Text>
                <Text style={styles.headerSub}>{todayStr} • {nowTimeStr}</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Meal selector */}
                <Text style={styles.sectionLabel}>Öğün</Text>
                <View style={styles.mealGrid}>
                    {MEALS.map((m) => (
                        <TouchableOpacity
                            key={m.value}
                            style={[styles.mealChip, meal === m.value && styles.mealChipActive]}
                            onPress={() => setMeal(m.value)}
                        >
                            <Text style={styles.mealEmoji}>{m.icon}</Text>
                            <Text style={[styles.mealLabel, meal === m.value && styles.mealLabelActive]}>
                                {m.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Type toggle */}
                <Text style={styles.sectionLabel}>Durum</Text>
                <View style={styles.toggleRow}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, type === 'Açlık' && styles.toggleBtnActive]}
                        onPress={() => setType('Açlık')}
                    >
                        <Ionicons name="moon-outline" size={16} color={type === 'Açlık' ? Colors.surface : Colors.textSecondary} />
                        <Text style={[styles.toggleText, type === 'Açlık' && styles.toggleTextActive]}>Açlık</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, type === 'Tokluk' && styles.toggleBtnActive]}
                        onPress={() => setType('Tokluk')}
                    >
                        <Ionicons name="sunny-outline" size={16} color={type === 'Tokluk' ? Colors.surface : Colors.textSecondary} />
                        <Text style={[styles.toggleText, type === 'Tokluk' && styles.toggleTextActive]}>Tokluk</Text>
                    </TouchableOpacity>
                </View>

                {/* Value input */}
                <Card style={styles.valueCard}>
                    <Text style={styles.valueCardTitle}>Kan Şekeri Değeri</Text>
                    <View style={styles.valueRow}>
                        <Input
                            placeholder="0"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={setValue}
                            containerStyle={{ flex: 1, marginBottom: 0 }}
                        />
                        <Text style={styles.unitText}>mg/dL</Text>
                    </View>
                    {value.length > 0 && (
                        <View style={[styles.statusPill, { backgroundColor: getStatusColor() + '22', borderColor: getStatusColor() }]}>
                            <Text style={[styles.statusText, { color: getStatusColor() }]}>{getStatusLabel()}</Text>
                        </View>
                    )}
                    <View style={styles.referenceBox}>
                        <Text style={styles.refTitle}>Hedef Değerler</Text>
                        <Text style={styles.refItem}>• Açlık: ≤ 95 mg/dL</Text>
                        <Text style={styles.refItem}>• Tokluk 1. saat: ≤ 140 mg/dL</Text>
                        <Text style={styles.refItem}>• Tokluk 2. saat: ≤ 120 mg/dL</Text>
                    </View>
                </Card>

                {/* Insulin input */}
                <Input
                    label="İnsülin Dozu (Opsiyonel)"
                    placeholder="0 ünite"
                    keyboardType="numeric"
                    value={insulin}
                    onChangeText={setInsulin}
                    rightIcon="medical-outline"
                />

                <Button
                    title="Kaydet"
                    onPress={handleSubmit}
                    disabled={!isFormValid}
                    pill
                    style={styles.saveButton}
                />
            </ScrollView>

            <WarningModal
                visible={showWarning}
                onClose={() => {
                    setShowWarning(false);
                    router.back();
                }}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: 'Poppins_700Bold',
        color: Colors.surface,
    },
    headerSub: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    content: {
        padding: 20,
        paddingBottom: 48,
    },
    sectionLabel: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginBottom: 12,
        marginTop: 8,
    },
    mealGrid: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    mealChip: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    mealChipActive: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryLight,
    },
    mealEmoji: {
        fontSize: 22,
        marginBottom: 4,
    },
    mealLabel: {
        fontSize: 11,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textSecondary,
    },
    mealLabelActive: {
        color: Colors.primary,
    },
    toggleRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: Colors.border,
        gap: 8,
    },
    toggleBtnActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    toggleText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textSecondary,
    },
    toggleTextActive: {
        color: Colors.surface,
    },
    valueCard: {
        padding: 20,
        marginBottom: 16,
    },
    valueCardTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
        marginBottom: 12,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    unitText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textSecondary,
    },
    statusPill: {
        alignSelf: 'flex-start',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        marginTop: 10,
    },
    statusText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 13,
    },
    referenceBox: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 12,
        marginTop: 16,
    },
    refTitle: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    refItem: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        marginBottom: 3,
    },
    saveButton: {
        marginTop: 8,
        width: '100%',
    },
});
