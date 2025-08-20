import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Avatar,
  FAB,
  IconButton,
  MD3Colors,
  ProgressBar,
  Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import the helper function and deal data from your Explore screen
import { getDealById } from './Explore';
// Import the new centralized deal data system
import { getDealSpecificData, hasDealSpecificData } from '../Screens/dealData'

const DealDetails = ({ route, navigation }: any) => {
  const { dealId } = route.params;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  // Get the specific deal by ID
  const deal = getDealById(dealId);
  
  // If deal not found, show error state
  if (!deal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.errorText}>Deal not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get the specific data for this deal
  const dealSpecificData = getDealSpecificData(deal.id);
  
  // Check if we have specific data for this deal
  const hasSpecificData = hasDealSpecificData(deal.id);

  const truncateDescription = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with back button and image */}
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          />
          <Image
            source={deal.image}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.detailsCard}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Avatar.Image
              source={dealSpecificData.logo}
              size={120}
              style={[styles.logo, { width: 120, height: 120 }]}
            />
          </View>

          {/* Title and verification badge */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{deal.title}</Text>
        
          </View>

          {/* Quantity and Used by section */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Quantity</Text>
              <View style={styles.quantityRow}>
                <Text style={styles.quantityNumber}>{deal.quantity?.used || 82}</Text>
                <ProgressBar
                  progress={deal.quantity ? deal.quantity.used / deal.quantity.total : 0.51}
                  color={MD3Colors.error50}
                  style={styles.progressBar}
                />
                <Text style={styles.quantityNumber}>{deal.quantity?.total || 160}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.label}>Used by</Text>
              <View style={styles.avatarStack}>
                <Avatar.Image
                  source={require('../assets/images/explore/p.jpg')}
                  size={24}
                />
                <Avatar.Image
                  source={require('../assets/images/explore/q.png')}
                  size={24}
                  style={styles.avatarOverlap}
                />
                <Avatar.Image
                  source={require('../assets/images/explore/d.png')}
                  size={24}
                  style={styles.avatarOverlap}
                />
                <View style={[styles.avatarMore, styles.avatarOverlap]}>
                  <Text style={styles.avatarText}>+{(deal.quantity?.total || 160) - 15}</Text>
                </View>
              </View>
            </View>
          </View>

        

          {/* About Section */}
          <Text style={styles.sectionTitle}>About this offer</Text>
          <Text style={styles.description}>
            {showFullDescription ? 
              dealSpecificData.description : 
              truncateDescription(dealSpecificData.description)
            }
          </Text>
          {dealSpecificData.description.length > 300 && (
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={styles.readMore}>
                {showFullDescription ? 'Show less' : 'Read more...'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Benefits Section */}
          {dealSpecificData.benefits.length > 0 && (
            <View style={styles.section}>
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => setShowBenefits(!showBenefits)}
              >
              
              </TouchableOpacity>
              {showBenefits && (
                <View style={styles.benefitsList}>
                  {dealSpecificData.benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          

          {/* More from Partner Section */}
          {dealSpecificData.moreFromPartner.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.linkText}>
                More from {dealSpecificData.partner}
              </Text>
              
              {dealSpecificData.moreFromPartner.map((item, index) => (
                <TouchableOpacity key={index} style={styles.partnerCard}>
                  <Image
                    source={item.image}
                    style={styles.partnerImage}
                    resizeMode="cover"
                  />
                  <View style={styles.partnerContent}>
                    <Text style={styles.partnerTitle}>{item.title}</Text>
                    
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.label}>Quantity</Text>
                        <View style={styles.quantityRow}>
                          <Text style={styles.quantityNumber}>{item.quantityUsed}</Text>
                          <ProgressBar
                            progress={item.quantityUsed / item.quantityTotal}
                            color={MD3Colors.error50}
                            style={styles.progressBar}
                          />
                          <Text style={styles.quantityNumber}>{item.quantityTotal}</Text>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.label}>Used by</Text>
                        <View style={styles.avatarStack}>
                          {item.avatars.map((avatar, i) => (
                            <Avatar.Image
                              key={i}
                              source={avatar}
                              size={24}
                              style={i > 0 ? styles.avatarOverlap : null}
                            />
                          ))}
                          <View style={[styles.avatarMore, styles.avatarOverlap]}>
                            <Text style={styles.avatarText}>
                              +{item.quantityTotal - item.quantityUsed}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Apply Now Button */}
      <FAB
        label="Apply now"
        style={styles.fab}
        onPress={() => {
          navigation.navigate('DealApplicationForm', {
            dealId: deal.id,
            dealTitle: deal.title,
            dealPartner: dealSpecificData.partner,
            dealLogo: dealSpecificData.logo,
            dealEndDate: dealSpecificData.endDate
          });
        }}
      />
    </SafeAreaView>
  );
};

export default DealDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  header: {
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 12,
    left: 4,
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  headerImage: {
    width: '100%',
    height: 294,
  },
  detailsCard: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 28,
    marginTop: -20,
    
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: -75,
    marginBottom: 16,
    marginLeft: -12,
  },
  logo: {
    backgroundColor: 'white',
    left: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '500',
    color: '#212121',
    flex: 1,
    marginRight: 12,
    lineHeight: 28,
  },
  verifiedChip: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  verifiedChipText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  endDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5C00',
  },
  dealEndDate: {
    fontSize: 14,
    color: '#FF5C00',
    marginLeft: 8,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  benefitsList: {
    marginTop: 8,
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  termsList: {
    marginTop: 8,
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 8,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
    marginTop: 2,
  },
  termText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  partnerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  partnerImage: {
    width: '100%',
    height: 140,
  },
  partnerContent: {
    padding: 12,
  },
  partnerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777',
    marginBottom: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quantityNumber: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  progressBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  avatarMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#33363f',
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 8,
  },
  readMore: {
    color: '#BB9C76',
    fontSize: 14,
    lineHeight: 14,
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '500',
  },
  linkText: {
    fontSize: 16,
    color: '#FF5C00',
    textAlign: 'left',
    marginBottom: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    height: 58,
    borderRadius: 15,
    backgroundColor: '#FC5758',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FC5758',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});