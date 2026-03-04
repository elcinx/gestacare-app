import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

const FAQ_ITEMS = [
    {
        id: '1',
        question: 'Gebelikte şeker takibi neden önemlidir?',
        answer: 'Gestasyonel diyabet hem anne hem de bebek sağlığı için riskler taşıyabilir. Düzenli takip, kan şekerini kontrol altında tutarak komplikasyon riskini azaltır.'
    },
    {
        id: '2',
        question: 'Kan şekeri ölçümü ne zaman yapılmalıdır?',
        answer: 'Genellikle sabah aç karnına ve ana öğünlerden 1 veya 2 saat sonra ölçüm yapılması önerilir. Doktorunuzun tavsiyesine uyunuz.'
    },
    {
        id: '3',
        question: 'İnsülin bebeğe zarar verir mi?',
        answer: 'Hayır, insülin plasentayı geçmez ve bebeğe zarar vermez. Aksine, yüksek kan şekerinin bebek üzerindeki olumsuz etkilerini önlemek için hayati önem taşır.'
    },
    {
        id: '4',
        question: 'Açlık ve tokluk kan şekeri hedefleri nelerdir?',
        answer: 'Genel hedefler; açlık ≤ 95 mg/dL, yemekten 1 saat sonra ≤ 140 mg/dL ve 2 saat sonra ≤ 120 mg/dL şeklindedir. Doktorunuz bu değerleri bireysel olarak belirler.'
    },
    {
        id: '5',
        question: 'Egzersiz yaparken nelere dikkat etmeliyim?',
        answer: 'Özellikle yemek sonrası 20-30 dakikalık hafif tempolu yürüyüşler faydalıdır. Ancak aşırı yorgunluktan kaçınılmalı ve hırpalamayan egzersizler tercih edilmelidir.'
    },
    {
        id: '6',
        question: 'Hangi besinlerden kaçınmalıyım?',
        answer: 'Beyaz ekmek, şeker, meyve suyu, beyaz pirinç gibi hızlı kan şekeri yükselten besinlerden uzak durulmalıdır. Kompleks karbonhidratlar ve lif içeriği yüksek besinler tercih edilmelidir.'
    },
    {
        id: '7',
        question: 'Gestasyonel diyabet doğumdan sonra geçer mi?',
        answer: 'Genellikle evet, doğumdan sonra kan şekeri normale döner. Ancak ilerleyen yıllarda Tip 2 diyabet geliştirme riski artığı için yıllık kontroller önerilir.'
    },
];

export default function FAQIndex() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0EA5E9', '#38BDF8']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>❓ Sıkça Sorulan Sorular</Text>
                <Text style={styles.headerSubtitle}>Gestasyonel diyabet hakkında merak ettikleriniz</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {FAQ_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.8}
                        onPress={() => toggleItem(item.id)}
                    >
                        <Card style={[styles.faqCard, expandedId === item.id && styles.expandedCard]}>
                            <View style={styles.questionRow}>
                                <Text style={[styles.question, expandedId === item.id && styles.expandedQuestion]}>
                                    {item.question}
                                </Text>
                                <Ionicons
                                    name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color={expandedId === item.id ? Colors.primary : Colors.textSecondary}
                                />
                            </View>
                            {expandedId === item.id && (
                                <View style={styles.answerContainer}>
                                    <Text style={styles.answer}>{item.answer}</Text>
                                </View>
                            )}
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        paddingBottom: 28,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(255,255,255,0.85)',
    },
    content: {
        padding: 20,
        paddingBottom: 48,
    },
    faqCard: {
        marginBottom: 12,
        padding: 20,
    },
    expandedCard: {
        borderColor: Colors.primary,
        borderWidth: 1.5,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
        marginRight: 12,
    },
    expandedQuestion: {
        color: Colors.primary,
    },
    answerContainer: {
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    answer: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        lineHeight: 22,
    },
});
