import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  
} from 'react-native';
import { TextInput, RadioButton, Icon } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import useDealApplicationsStore from '../Screens/dealdetailsstore';

interface DealApplicationFormProps {
  route: {
    params?: {
      dealId?: string;
      dealTitle?: string;
      dealPartner?: string;
      brandLogo?: string;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const DealApplicationForm: React.FC<DealApplicationFormProps> = ({ route, navigation }) => {
  const { dealId, dealTitle, dealPartner, brandLogo } = route.params || {};

  const addApplication = useDealApplicationsStore((state) => state.addApplication);
  const setLoading = useDealApplicationsStore((state) => state.setLoading);
  const isLoading = useDealApplicationsStore((state) => state.isLoading);
  const error = useDealApplicationsStore((state) => state.error);
  const clearError = useDealApplicationsStore((state) => state.clearError);

  const [formData, setFormData] = useState({
    fullName: '',
    communicationPreference: '',
    fieldExample1: '',
    selectedDate: new Date(1598051730000),
    fieldExample2: '',
    fieldExample3: '',
    selectedAmount: '',
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.communicationPreference) {
      Alert.alert('Error', 'Please select a communication preference');
      return false;
    }
    return true;
  };

  const handleSubmitApplication = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const applicationData = {
        dealId: dealId || `deal_${Date.now()}`,
        dealTitle: dealTitle || 'Unknown Deal',
        dealPartner: dealPartner || 'Unknown Partner',
        applicantData: formData,
        submissionDate: new Date().toISOString(),
        brandLogo: brandLogo,
      };

      addApplication(applicationData);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert('Application Submitted! 🎉');
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        navigation.goBack();
      }
    },
    [navigation]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  // New date picker implementation
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
      handleInputChange('selectedDate', currentDate);
    }
  };

  const showMode = (currentMode: 'date' ) => {
    DateTimePickerAndroid.open({
      value: formData.selectedDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const handleDropdownPress = (field: string) => {
    Alert.alert('Dropdown', `${field} dropdown functionality would be implemented here`);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.overlay}>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                <MaterialIcons name="close" size={22} color="#666" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Apply Now</Text>
              <View style={styles.headerSpacer} />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <ScrollView
              style={styles.formContent}
              contentContainerStyle={styles.formContentContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name </Text>
                <TextInput
                  value={formData.fullName}
                  onChangeText={(text) => handleInputChange('fullName', text)}
                  style={styles.textInput}
                  mode="outlined"
                  placeholder="Enter your full name"
                  theme={{
                    colors: {
                      primary: '#FF6B6B',
                      outline: '#ddd',
                    },
                  }}
                />
              </View>

              {/* Communication preference */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Communication preference *</Text>
                <RadioButton.Group
                  onValueChange={(value) => handleInputChange('communicationPreference', value)}
                  value={formData.communicationPreference}
                >
                  {[
                    { label: 'Email', value: 'email', color: '#FF6B6B' },
                    { label: 'Phone Call', value: 'phone', color: '#FF6B6B' },
                    { label: 'SMS', value: 'sms', color: '#FF6B6B' },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.radioGroup}
                      onPress={() => handleInputChange('communicationPreference', option.value)}
                      activeOpacity={0.7}
                    >
                      <RadioButton value={option.value} color={option.color} />
                      <Text style={styles.radioText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </RadioButton.Group>
              </View>

              <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Preferred Date</Text>
  <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
    <Text style={styles.dateInputText}>
      {formData.selectedDate.toLocaleDateString()} {/* formatted date */}
    </Text>
    <Icon
      source="calendar" 
      size={20}
      color="#666"
    />
  </TouchableOpacity>
</View>

              

              {/* Dropdown example */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => handleDropdownPress('Category')}
                >
                  <Text style={styles.dropdownText}>
                    {formData.fieldExample2 || 'Select a category'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Submit button */}
            <View style={styles.submitSection}>
              <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmitApplication}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.submitText}>
                  {isLoading ? 'SENDING...' : 'SEND APPLICATION'}
                </Text>
                {!isLoading && <MaterialIcons name="arrow-forward" size={18} color="white" />}
              </TouchableOpacity>

              <TouchableOpacity style={styles.hintContainer}>
                <Text style={styles.menuHintText}>
                  {isLoading
                    ? 'Processing your application...'
                    : "What's on your mind..."}
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default DealApplicationForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  overlay: { flex: 1 },
  bottomSheetBackground: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: { backgroundColor: '#ddd', width: 40, height: 4 },
  contentContainer: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  closeButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  headerSpacer: { width: 30 },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: { color: '#c62828', fontSize: 12, textAlign: 'center' },
  formContent: { flex: 1, paddingHorizontal: 16, margin: 10 },
  formContentContainer: { paddingBottom: 20 },
  inputContainer: { marginBottom: 20, borderRadius: 16 },
  inputLabel: { fontSize: 14, color: '#333', marginBottom: 8, fontWeight: '500' },
  textInput: { backgroundColor: '#fff', fontSize: 14, borderRadius: 16 },
  radioGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingVertical: 4 },
  radioText: { fontSize: 14, color: '#333', marginLeft: 8 },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  dateInputText: { fontSize: 14, color: '#333' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  dropdownText: { fontSize: 14, color: '#333', flexDirection: 'row' },
  submitSection: { borderTopColor: '#eee', backgroundColor: '#fff', padding: 16 },
  submitButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 58,
  },
  submitButtonDisabled: { backgroundColor: '#ccc', shadowOpacity: 0, elevation: 0 },
  submitText: { color: 'white', fontSize: 14, fontWeight: '600', marginRight: 8 },
  hintContainer: { paddingVertical: 8 },
  menuHintText: { fontSize: 12, color: '#999', textAlign: 'center' },
});