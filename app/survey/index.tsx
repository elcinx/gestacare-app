import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';

const QUESTIONS = [
    {
        id: '1',
        question: 'Bugün kendinizi nasıl hissediyorsunuz?',
        emoji: '😊',
        options: ['Çok İyi 😄', 'İyi 🙂', 'Orta 😐', 'Halsiz 😔', 'Kötü 😢']
    },
    {
        id: '2',
        question: 'Bugün ağrınız var mı?',
        emoji: '🩹',
        options: ['Hayır Yok', 'Hafif Baş Ağrısı', 'Karın Ağrısı', 'Bacak Ağrısı', 'Diğer']
    },
    {
        id: '3',
        question: 'Ödem (şişlik) fark ettiniz mi?',
        emoji: '💧',
        options: ['Hayır', 'Ayaklarda Hafif', 'Ellerde / Yüzde', 'Belgin Şişlik']
    },
    {
        id: '4',
        question: 'Bebek hareketlerini düzenli hissediyor musunuz?',
        emoji: '👶',
        options: ['Evet, Çok Aktif', 'Evet, Normal', 'Düne Göre Daha Az', 'Hiç Hissetmedim']
    },
    {
        id: '5',
        question: 'Bugün yeterli su içtiğinizi düşünüyor musunuz?',
        emoji: '🥤',
        options: ['Evet (3L+)', 'Normal (2L)', 'Az (1L)', 'Çok Az']
    }
];

export default function SurveyIndex() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSelect = (option: string) => {
        setAnswers({ ...answers, [QUESTIONS[currentStep].id]: option });
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const progress = (currentStep + 1) / QUESTIONS.length;

    // Results screen
    if (isCompleted) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#10B981', '#34d399']} style={styles.resultHeader}>
                    <Text style={styles.resultEmoji}>🎉</Text>
                    <Text style={styles.resultTitle}>Anket Tamamlandı!</Text>
                    <Text style={styles.resultSub}>Günlük takibiniz kaydedildi</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.resultContent}>
                    <Text style={styles.summaryTitle}>📋 Yanıtlarınız</Text>
                    {QUESTIONS.map((q) => (
                        <Card key={q.id} style={styles.resultCard}>
                            <Text style={styles.resultQ}>{q.emoji} {q.question}</Text>
                            <Text style={styles.resultA}>✓ {answers[q.id] || '—'}</Text>
                        </Card>
                    ))}
                    <Card style={styles.tipCard}>
                        <Text style={styles.tipTitle}>💡 Günün Hatırlatması</Text>
                        <Text style={styles.tipText}>
                            Düzenli olarak günlük anketlerinizi doldurmak, doktorunuzun sizi daha iyi takip etmesine yardımcı olur.
                        </Text>
                    </Card>
                    <Button title="Ana Sayfaya Dön" onPress={() => router.back()} pill style={styles.homeButton} />
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ProgressBar progress={progress} style={styles.progress} />
                <Text style={styles.stepCount}>{currentStep + 1} / {QUESTIONS.length} Soru</Text>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionEmoji}>{QUESTIONS[currentStep].emoji}</Text>
                <Text style={styles.questionText}>{QUESTIONS[currentStep].question}</Text>

                <View style={styles.optionsList}>
                    {QUESTIONS[currentStep].options.map((option) => {
                        const isSelected = answers[QUESTIONS[currentStep].id] === option;
                        return (
                            <TouchableOpacity
                                key={option}
                                activeOpacity={0.7}
                                onPress={() => handleSelect(option)}
                            >
                                <Card style={[styles.optionCard, isSelected && styles.optionSelected]}>
                                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                        {option}
                                    </Text>
                                    {isSelected && <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />}
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Geri"
                    variant="outline"
                    onPress={handleBack}
                    style={styles.navButton}
                />
                <Button
                    title={currentStep === QUESTIONS.length - 1 ? "Bitir ✓" : "İleri →"}
                    disabled={!answers[QUESTIONS[currentStep].id]}
                    onPress={handleNext}
                    style={[styles.navButton, { flex: 2 }]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: {
        padding: 24,
        paddingTop: 40,
        backgroundColor: Colors.surface,
        alignItems: 'center',
    },
    progress: { marginBottom: 12 },
    stepCount: { fontSize: 14, fontFamily: 'Poppins_600SemiBold', color: Colors.primary },
    questionContainer: { flex: 1, padding: 24, justifyContent: 'center' },
    questionEmoji: { fontSize: 48, textAlign: 'center', marginBottom: 12 },
    questionText: {
        fontSize: 20, fontFamily: 'Poppins_700Bold',
        color: Colors.textMain, textAlign: 'center', marginBottom: 32,
    },
    optionsList: { gap: 12 },
    optionCard: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', padding: 18,
        borderWidth: 2, borderColor: 'transparent',
    },
    optionSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
    optionText: { fontSize: 15, fontFamily: 'Poppins_400Regular', color: Colors.textMain },
    optionTextSelected: { fontFamily: 'Poppins_700Bold', color: Colors.primary },
    footer: {
        flexDirection: 'row', padding: 24, paddingBottom: 40,
        backgroundColor: Colors.surface, gap: 12,
    },
    navButton: { flex: 1 },
    // Results screen
    resultHeader: {
        paddingTop: 80, paddingBottom: 40, paddingHorizontal: 24,
        alignItems: 'center',
    },
    resultEmoji: { fontSize: 56, marginBottom: 12 },
    resultTitle: { fontSize: 26, fontFamily: 'Poppins_700Bold', color: '#fff', marginBottom: 6 },
    resultSub: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: 'rgba(255,255,255,0.85)' },
    resultContent: { padding: 24, paddingBottom: 48 },
    summaryTitle: {
        fontSize: 18, fontFamily: 'Poppins_700Bold',
        color: Colors.textMain, marginBottom: 16,
    },
    resultCard: { padding: 16, marginBottom: 12 },
    resultQ: { fontSize: 13, fontFamily: 'Poppins_600SemiBold', color: Colors.textSecondary, marginBottom: 6 },
    resultA: { fontSize: 15, fontFamily: 'Poppins_700Bold', color: Colors.textMain },
    tipCard: {
        padding: 16, marginVertical: 16,
        backgroundColor: '#FFFBEB', borderColor: '#FCD34D', borderWidth: 1,
    },
    tipTitle: { fontSize: 14, fontFamily: 'Poppins_700Bold', color: '#92400E', marginBottom: 8 },
    tipText: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: '#78350F', lineHeight: 20 },
    homeButton: { width: '100%', marginTop: 8 },
});
