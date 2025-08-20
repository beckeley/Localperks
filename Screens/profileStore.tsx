import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useProfileStore = create(
  persist(
    (set, get) => ({
      profile: {
        name: '',
        surname: '',
        gender: '',
        country: '',
        lang: '',
        city: '',
        emailType: '',
        email: '',
        phone: '',
        whatsapp: '',
        linkedin: '',
        instagram: '',
        otherLinks: '',
        portfolio: '',
        yachtingConnection: '',
        companyName: '',
        industry: '',
        income: '',
        netWorth: '',
        businessInterests: '',
        bio: '',
      },
      isSaving: false,
      error: null,

      // Update a specific field in the profile
      updateProfile: (field, value) =>
        set((state) => ({
          profile: {
            ...state.profile,
            [field]: value,
          },
        })),

      // Save the entire profile
      saveProfile: async () => {
        set({ isSaving: true, error: null });
        
        try {
          // Simulate API call - replace with your actual API endpoint
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Here you would typically make an API call to save the profile
          // const response = await api.saveProfile(get().profile);
          
          set({ isSaving: false });
          return { success: true };
        } catch (error) {
          set({ 
            isSaving: false, 
            error: error.message || 'Failed to save profile' 
          });
          return { success: false, error: error.message };
        }
      },

      // Clear error state
      clearError: () => set({ error: null }),

      // Check if profile is complete
      isProfileComplete: () => {
        const { profile } = get();
        const requiredFields = ['name', 'surname', 'email', 'phone'];
        return requiredFields.every(field => profile[field]?.trim());
      },

      // Get profile completion percentage
      getProfileCompletionPercentage: () => {
        const { profile } = get();
        const allFields = Object.keys(profile);
        const completedFields = allFields.filter(field => 
          profile[field] && profile[field].toString().trim()
        );
        return Math.round((completedFields.length / allFields.length) * 100);
      },

      // Reset profile to initial state
      resetProfile: () =>
        set({
          profile: {
            name: '',
            surname: '',
            gender: '',
            country: '',
            lang: '',
            city: '',
            emailType: '',
            email: '',
            phone: '',
            whatsapp: '',
            linkedin: '',
            instagram: '',
            otherLinks: '',
            portfolio: '',
            yachtingConnection: '',
            companyName: '',
            industry: '',
            income: '',
            netWorth: '',
            businessInterests: '',
            bio: '',
          },
          error: null,
        }),
    }),
    {
      name: 'profile-storage', // unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);

export default useProfileStore;