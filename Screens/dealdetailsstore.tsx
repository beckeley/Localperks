import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DealApplication {
  id: string;
  dealId: string;
  dealTitle: string;
  dealPartner: string;
  applicantData: {
    fullName: string;
    communicationPreference: string;
    fieldExample1: string;
    selectedDate: Date;
    fieldExample2: string;
    fieldExample3: string;
    selectedAmount: string;
  };
  submissionDate: string;
  status: 'pending' | 'ongoing' | 'expired';
  expiryDate?: string;
  brandLogo?: string;
}

interface DealApplicationsStore {
  applications: DealApplication[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addApplication: (application: Omit<DealApplication, 'id' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: 'pending' | 'ongoing' | 'expired') => void;
  getApplicationsByStatus: (status: 'pending' | 'ongoing' | 'expired') => DealApplication[];
  getApplicationById: (id: string) => DealApplication | undefined;
  removeApplication: (id: string) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Computed getters
  getPendingCount: () => number;
  getOngoingCount: () => number;
  getExpiredCount: () => number;
}

const useDealApplicationsStore = create<DealApplicationsStore>()(
  persist(
    (set, get) => ({
      applications: [],
      isLoading: false,
      error: null,

      addApplication: (applicationData) => {
        try {
          const newApplication: DealApplication = {
            ...applicationData,
            id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending',
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          };

          set((state) => ({
            applications: [...state.applications, newApplication],
            error: null,
          }));

          console.log('Application added successfully:', newApplication.id);
        } catch (error) {
          console.error('Error adding application:', error);
          set({ error: 'Failed to add application' });
        }
      },

      updateApplicationStatus: (id, status) => {
        try {
          set((state) => ({
            applications: state.applications.map(app =>
              app.id === id ? { 
                ...app, 
                status,
                // If moving to ongoing, set a new expiry date
                ...(status === 'ongoing' && !app.expiryDate && {
                  expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days for ongoing
                })
              } : app
            ),
            error: null,
          }));
        } catch (error) {
          console.error('Error updating application status:', error);
          set({ error: 'Failed to update application status' });
        }
      },

      getApplicationsByStatus: (status) => {
        const { applications } = get();
        return applications.filter(app => app.status === status);
      },

      getApplicationById: (id) => {
        const { applications } = get();
        return applications.find(app => app.id === id);
      },

      removeApplication: (id) => {
        try {
          set((state) => ({
            applications: state.applications.filter(app => app.id !== id),
            error: null,
          }));
        } catch (error) {
          console.error('Error removing application:', error);
          set({ error: 'Failed to remove application' });
        }
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      // Computed getters
      getPendingCount: () => {
        const { applications } = get();
        return applications.filter(app => app.status === 'pending').length;
      },

      getOngoingCount: () => {
        const { applications } = get();
        return applications.filter(app => app.status === 'ongoing').length;
      },

      getExpiredCount: () => {
        const { applications } = get();
        return applications.filter(app => app.status === 'expired').length;
      },
    }),
    {
      name: 'deal-applications-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Add version for future migrations if needed
      version: 1,
    }
  )
);

export default useDealApplicationsStore;