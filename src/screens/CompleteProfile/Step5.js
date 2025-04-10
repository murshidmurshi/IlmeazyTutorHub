import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import AppHeader from '../../components/appHeader/AppHeader';
import {useTranslation} from 'react-i18next';
import TransparentBtn from '../../components/button/TransparentBtn';
import PrimaryButton from '../../components/button/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import DocumentPicker from 'react-native-document-picker';

// Uploaded Image Component
const UploadedImage = ({colors, data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View className="flex-row items-center justify-between space-x-3 px-2.5 my-2">
          <View className="flex-row items-center space-x-3">
            {/* Icon */}
            <Ionicons
              name={'checkmark-circle-outline'}
              size={30}
              color={colors.green}
            />
            {/* Doc Name */}
            <Text
              className="font-p_medium text-md"
              style={{color: colors?.text_primary}}>
              {item.name}
            </Text>
          </View>
          {/* Delete Icon */}
          <Ionicons
            name={'trash-outline'}
            size={26}
            color={colors.error_main}
          />
        </View>
      )}
      contentContainerStyle={{paddingBottom: 20}}
    />
  );
};

export default function Step5() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  // Extract Step5 translations
  const [screenName, subtitle, header1, child1, uploadHeader, submitBtn] = [
    t('Steps.screenName'),
    t('Steps.Step5.subtitle'),
    t('Steps.Step5.header1'),
    t('Steps.Step5.child1'),
    t('Steps.Step5.uploadHeader'),
    t('Steps.submitBtn'),
  ];

  // Sample data with unique IDs
  const imageData = Array.from({length: 4}, (_, i) => ({
    id: i + 1,
    name: `image_${String(i + 1).padStart(3, '0')}.jpg`,
  }));

  const [pickerloading, setpickerLoading] = useState(false);
  const [image, setImage] = useState([]);

  // Function to open the gallery
  // const Pickerdocument = async () => {
  //   try {
  //     setpickerLoading(true);
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images], // Allows image selection
  //     });
  //     setImage([...image, result]);
  //     setpickerLoading(false);
  //   } catch (err) {
  //     setpickerLoading(false);
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User canceled file picker');
  //     } else {
  //       console.error('Error picking document:', err);
  //     }
  //   }
  // };

  return (
    <>
      <AppHeader screenName={screenName} secondTitle={subtitle} />
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        {/* Using FlatList as the main container */}
        <FlatList
          data={[{key: 'header'}, ...imageData]} // Add a dummy key for header
          keyExtractor={(item, index) => item.key || index.toString()}
          ListHeaderComponent={() => (
            <>
              <InputHeader label={header1} />
              <View className="p-2.5">
                <Text
                  className="font-regular text-sm"
                  style={{color: colors?.text_secondary}}>
                  {child1}
                </Text>

                {/* Add File Button */}
                <View className="py-3">
                  <TransparentBtn
                    // onPress={Pickerdocument}
                    bg={true}
                    label={'Add a file'}
                    icon={
                      <Ionicons
                        name={'cloud-upload-outline'}
                        size={24}
                        color={colors.text_primary}
                      />
                    }
                  />
                </View>

                {/* Uploaded Files Header */}
                <Text
                  className="font-p_medium text-md"
                  style={{color: colors?.text_secondary}}>
                  {uploadHeader}
                </Text>
              </View>
            </>
          )}
          renderItem={({item}) =>
            item.key === 'header' ? null : (
              <UploadedImage colors={colors} data={[item]} />
            )
          }
          contentContainerStyle={{paddingBottom: 80}}
        />

        {/* Bottom Submit Button */}
        <View className="absolute bottom-2 left-0 right-0 p-4 shadow-xl">
          <PrimaryButton label={submitBtn} />
        </View>
      </SafeAreaView>
    </>
  );
}
