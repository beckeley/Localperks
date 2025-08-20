import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {
  TextInput,
  Button as PaperButton,
  TouchableRipple
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as yup from 'yup';
import { RootStackParamList } from '../App'; // Adjust path as needed

const Reviewschema = yup.object({
  email: yup.string().email('Invalid email').required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      'Must be 8+ chars, 1 number, 1 special char'
    ),
});

type ScreenANavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScreenA'>;

const ScreenA = () => {
  const navigation = useNavigation<ScreenANavigationProp>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const logo = require('../assets/images/signin/yotcard.png');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.wholePage}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.title}>Welcome Aboard</Text>

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
  validationSchema={Reviewschema}
  onSubmit={(values, actions) => {
    console.log('Form Submitted:', values);
    navigation.navigate('MainTabs');
  }}
  enableReinitialize={false}
>
  {(props) => (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={props.values.email}
          onChangeText={props.handleChange('email')}
          onBlur={props.handleBlur('email')}
          mode="outlined"
          keyboardType="email-address"
          textColor="black" 
          style={styles.input}
          theme={{
            roundness: 16,
            colors: {
              primary: '#e0e0e0',
              outline: '#e0e0e0',
            },
          }}
        />
        {props.touched.email && props.errors.email && (
          <Text style={styles.errorText}>{props.errors.email}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Password"
                        value={props.values.password}
          onChangeText={props.handleChange('password')}
          onBlur={props.handleBlur('password')}
          mode="outlined"
          textColor="black" 
          secureTextEntry={!passwordVisible}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          theme={{
            roundness: 16,
            colors: {
              primary: '#e0e0e0',
              outline: '#e0e0e0',
            },
          }}
        />
        {props.touched.password && props.errors.password && (
          <Text style={styles.errorText}>{props.errors.password}</Text>
        )}
      </View>

      <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <PaperButton
        mode="contained"
        onPress={props.handleSubmit}
        style={styles.loginButton}
        labelStyle={{ color: 'black', fontWeight: '600' }}
        contentStyle={{ height: 56 }}
      >
        Login
      </PaperButton>
    </>
  )}
</Formik>


              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupText}>Not a member yet ?</Text>
              </TouchableOpacity>

              {/* Horizontal brand logos */}
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.chipContainer}
  style={{ marginTop: 16 }}
>
  {[
    require('../assets/images/signin/brand-etihad-airways-icon-512x239-fig1x8ir 1.png'),
    require('../assets/images/signin/Group.png'),
    require('../assets/images/signin/polo-ralph-lauren-logo-vector 1.png'),
    require('../assets/images/signin/Vector (3).png'),
  ].map((img, index) => (
    <Image
      key={index}
      source={img}
      style={styles.brandLogo}
      resizeMode="contain"
    />
  ))}
</ScrollView>

{/* Terms & Conditions below logos */}
<TouchableRipple
  onPress={() => console.log('Terms pressed')}
  rippleColor="rgba(0, 0, 0, .1)"
  style={styles.termsContainer}
>
  <Text style={styles.termsText}>Terms & Conditions</Text>
</TouchableRipple>

            </View>

           
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wholePage: {
    backgroundColor: '#fff',
    padding: 25,
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  logo: {
    width: 253,
    height: 64,
    marginTop: 70,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: '700',
    paddingTop: 75,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FAFAFA',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  forgot: {
    color: '#666',
    fontSize: 13,
  },
  loginButton: {
    width: 354,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginTop: 10,
  },
  signupText: {
    color: '#FF5758',
    marginTop: 20,
    fontSize: 12,
    fontWeight: '600',
  },
  chipContainer: {
    height: 72,
    width: 400,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  brandLogo: {
    width: 60,
    height: 30,
    marginHorizontal: 10,
  },
  termsContainer: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
  },

  termsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#979797',
  },
})
