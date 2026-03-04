# 🤰 GestaCare — Gestasyonel Diyabet Takip Uygulaması

<p align="center">
  <img src="assets/images/icon.png" width="120" alt="GestaCare Logo" />
</p>

<p align="center">
  <strong>Gestasyonel diyabetle yaşayan anneler için kapsamlı mobil takip uygulaması</strong><br/>
  Kan şekeri, aktivite, beslenme ve gebelik sürecini tek elden yönetin.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-brightgreen" />
</p>

---

## 🎬 Tanıtım Videosu

> Uygulamanın çalışır halini görmek için aşağıdaki videoyu izleyebilirsiniz.

📹 **[video/video.mp4](video/video.mp4)** — Uygulamanın tam demo kaydı

---

## 📱 Uygulama Özeti

GestaCare, gestasyonel diyabet (gebelik şekeri) tanısı almış annelerin günlük sağlık takibini kolaylaştırmak amacıyla geliştirilmiş bir mobil uygulamadır. Uygulama, annelerin kan şekerini izlemesine, beslenme ve aktivitelerini kaydetmesine, eğitim içeriklerine erişmesine ve günlük anket doldurmasına olanak tanır.

---

## ✨ Özellikler

| Özellik | Açıklama |
|---|---|
| 🩸 **Kan Şekeri Takibi** | Açlık/tokluk ölçüm ekleme, geçmiş görüntüleme, renk kodlu durum göstergesi |
| 🏃‍♀️ **Aktivite Takibi** | Yürüyüş, yoga, yüzme vb. aktivite kayıt ve geçmişi |
| 🥗 **Beslenme Takibi** | Öğün bazlı besin ekleme, kalori hesaplama |
| 📚 **Eğitim Merkezi** | 6 makale, kategori filtresi, okuma ilerleme takibi |
| 📋 **Günlük Anket** | 5 sorulu günlük sağlık anketi, kişisel sonuç özeti |
| ❓ **SSS** | Gestasyonel diyabetle ilgili 7 sıkça sorulan soru |
| 🎯 **Günlük Hedefler** | Ölçüm ve aktivite hedefleri, anlık ilerleme |
| 📊 **Ana Ekran** | Canlı istatistikler, haftalık özet, hedef kan şekeri referans değerleri |
| 🔔 **Bildirimler** | Hatırlatıcı bildirimleri |

---

## 🛠 Teknoloji Yığını

- **Framework:** [React Native](https://reactnative.dev/) + [Expo SDK 52](https://expo.dev/)
- **Routing:** [Expo Router v4](https://expo.github.io/router/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **UI:** Özel bileşenler + LinearGradient + Ionicons
- **Dil:** TypeScript
- **Font:** Poppins (Google Fonts)

---

## 🚀 Yerelde Nasıl Çalıştırılır?

### Gereksinimler

Aşağıdaki araçların bilgisayarınızda kurulu olması gerekmektedir:

| Araç | Minimum Sürüm | İndirme |
|---|---|---|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | Node.js ile gelir |
| Git | Herhangi | https://git-scm.com |
| Expo Go (telefon) | Son sürüm | [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) |

---

### 1️⃣ Projeyi Klonlayın

```bash
git clone https://github.com/elcinx/gestacare-app.git
cd gestacare-app
```

### 2️⃣ Bağımlılıkları Yükleyin

```bash
npm install
```

### 3️⃣ Uygulamayı Başlatın

#### 📱 Telefonda Çalıştırma (Önerilen — Expo Go ile)

```bash
npx expo start
```

> Terminalde bir QR kodu görünecektir.  
> **Android** için: Expo Go uygulamasını açıp QR kodu taratın.  
> **iOS** için: Kamera uygulamasıyla QR kodu tarayın.

#### 🌐 Web Tarayıcısında Çalıştırma

```bash
npx expo start --web
```

> Tarayıcıda `http://localhost:8081` adresi otomatik açılır.

#### 📡 Tunnel Modu (Farklı ağdaki telefonlar için)

```bash
npx expo start --tunnel
```

> Aynı Wi-Fi ağında olmadığınızda tunnel modunu kullanın.

---

### 4️⃣ Temiz Başlatma (Sorun varsa)

Cache'i temizleyerek başlatmak için:

```bash
npx expo start -c
```

---

## 📂 Proje Yapısı

```
gestacare/
├── app/                    # Tüm ekranlar (Expo Router)
│   ├── (auth)/             # Giriş ekranı
│   ├── (tabs)/             # Alt tab navigasyon
│   │   ├── index.tsx       # Ana ekran
│   │   ├── goals.tsx       # Hedefler
│   │   ├── forms.tsx       # Formlar
│   │   ├── profile.tsx     # Profil
│   │   └── notifications.tsx
│   ├── blood-sugar/        # Kan şekeri ekranları
│   ├── activities/         # Aktivite ekranları
│   ├── nutrition/          # Beslenme ekranları
│   ├── education/          # Eğitim merkezi
│   ├── faq/                # Sıkça sorulan sorular
│   └── survey/             # Günlük anket
├── components/
│   ├── ui/                 # Button, Card, Input, Badge...
│   └── shared/             # EmptyState, WarningModal...
├── constants/
│   ├── Colors.ts           # Renk paleti
│   └── Theme.ts            # Gölge ve border tanımları
├── store/
│   ├── authStore.ts        # Kullanıcı oturum state
│   └── healthStore.ts      # Sağlık verisi state (Zustand)
└── assets/                 # Görseller ve fontlar
```

---

## 👤 Giriş Bilgileri (Test)

Uygulama demo modunda çalışmaktadır. Giriş ekranında herhangi bir e-posta ve şifre ile devam edebilirsiniz:

```
E-posta : test@example.com
Şifre   : herhangi bir değer
```

---

## 📸 Ekran Görüntüleri

| Ana Ekran | Kan Şekeri | Aktivite | Eğitim |
|---|---|---|---|
| Canlı istatistikler | Ölçüm ekleme | Aktivite kartları | Kategorili makaleler |

---

## 🎓 Proje Bilgisi

Bu uygulama akademik bir dönem projesi kapsamında geliştirilmiştir.

- **Konu:** Gestasyonel Diyabet Mobil Takip Uygulaması
- **Platform:** React Native / Expo
- **Geliştirici:** Elcin Erdemir

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
