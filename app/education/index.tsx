import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

const EDUCATION_ITEMS = [
    {
        id: '1',
        title: 'Gebelik Şekeri Nedir?',
        subtitle: 'Gestasyonel diyabetin temelleri',
        icon: '🩸',
        category: 'Temel Bilgiler',
        duration: '5 dk',
        completed: true,
        color: '#FEE2E2',
        content: 'Gestasyonel diyabet, gebelik sırasında ortaya çıkan geçici bir diyabet türüdür. Plasenta, insülin direncine yol açan hormonlar salgılar. Doğumdan sonra genellikle geçer.'
    },
    {
        id: '2',
        title: 'İnsülin Kullanım Rehberi',
        subtitle: 'Nasıl ve ne zaman uygulanır?',
        icon: '💉',
        category: 'Tedavi',
        duration: '7 dk',
        completed: true,
        color: '#EDE9FE',
        content: 'İnsülin, plasentayı geçmez ve bebeğe zarar vermez. Doktorunuzun önerdiği dozda ve saatte kullanın. Enjeksiyon bölgelerini değiştirin (karın, uyluk, kol).'
    },
    {
        id: '3',
        title: 'Beslenme ve Karbonhidrat Sayımı',
        subtitle: 'Doğru beslenme planı nasıl yapılır?',
        icon: '🥗',
        category: 'Beslenme',
        duration: '8 dk',
        completed: false,
        color: '#D1FAE5',
        content: 'Karbonhidratları gün içine dengeli dağıtın. Beyaz ekmek, şeker, meyve suyu gibi hızlı karbonhidratlardan kaçının. Lif oranı yüksek kompleks karbonhidratları tercih edin.'
    },
    {
        id: '4',
        title: 'Egzersiz ve Kan Şekeri Dengesi',
        subtitle: 'Yürüyüş ve yoga ile şeker kontrolü',
        icon: '🏃‍♀️',
        category: 'Egzersiz',
        duration: '6 dk',
        completed: false,
        color: '#FEF3C7',
        content: 'Yemeklerden 1 saat sonra 15-20 dakikalık yürüyüş kan şekerini önemli ölçüde düşürür. Hamile yogası, pilates ve yüzme de güvenli seçeneklerdir.'
    },
    {
        id: '5',
        title: 'Doğum ve Sonrası',
        subtitle: 'Ne beklemeli ve nasıl hazırlanmalı?',
        icon: '👶',
        category: 'Doğum',
        duration: '10 dk',
        completed: false,
        color: '#FCE7F3',
        content: 'GDM olan annelerin %50\'sinde ilerleyen yıllarda Tip 2 diyabet gelişme riski vardır. Doğumdan sonra bebeğinizin kan şekerini de takip etmek önemlidir.'
    },
    {
        id: '6',
        title: 'Bebek İzlemi ve NST',
        subtitle: 'Bebeğin sağlığını takip etmek',
        icon: '🫀',
        category: 'Takip',
        duration: '5 dk',
        completed: false,
        color: '#E0F2FE',
        content: 'Non-stress test (NST) bebeğin hareketlerini ve kalp atışını izler. GDM\'li annelerde 36. haftadan itibaren haftalık NST önerilir.'
    },
];

const CATEGORIES = ['Tümü', 'Temel Bilgiler', 'Tedavi', 'Beslenme', 'Egzersiz', 'Doğum', 'Takip'];

export default function EducationIndex() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [completedIds, setCompletedIds] = useState<string[]>(['1', '2']);

    const filtered = EDUCATION_ITEMS.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
        return matchSearch && matchCat;
    });

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
        // Mark as completed when opened
        if (!completedIds.includes(id)) {
            setCompletedIds([...completedIds, id]);
        }
    };

    const completedCount = completedIds.length;
    const totalCount = EDUCATION_ITEMS.length;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#a78bfa', '#c4b5fd']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📚 Eğitim İçerikleri</Text>
                <Text style={styles.headerSub}>
                    {completedCount}/{totalCount} içerik tamamlandı
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(completedCount / totalCount) * 100}%` }]} />
                </View>
                <Input
                    placeholder="İçerik ara..."
                    value={search}
                    onChangeText={setSearch}
                    leftIcon="search-outline"
                    containerStyle={{ marginBottom: 0, marginTop: 12 }}
                />
            </LinearGradient>

            {/* Category filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow} contentContainerStyle={styles.categoryContent}>
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.catChip, selectedCategory === cat && styles.catChipActive]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.content}>
                {filtered.map((item) => {
                    const isCompleted = completedIds.includes(item.id);
                    const isExpanded = expandedId === item.id;
                    return (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => toggleExpand(item.id)}>
                            <Card style={[styles.card, { backgroundColor: item.color, borderColor: item.color }]}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardEmoji}>{item.icon}</Text>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardSub}>{item.subtitle}</Text>
                                        <View style={styles.cardMeta}>
                                            <Text style={styles.metaText}>🏷 {item.category}</Text>
                                            <Text style={styles.metaText}>⏱ {item.duration}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {isCompleted
                                            ? <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                                            : <Ionicons name="chevron-down" size={22} color={Colors.textSecondary} />
                                        }
                                    </View>
                                </View>
                                {isExpanded && (
                                    <View style={styles.contentBox}>
                                        <Text style={styles.contentText}>{item.content}</Text>
                                        <View style={styles.completedBadge}>
                                            <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                            <Text style={styles.completedText}>Okundu ✓</Text>
                                        </View>
                                    </View>
                                )}
                            </Card>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: {
        paddingTop: 55,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 8,
    },
    headerTitle: { fontSize: 24, fontFamily: 'Poppins_700Bold', color: '#fff', marginBottom: 4 },
    headerSub: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: 'rgba(255,255,255,0.85)', marginBottom: 8 },
    progressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, marginBottom: 4 },
    progressFill: { height: 6, backgroundColor: '#fff', borderRadius: 3 },
    categoryRow: { flexGrow: 0, marginTop: 12 },
    categoryContent: { paddingHorizontal: 16, gap: 8 },
    catChip: {
        paddingHorizontal: 14, paddingVertical: 8,
        backgroundColor: Colors.surface, borderRadius: 20,
        borderWidth: 1, borderColor: Colors.border,
    },
    catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    catText: { fontSize: 12, fontFamily: 'Poppins_600SemiBold', color: Colors.textSecondary },
    catTextActive: { color: '#fff' },
    content: { padding: 16, paddingBottom: 40 },
    card: { padding: 16, marginBottom: 12, borderWidth: 1 },
    cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    cardEmoji: { fontSize: 32, width: 40 },
    cardInfo: { flex: 1 },
    cardTitle: { fontSize: 15, fontFamily: 'Poppins_700Bold', color: Colors.textMain },
    cardSub: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: Colors.textSecondary, marginTop: 2 },
    cardMeta: { flexDirection: 'row', gap: 12, marginTop: 6 },
    metaText: { fontSize: 11, fontFamily: 'Poppins_600SemiBold', color: Colors.textSecondary },
    contentBox: {
        marginTop: 16, paddingTop: 16,
        borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)',
    },
    contentText: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: Colors.textMain, lineHeight: 22 },
    completedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
    completedText: { fontSize: 13, fontFamily: 'Poppins_600SemiBold', color: Colors.success },
});
