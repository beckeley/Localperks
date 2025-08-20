import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { TextInput, Button, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const genderData = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const monthData = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const yesNoData = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const industryData = [
  { label: 'Real Estate', value: 'realestate' },
  { label: 'Tech', value: 'tech' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Other', value: 'other' },
];

const businessInterestsData = [
  { label: 'Stocks', value: 'stocks' },
  { label: 'Real Estate', value: 'realestate' },
  { label: 'Cryptocurrency', value: 'crypto' },
  { label: 'Startups', value: 'startups' },
  { label: 'Other', value: 'other' },
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  surname: Yup.string().required('Surname is required'),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string().required('Country is required'),
  lang: Yup.string().required('Language is required'),
  city: Yup.string().required('City is required'),
  emailType: Yup.string().required('Email type is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  whatsapp: Yup.string().required('WhatsApp number is required'),
  linkedin: Yup.string().required('LinkedIn username is required'),
  instagram: Yup.string().required('Instagram username is required'),
  yachtingConnection: Yup.string().required('Yachting connection is required'),
  industry: Yup.string().required('Industry is required'),
  businessInterests: Yup.string().required('Business interests is required'),
  bio: Yup.string().required('Personal bio is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUp = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScreenA'>;
  const navigation = useNavigation<NavigationProp>();

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Refs for all form fields
  const fieldRefs = useRef({});
  const scrollViewRef = useRef(null);

  // Field order for scrolling to first empty field
  const fieldOrder = [
    'name', 'surname', 'gender', 'dob', 'country', 'lang', 'city',
    'emailType', 'email', 'phone', 'whatsapp',
    'linkedin', 'instagram', 'otherLinks', 'portfolio',
    'yachtingConnection', 'companyName', 'industry', 'income', 'netWorth', 'businessInterests',
    'bio', 'password'
  ];

  const formatSelectedDate = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const monthName = monthData.find(m => m.value === selectedMonth)?.label || '';
      return `${monthName} ${selectedDay}, ${selectedYear}`;
    }
    return 'Date of Birth';
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
  };

  const generateDays = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      const dayStr = day.toString().padStart(2, '0');
      days.push({ label: dayStr, value: dayStr });
    }
    return days;
  };

  const handleDateConfirm = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      setShowDateModal(false);
    } else {
      Alert.alert('Please select complete date', 'Day, Month, and Year are required');
    }
  };

  const showAndroidDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      display: 'calendar',
      maximumDate: new Date(),
      minimumDate: new Date(1900, 0, 1),
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          const day = selectedDate.getDate().toString().padStart(2, '0');
          const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
          const year = selectedDate.getFullYear().toString();
          setSelectedDay(day);
          setSelectedMonth(month);
          setSelectedYear(year);
        }
      },
    });
  };

  // Function to scroll to first empty field
  const scrollToFirstError = (errors, values) => {
    // Check if date is missing
    const hasDateError = !selectedDay || !selectedMonth || !selectedYear;
    
    // Create combined errors object including date
    const allErrors = {
      ...errors,
      ...(hasDateError && { dob: 'Date of birth is required' })
    };

    // Find first empty field in order
    const firstErrorField = fieldOrder.find(field => {
      if (field === 'dob') {
        return hasDateError;
      }
      return allErrors[field] || (!values[field] && validationSchema.fields[field]);
    });

    if (firstErrorField && fieldRefs.current[firstErrorField]) {
      // Scroll to the field
      fieldRefs.current[firstErrorField].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({
            x: 0,
            y: Math.max(0, y - 100), // Offset to show field clearly
            animated: true,
          });
        },
        () => {} // Error callback
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
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
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Check if date is selected
              if (!selectedDay || !selectedMonth || !selectedYear) {
                Alert.alert('Date Required', 'Please select your date of birth');
                setSubmitting(false);
                return;
              }

              const userData = {
                ...values,
                dob: `${selectedYear}-${selectedMonth}-${selectedDay}`,
              };
              alert(JSON.stringify(userData, null, 2));
              setSubmitting(false);
              navigation.navigate('ScreenA');
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              validateForm,
            }) => (
              <View style={styles.formContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Join the Club</Text>
                <Text style={styles.subtitle}>
                  Your personal details will help us review your application and tailor your in-app experience.
                </Text>
                <Divider style={{ marginBottom: 14 }} />

                <Text style={styles.subTitle}>Personal Information</Text>

                <View 
                  ref={ref => fieldRefs.current.name = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.name && touched.name ? '#fafafa' : '#fafafa',
                        placeholder: 'gray',
                        outline: errors.name && touched.name ? '#e0e0e0' : '#e0e0e0'
                      },
                    }}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.surname = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Surname"
                    value={values.surname}
                    onChangeText={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.surname && touched.surname ? '#fafafa' : '#fafafa',
                        placeholder: 'gray',
                        outline: errors.surname && touched.surname ? '#e0e0e0' : '#e0e0e0'
                      },
                    }}
                  />
                  {errors.surname && touched.surname && (
                    <Text style={styles.errorText}>{errors.surname}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.gender = ref}
                  style={styles.fieldContainer}
                >
                  <Dropdown
                    style={[styles.dropdown, {
                      borderColor: errors.gender && touched.gender ? '#e0e0e0' : '#e0e0e0',
                    }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={genderData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Gender"
                    value={values.gender}
                    onChange={(item) => setFieldValue('gender', item.value)}
                  />
                  {errors.gender && touched.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.dob = ref}
                  style={styles.fieldContainer}
                >
                  <TouchableOpacity
                    style={[styles.datePickerContainer, {
                      borderColor: (!selectedDay || !selectedMonth || !selectedYear) ? '#e0e0e0' : '#e0e0e0'
                    }]}
                    onPress={() => setShowDateModal(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dateText, {
                      color: selectedDay && selectedMonth && selectedYear ? 'black' : '#aaa',
                      paddingHorizontal: 10,
                    }]}>
                      {formatSelectedDate()}
                    </Text>
                    <IconButton
                      icon="calendar"
                      size={20}
                      iconColor="grey"
                      onPress={() => setShowDateModal(true)}
                      style={styles.calendarIcon}
                    />
                  </TouchableOpacity>
                  {(!selectedDay || !selectedMonth || !selectedYear) && (
                    <Text style={styles.errorText}>Date of birth is required</Text>
                  )}
                </View>

                <Modal
                  visible={showDateModal}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setShowDateModal(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Select Date of Birth</Text>

                      <View style={styles.dateSelectionContainer}>
                        <View style={styles.dateDropdownContainer}>
                          <Text style={styles.dateLabel}>Day</Text>
                          <Dropdown
                            style={styles.dateDropdown}
                            data={generateDays()}
                            labelField="label"
                            valueField="value"
                            placeholder="Day"
                            value={selectedDay}
                            onChange={(item) => setSelectedDay(item.value)}
                            maxHeight={200}
                          />
                        </View>

                        <View style={styles.dateDropdownContainer}>
                          <Text style={styles.dateLabel}>Month</Text>
                          <Dropdown
                            style={styles.dateDropdown}
                            data={monthData}
                            labelField="label"
                            valueField="value"
                            placeholder="Month"
                            value={selectedMonth}
                            onChange={(item) => setSelectedMonth(item.value)}
                            maxHeight={200}
                          />
                        </View>

                        <View style={styles.dateDropdownContainer}>
                          <Text style={styles.dateLabel}>Year</Text>
                          <Dropdown
                            style={styles.dateDropdown}
                            data={generateYears()}
                            labelField="label"
                            valueField="value"
                            placeholder="Year"
                            value={selectedYear}
                            onChange={(item) => setSelectedYear(item.value)}
                            maxHeight={200}
                          />
                        </View>
                      </View>

                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.cancelButton]}
                          onPress={() => setShowDateModal(false)}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.confirmButton]}
                          onPress={handleDateConfirm}
                        >
                          <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <View 
                  ref={ref => fieldRefs.current.country = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Country"
                    value={values.country}
                    onChangeText={handleChange('country')}
                    onBlur={handleBlur('country')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.country && touched.country ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.country && touched.country ?'#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.country && touched.country && (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.lang = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Language"
                    value={values.lang}
                    onChangeText={handleChange('lang')}
                    onBlur={handleBlur('lang')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.lang && touched.lang ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.lang && touched.lang ? '#e0e0e0' : '#e0e0e0'
                      },
                    }}
                  />
                  {errors.lang && touched.lang && (
                    <Text style={styles.errorText}>{errors.lang}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.city = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="City"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.city && touched.city ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.city && touched.city ? '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.city && touched.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                </View>
                
                <Divider style={styles.divider} />
                <Text style={styles.sectionHeader}>Contact Details</Text>

                <View 
                  ref={ref => fieldRefs.current.emailType = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Email Type (e.g. Email, SMS)"
                    value={values.emailType}
                    textColor="black"
                    onChangeText={handleChange('emailType')}
                    onBlur={handleBlur('emailType')}
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.emailType && touched.emailType ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.emailType && touched.emailType ? '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.emailType && touched.emailType && (
                    <Text style={styles.errorText}>{errors.emailType}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.email = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.email && touched.email ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.email && touched.email ? '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.phone = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Phone Number"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    textColor="black"
                    keyboardType="phone-pad"
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.phone && touched.phone ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.phone && touched.phone ? '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.phone && touched.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.whatsapp = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="WhatsApp Number"
                    value={values.whatsapp}
                    onChangeText={handleChange('whatsapp')}
                    onBlur={handleBlur('whatsapp')}
                    keyboardType="phone-pad"
                    textColor="black"
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.whatsapp && touched.whatsapp ?  '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.whatsapp && touched.whatsapp ?  '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                  />
                  {errors.whatsapp && touched.whatsapp && (
                    <Text style={styles.errorText}>{errors.whatsapp}</Text>
                  )}
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.sectionHeader}>Social & Digital</Text>

                <View 
                  ref={ref => fieldRefs.current.linkedin = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Enter Username"
                    value={values.linkedin}
                    onChangeText={handleChange('linkedin')}
                    
                    textColor="black"
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.linkedin && touched.linkedin ? '#e0e0e0' : '#e0e0e0',
                        placeholder: 'gray',
                        outline: errors.linkedin && touched.linkedin ? '#e0e0e0' : '#e0e0e0',
                      },
                    }}
                    left={<TextInput.Affix text="Linkedin/in/" />}
                  />
                  {errors.linkedin && touched.linkedin && (
                    <Text style={styles.errorText}>{errors.linkedin}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.instagram = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Instagram Username"
                    value={values.instagram}
                    onChangeText={handleChange('instagram')}
                    onBlur={handleBlur('instagram')}
                    textColor="black"
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.instagram && touched.instagram ?'#fafafa' : '#fafafa',
                        placeholder: 'gray',
                        outline: errors.instagram && touched.instagram ? '#fafafa' : '#fafafa',
                      },
                    }}
                  />
                  {errors.instagram && touched.instagram && (
                    <Text style={styles.errorText}>{errors.instagram}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.otherLinks = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Other Links (optional)"
                    value={values.otherLinks}
                    textColor="black"
                    onChangeText={handleChange('otherLinks')}
                    style={styles.input}
                    keyboardType="url"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: '#fafafa',
                        placeholder: 'gray',
                        outline: '#e0e0e0'
                      },
                    }}
                  />
                </View>

                <View 
                  ref={ref => fieldRefs.current.portfolio = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Portfolio (optional)"
                    value={values.portfolio}
                    textColor="black"
                    onChangeText={handleChange('portfolio')}
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: '#fafafa',
                        placeholder: 'gray',
                        outline: '#e0e0e0'
                      },
                    }}
                  />
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.sectionHeader}>Connection to Yachting</Text>

                <View 
                  ref={ref => fieldRefs.current.yachtingConnection = ref}
                  style={styles.fieldContainer}
                >
                  <Dropdown
                    style={[styles.dropdown, {
                      borderColor: errors.yachtingConnection && touched.yachtingConnection ? '#fafafa' : '#fafafa',
                    }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemContainerStyle={styles.itemContainer}
                    itemTextStyle={styles.itemText}
                    containerStyle={styles.dropdownContainer}
                    data={yesNoData}
                    labelField="label"
                    valueField="value"
                    placeholder="Yachting Business Owner"
                    value={values.yachtingConnection}
                    onChange={(item) => setFieldValue('yachtingConnection', item.value)}
                  />
                  {errors.yachtingConnection && touched.yachtingConnection && (
                    <Text style={styles.errorText}>{errors.yachtingConnection}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.companyName = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Company Name (optional)"
                    value={values.companyName}
                    onChangeText={handleChange('companyName')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: '#fafafa',
                        placeholder: 'gray',
                        outline: '#e0e0e0'
                      },
                    }}
                  />
                </View>

                <View 
                  ref={ref => fieldRefs.current.industry = ref}
                  style={styles.fieldContainer}
                >
                  <Dropdown
                    style={[styles.dropdown, {
                      borderColor: errors.industry && touched.industry ? '#fafafa' : '#fafafa',
                    }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemContainerStyle={styles.itemContainer}
                    itemTextStyle={styles.itemText}
                    containerStyle={styles.dropdownContainer}
                    data={industryData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Industry / Sector Expertise"
                    value={values.industry}
                    onChange={(item) => setFieldValue('industry', item.value)}
                  />
                  {errors.industry && touched.industry && (
                    <Text style={styles.errorText}>{errors.industry}</Text>
                  )}
                </View>

                <View 
                  ref={ref => fieldRefs.current.income = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Annual Income Range (optional)"
                    value={values.income}
                    onChangeText={handleChange('income')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: '#fafafa',
                        placeholder: 'gray',
                        outline: '#e0e0e0'
                      },
                    }}
                  />
                </View>

                <View 
                  ref={ref => fieldRefs.current.netWorth = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Estimated Net Worth Range (optional)"
                    value={values.netWorth}
                    onChangeText={handleChange('netWorth')}
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: '#fafafa',
                        placeholder: 'gray',
                        outline: '#e0e0e0'
                      },
                    }}
                  />
                </View>

                <View 
                  ref={ref => fieldRefs.current.businessInterests = ref}
                  style={styles.fieldContainer}
                >
                  <Dropdown
                    style={[styles.dropdown, {
                      borderColor: errors.businessInterests && touched.businessInterests ? '#fafafa' : '#fafafa',
                    }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemContainerStyle={styles.itemContainer}
                    itemTextStyle={styles.itemText}
                    containerStyle={styles.dropdownContainer}
                    data={businessInterestsData}
                    labelField="label"
                    valueField="value"
                    placeholder="Business Interests"
                    value={values.businessInterests}
                    onChange={(item) => setFieldValue('businessInterests', item.value)}
                  />
                  {errors.businessInterests && touched.businessInterests && (
                    <Text style={styles.errorText}>{errors.businessInterests}</Text>
                  )}
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.sectionHeader}>Personal Bio</Text>

                <View 
                  ref={ref => fieldRefs.current.bio = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    label="Introduce yourself in a few words"
                    value={values.bio}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    multiline
                    numberOfLines={5}
                    textColor="black"
                    style={[styles.input, { height: 188 }]}
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.bio && touched.bio ? '#fafafa' : '#fafafa',
                        placeholder: 'gray',
                        outline: errors.bio && touched.bio ? '#fafafa' : '#fafafa',
                      },
                    }}
                  />
                  {errors.bio && touched.bio && (
                    <Text style={styles.errorText}>{errors.bio}</Text>
                  )}
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.sectionHeader}>Account Security</Text>

                <View 
                  ref={ref => fieldRefs.current.password = ref}
                  style={styles.fieldContainer}
                >
                  <TextInput
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    style={styles.input}
                    textColor="black"
                    mode="outlined"
                    theme={{
                      roundness: 8,
                      colors: {
                        text: 'black',
                        primary: errors.password && touched.password ? '#fafafa' : '#fafafa',
                        placeholder: 'gray',
                        outline: errors.password && touched.password ? '#fafafa' : '#fafafa',
                      },
                    }}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  style={styles.button}
                  contentStyle={{ paddingVertical: 10 }}
                  onPress={() => {
                    validateForm().then((formErrors) => {
                      // Check if there are validation errors or missing date
                      const hasErrors = Object.keys(formErrors).length > 0;
                      const hasDateError = !selectedDay || !selectedMonth || !selectedYear;
                      
                      if (hasErrors || hasDateError) {
                        // Scroll to first error field
                        scrollToFirstError(formErrors, values);
                      }
                      
                      // Continue with normal form submission
                      handleSubmit();
                    });
                  }}
                  buttonColor="#f25c5c"
                  mode="contained"
                  textColor='white'
                  disabled={isSubmitting}
                >
                  Submit Application
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  formContainer: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 4,
  },
  backText: {
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161',
    fontSize: 14,
    fontWeight: '400'
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center'
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center'
  },
  input: {
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 8,
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
    paddingHorizontal: 17,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 17,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
  },
  itemText: {
    color: 'black',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  datePickerContainer: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  calendarIcon: {
    margin: 0,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
  },
  divider: {
    marginVertical: 16,
  },
  errorText: {
    color: '#f25c5c',
    marginBottom: 8,
    fontSize: 12,
    paddingHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateDropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  dateDropdown: {
    height: 45,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#f25c5c',
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});