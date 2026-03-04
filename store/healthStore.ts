import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MealType = 'Sabah' | 'Öğle' | 'Akşam' | 'Gece';
export type EntryType = 'Açlık' | 'Tokluk';

export interface BloodSugarEntry {
    id: string;
    value: number;
    meal: MealType;
    type: EntryType;
    insulin?: number;
    date: string;
    time: string;
}

export interface ActivityEntry {
    id: string;
    type: string;
    duration: number;
    completed: boolean;
    date: string;
    time: string;
    dayNumber: number;
}

export interface NutritionEntry {
    id: string;
    week: number;
    meal: string;
    items: { name: string; calories: number; amount: string }[];
    totalCalories: number;
    date: string;
}

interface HealthState {
    bloodSugarEntries: BloodSugarEntry[];
    activityEntries: ActivityEntry[];
    nutritionEntries: NutritionEntry[];
    addBloodSugar: (entry: Omit<BloodSugarEntry, 'id'>) => void;
    deleteBloodSugar: (id: string) => void;
    addActivity: (entry: Omit<ActivityEntry, 'id'>) => void;
    deleteActivity: (id: string) => void;
    addNutrition: (entry: Omit<NutritionEntry, 'id'>) => void;
    deleteNutrition: (id: string) => void;
}

export const useHealthStore = create<HealthState>()(
    persist(
        (set) => ({
            bloodSugarEntries: [
                { id: '1', value: 95, meal: 'Sabah', type: 'Açlık', date: '04.03.2026', time: '08:00' },
                { id: '2', value: 120, meal: 'Sabah', type: 'Tokluk', date: '04.03.2026', time: '10:00' }
            ],
            activityEntries: [
                { id: '3', type: 'Hafif Yürüyüş', duration: 30, completed: true, date: '04.03.2026', time: '16:00', dayNumber: 1 },
                { id: '4', type: 'Hamile Yogası', duration: 45, completed: false, date: '05.03.2026', time: '10:00', dayNumber: 2 }
            ],
            nutritionEntries: [
                { id: '5', week: 24, meal: 'Öğle Yemeği', items: [{ name: 'Izgara Tavuk Salata', calories: 350, amount: '1 Porsiyon' }, { name: 'Ayran', calories: 80, amount: '1 Bardak' }], totalCalories: 430, date: '04.03.2026' }
            ],
            addBloodSugar: (entry) => set((state) => ({
                bloodSugarEntries: [{ ...entry, id: Date.now().toString() }, ...state.bloodSugarEntries]
            })),
            deleteBloodSugar: (id) => set((state) => ({
                bloodSugarEntries: state.bloodSugarEntries.filter(e => e.id !== id)
            })),
            addActivity: (entry) => set((state) => ({
                activityEntries: [{ ...entry, id: Date.now().toString() }, ...state.activityEntries]
            })),
            deleteActivity: (id) => set((state) => ({
                activityEntries: state.activityEntries.filter(e => e.id !== id)
            })),
            addNutrition: (entry) => set((state) => ({
                nutritionEntries: [{ ...entry, id: Date.now().toString() }, ...state.nutritionEntries]
            })),
            deleteNutrition: (id) => set((state) => ({
                nutritionEntries: state.nutritionEntries.filter(e => e.id !== id)
            })),
        }),
        {
            name: 'health-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
