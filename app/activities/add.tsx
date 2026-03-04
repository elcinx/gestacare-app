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
import { useHealthStore } from '../../store/healthStore';

const ACTIVITY_TYPES = [
    { label: 'Yürüyüş', icon: '🚶‍♀️', desc: 'Hafif tempolu, düzenli' },
    { label: 'Yoga', icon: '🧘‍♀️', desc: 'Hamile yogası, stretsing' },
    { label: 'Yüzme', icon: '🏊‍♀️', desc: 'Su içi egzersiz' },
    { label: 'Pilates', icon: '🤸‍♀️', desc: 'Nefes ve core güçlendirme' },
    { label: 'Bisiklet', icon: '🚴‍♀️', desc: 'Sabit bisiklet önerilir' },
    { label: 'Diğer', icon: '✨', desc: 'Diğer aktiviteler' },
];

const DURATION_PRESETS = [15, 20, 30, 45, 60];

export default function AddActivity() {
    const router = useRouter();
    const { addActivity, activityEntries } = useHealthStore();

    const [activityType, setActivityType] = useState('Yürüyüş');
    const [duration, setDuration] = useState('30');
    const [completed, setCompleted] = useState(true);
    const [notes, setNotes] = useState('');

    const now = new Date();
    const todayStr = now.toLocaleDateString('tr-TR');
    const nowTimeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = () => {
        const dur = parseInt(duration);
        if (!dur || isNaN(dur) || dur <= 0) {
            Alert.alert('Hata', 'Lütfen geçerli bir süre girin.');
            return;
        }

        const dayNumber = activityEntries.length + 1;
        addActivity({
            type: activityType,
            duration: dur,
            completed,
            date: todayStr,
            time: nowTimeStr,
            dayNumber,
        });

        Alert.alert(
            completed ? '🎉 Harika!' : '📋 Kaydedildi',
            completed
                ? `${dur} dakika ${activityType} tamamlandı! Harika iş çıkardınız.`
                : `${activityType} aktivitesi planlandı.`,
            [{ text: 'Tamam', onPress: () => router.back() }]
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient colors={['#10B981', '#34d399']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.surface} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aktivite Ekle</Text>
                <Text style={styles.headerSub}>{todayStr} • {nowTimeStr}</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Activity type */}
                <Text style={styles.sectionLabel}>Aktivite Türü</Text>
                <View style={styles.typeGrid}>
                    {ACTIVITY_TYPES.map((a) => (
                        <TouchableOpacity
                            key={a.label}
                            style={[styles.typeCard, activityType === a.label && styles.typeCardActive]}
                            onPress={() => setActivityType(a.label)}
                        >
                            <Text style={styles.typeEmoji}>{a.icon}</Text>
                            <Text style={[styles.typeLabel, activityType === a.label && styles.typeLabelActive]}>
                                {a.label}
                            </Text>
                            <Text style={styles.typeDesc}>{a.desc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Duration presets */}
                <Text style={styles.sectionLabel}>Süre (Dakika)</Text>
                <View style={styles.durationRow}>
                    {DURATION_PRESETS.map((d) => (
                        <TouchableOpacity
                            key={d}
                            style={[styles.durationChip, duration === String(d) && styles.durationChipActive]}
                            onPress={() => setDuration(String(d))}
                        >
                            <Text style={[styles.durationText, duration === String(d) && styles.durationTextActive]}>
                                {d}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Input
                    placeholder="Farklı bir süre girin"
                    keyboardType="numeric"
                    value={duration}
                    onChangeText={setDuration}
                    rightIcon="timer-outline"
                />

                {/* Completed toggle */}
                <Text style={styles.sectionLabel}>Durum</Text>
                <View style={styles.statusRow}>
                    <TouchableOpacity
                        style={[styles.statusBtn, completed && styles.statusBtnDone]}
                        onPress={() => setCompleted(true)}
                    >
                        <Ionicons name="checkmark-circle" size={20} color={completed ? Colors.surface : Colors.success} />
                        <Text style={[styles.statusText, completed && styles.statusTextDone]}>Tamamlandı ✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.statusBtn, !completed && styles.statusBtnPlanned]}
                        onPress={() => setCompleted(false)}
                    >
                        <Ionicons name="calendar-outline" size={20} color={!completed ? Colors.surface : Colors.textSecondary} />
                        <Text style={[styles.statusText, !completed && styles.statusTextDone]}>Planlandı</Text>
                    </TouchableOpacity>
                </View>

                {/* Notes */}
                <Input
                    label="Notlar (Opsiyonel)"
                    placeholder="Nasıl hissettiniz?"
                    value={notes}
                    onChangeText={setNotes}
                    leftIcon="create-outline"
                />

                {/* Benefits card */}
                <Card style={styles.benefitsCard}>
                    <Text style={styles.benefitsTitle}>💚 Egzersizin Faydaları</Text>
                    <Text style={styles.benefitItem}>• Kan şekerini düzenler</Text>
                    <Text style={styles.benefitItem}>• Gebelik kilosunu kontrol eder</Text>
                    <Text style={styles.benefitItem}>• Enerji ve uyku kalitesini artırır</Text>
                    <Text style={styles.benefitItem}>• Doğum için hazırlar</Text>
                </Card>

                <Button
                    title={completed ? '🎯 Aktiviteyi Kaydet' : '📅 Planla'}
                    onPress={handleSubmit}
                    disabled={!duration || isNaN(parseInt(duration))}
                    pill
                    style={styles.saveButton}
                />
            </ScrollView>
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
        color: 'rgba(255,255,255,0.85)',
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
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 24,
    },
    typeCard: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 8,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    typeCardActive: {
        borderColor: Colors.success,
        backgroundColor: '#D1FAE5',
    },
    typeEmoji: {
        fontSize: 26,
        marginBottom: 6,
    },
    typeLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    typeLabelActive: {
        color: Colors.success,
    },
    typeDesc: {
        fontSize: 9,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 2,
    },
    durationRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    durationChip: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    durationChipActive: {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
    },
    durationText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
        color: Colors.textSecondary,
    },
    durationTextActive: {
        color: Colors.primary,
    },
    statusRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statusBtn: {
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
    statusBtnDone: {
        backgroundColor: Colors.success,
        borderColor: Colors.success,
    },
    statusBtnPlanned: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    statusText: {
        fontSize: 13,
        fontFamily: 'Poppins_700Bold',
        color: Colors.textSecondary,
    },
    statusTextDone: {
        color: Colors.surface,
    },
    benefitsCard: {
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#F0FDF4',
        borderColor: Colors.success,
        borderWidth: 1,
    },
    benefitsTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
        color: Colors.success,
        marginBottom: 10,
    },
    benefitItem: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textMain,
        marginBottom: 4,
    },
    saveButton: {
        width: '100%',
    },
});
