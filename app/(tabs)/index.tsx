import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { useHealthStore } from '../../store/healthStore';

const MENU_ITEMS = [
  { id: 'blood-sugar', title: 'Kan Şekeri', icon: '🩸', route: '/blood-sugar', bg: '#FEE2E2' },
  { id: 'activities', title: 'Aktiviteler', icon: '🏃‍♀️', route: '/activities', bg: '#D1FAE5' },
  { id: 'nutrition', title: 'Beslenme', icon: '🥗', route: '/nutrition', bg: '#FEF3C7' },
  { id: 'education', title: 'Eğitimler', icon: '📚', route: '/education', bg: '#EDE9FE' },
  { id: 'goals', title: 'Hedefler', icon: '🎯', route: '/(tabs)/goals', bg: '#FCE7F3' },
  { id: 'faq', title: 'SSS', icon: '❓', route: '/faq', bg: '#E0F2FE' },
  { id: 'survey', title: 'Günlük Anket', icon: '📋', route: '/survey', bg: '#F0FDF4' },
  { id: 'notifications', title: 'Bildirimler', icon: '🔔', route: '/(tabs)/notifications', bg: '#FFF7ED' },
];

const DAILY_TIPS = [
  'Yemekten 1 saat sonra 15-20 dk yürüyüş kan şekerini düşürür.',
  'Günde en az 8 bardak su içmeyi unutmayın. 💧',
  'Karbonhidratları gün içine dengeli dağıtın.',
  'Bebeğinizin hareketlerini düzenli olarak takip edin. 👶',
  'Uyku düzeni kan şekeri kontrolünü doğrudan etkiler.',
  'Her öğünde protein tüketmeye özen gösterin.',
];

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { bloodSugarEntries, activityEntries } = useHealthStore();

  const today = new Date();
  const todayStr = today.toLocaleDateString('tr-TR');
  const todayDate = today.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  const dayOfWeek = today.toLocaleDateString('tr-TR', { weekday: 'long' });

  const latestBS = bloodSugarEntries[0];
  const todayBS = bloodSugarEntries.filter(e => e.date === todayStr);
  const todayActivities = activityEntries.filter(a => a.completed && a.date === todayStr);
  const weekActivities = activityEntries.filter(a => a.completed);

  const tipIndex = today.getDay();
  const dailyTip = DAILY_TIPS[tipIndex % DAILY_TIPS.length];

  const getBSColor = (val: number) => {
    if (val < 70) return Colors.error;
    if (val <= 140) return Colors.success;
    return Colors.warning;
  };

  const getBSLabel = (val: number) => {
    if (val < 70) return '⚠️ Düşük';
    if (val <= 140) return '✓ Normal';
    return '⚠️ Yüksek';
  };

  // Gebelik haftası hesaplama (örnek)
  const pregnancyWeek = user?.pregnancyWeek || 24;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={Colors.gradient} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayText}>{dayOfWeek}</Text>
            <Text style={styles.greeting}>Merhaba, {user?.name || 'Misafir'} 👋</Text>
            <Text style={styles.dateText}>{todayDate}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'M')[0].toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        {/* Pregnancy week & quick stat */}
        <View style={styles.headerStats}>
          <View style={styles.headerStatItem}>
            <Text style={styles.headerStatValue}>{pregnancyWeek}</Text>
            <Text style={styles.headerStatLabel}>Gebelik Haftası</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStatItem}>
            <Text style={styles.headerStatValue}>{todayBS.length}</Text>
            <Text style={styles.headerStatLabel}>Bugün Ölçüm</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStatItem}>
            <Text style={styles.headerStatValue}>{todayActivities.length}</Text>
            <Text style={styles.headerStatLabel}>Aktivite</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Latest blood sugar reading */}
        <View style={styles.bsRow}>
          <Card style={styles.bsCard}>
            <Text style={styles.bsLabel}>🩸 Son Kan Şekeri</Text>
            {latestBS ? (
              <View style={styles.bsValueRow}>
                <Text style={[styles.bsValue, { color: getBSColor(latestBS.value) }]}>
                  {latestBS.value}
                </Text>
                <View>
                  <Text style={styles.bsUnit}>mg/dL</Text>
                  <Text style={[styles.bsStatus, { color: getBSColor(latestBS.value) }]}>
                    {getBSLabel(latestBS.value)}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.bsEmpty}>Hen&uuml;z &ouml;l&ccedil;&uuml;m yok</Text>
            )}
            {latestBS && (
              <Text style={styles.bsTime}>{latestBS.meal} • {latestBS.time}</Text>
            )}
          </Card>

          <View style={styles.bsSideCol}>
            <TouchableOpacity
              style={styles.quickAddCard}
              onPress={() => router.push('/blood-sugar/add' as any)}
            >
              <Text style={styles.quickAddIcon}>➕</Text>
              <Text style={styles.quickAddText}>Şeker{'\n'}Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickAddCard, { backgroundColor: '#D1FAE5' }]}
              onPress={() => router.push('/activities/add' as any)}
            >
              <Text style={styles.quickAddIcon}>🏃‍♀️</Text>
              <Text style={styles.quickAddText}>Aktivite{'\n'}Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Targets card */}
        <Card style={styles.targetsCard}>
          <Text style={styles.sectionTitle}>🎯 Günlük Hedefler</Text>
          <View style={styles.targetRow}>
            <View style={[styles.targetItem, { backgroundColor: todayBS.length >= 4 ? '#D1FAE5' : '#FEE2E2' }]}>
              <Ionicons name={todayBS.length >= 4 ? 'checkmark-circle' : 'ellipse-outline'} size={18} color={todayBS.length >= 4 ? Colors.success : Colors.error} />
              <Text style={styles.targetText}>4 Ölçüm ({todayBS.length}/4)</Text>
            </View>
            <View style={[styles.targetItem, { backgroundColor: todayActivities.length >= 1 ? '#D1FAE5' : '#FEF3C7' }]}>
              <Ionicons name={todayActivities.length >= 1 ? 'checkmark-circle' : 'ellipse-outline'} size={18} color={todayActivities.length >= 1 ? Colors.success : Colors.warning} />
              <Text style={styles.targetText}>Egzersiz ({todayActivities.length}/1)</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/goals' as any)} style={styles.targetLink}>
            <Text style={styles.targetLinkText}>Tüm hedefleri gör →</Text>
          </TouchableOpacity>
        </Card>

        {/* Menu grid */}
        <Text style={styles.sectionTitle}>📱 Hızlı Erişim</Text>
        <View style={styles.menuGrid}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.75}
            >
              <View style={[styles.menuCard, { backgroundColor: item.bg }]}>
                <Text style={styles.menuEmoji}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Target values reference */}
        <Card style={styles.referenceCard}>
          <Text style={styles.refTitle}>📊 Hedef Kan Şekeri Değerleri</Text>
          <View style={styles.refGrid}>
            <View style={styles.refItem}>
              <Text style={styles.refLabel}>Açlık</Text>
              <Text style={styles.refValue}>≤ 95</Text>
              <Text style={styles.refUnit}>mg/dL</Text>
            </View>
            <View style={styles.refDivider} />
            <View style={styles.refItem}>
              <Text style={styles.refLabel}>1. Saat</Text>
              <Text style={styles.refValue}>≤ 140</Text>
              <Text style={styles.refUnit}>mg/dL</Text>
            </View>
            <View style={styles.refDivider} />
            <View style={styles.refItem}>
              <Text style={styles.refLabel}>2. Saat</Text>
              <Text style={styles.refValue}>≤ 120</Text>
              <Text style={styles.refUnit}>mg/dL</Text>
            </View>
          </View>
        </Card>

        {/* Daily tip */}
        <LinearGradient colors={['#FEF3C7', '#FDE68A']} style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Günün İpucu</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </LinearGradient>

        {/* Weekly summary */}
        <Card style={styles.weekCard}>
          <Text style={styles.sectionTitle}>📅 Bu Hafta</Text>
          <View style={styles.weekRow}>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{bloodSugarEntries.length}</Text>
              <Text style={styles.weekStatLabel}>Toplam{'\n'}Ölçüm</Text>
            </View>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{weekActivities.length}</Text>
              <Text style={styles.weekStatLabel}>Tamamlanan{'\n'}Aktivite</Text>
            </View>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>
                {bloodSugarEntries.length > 0
                  ? Math.round(bloodSugarEntries.reduce((s, e) => s + e.value, 0) / bloodSugarEntries.length)
                  : '—'}
              </Text>
              <Text style={styles.weekStatLabel}>Ortalama{'\n'}mg/dL</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'capitalize',
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginTop: 2,
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 14,
  },
  headerStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerStatValue: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  headerStatLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
  },
  headerStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  bsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  bsCard: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  bsLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  bsValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bsValue: {
    fontSize: 38,
    fontFamily: 'Poppins_700Bold',
  },
  bsUnit: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
  },
  bsStatus: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  bsTime: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    marginTop: 6,
  },
  bsEmpty: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
  },
  bsSideCol: {
    gap: 12,
    width: 90,
  },
  quickAddCard: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickAddIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  quickAddText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textMain,
    textAlign: 'center',
  },
  targetsCard: {
    padding: 16,
    marginBottom: 12,
  },
  targetRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    marginTop: 8,
  },
  targetItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 12,
  },
  targetText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textMain,
    flex: 1,
  },
  targetLink: {
    alignSelf: 'flex-end',
  },
  targetLinkText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textMain,
    marginBottom: 12,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  menuItem: {
    width: '22%',
    flex: 1,
  },
  menuCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 18,
    minWidth: 76,
  },
  menuEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  menuTitle: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textMain,
    textAlign: 'center',
  },
  referenceCard: {
    padding: 16,
    marginBottom: 12,
  },
  refTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: Colors.textMain,
    marginBottom: 14,
  },
  refGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refItem: {
    flex: 1,
    alignItems: 'center',
  },
  refLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  refValue: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: Colors.primary,
  },
  refUnit: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
  },
  refDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  tipCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#78350F',
    lineHeight: 22,
  },
  weekCard: {
    padding: 16,
    marginBottom: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  weekStat: {
    alignItems: 'center',
  },
  weekStatValue: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: Colors.primary,
  },
  weekStatLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
