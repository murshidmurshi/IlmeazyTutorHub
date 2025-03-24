import React, {useCallback, useState} from 'react';
import {Portal, Text, useTheme} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import RadioSelector from './OptionComponent/RadioSelector';

export default function OptionSheet({sheetRef, data}) {
  
  let optionData = data?.data || [];
  const {colors} = useTheme();
  const snapPoints = ['40%'];
  const [selectedValue, setSelectedValue] = useState(
    optionData[0]?.value || '',
  ); // Default selection

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{backgroundColor: colors.background_neutral}}
        backgroundStyle={{
          backgroundColor: colors.background_neutral,
          borderRadius: 25,
        }}>
        <BottomSheetScrollView
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}>
          {/* Dynamic Header */}
          <Text className="font-p_medium text-lg mb-5">{data?.title}</Text>

          {/* Use Separate Radio Selector Component */}
          <RadioSelector
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={optionData} // Pass the dynamic data
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </Portal>
  );
}
