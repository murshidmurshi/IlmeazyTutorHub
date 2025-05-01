import React, {useCallback, useEffect, useState} from 'react';
import {Portal, Text, useTheme} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import RadioSelector from './OptionComponent/RadioSelector';
import CheckboxSelector from './OptionComponent/CheckboxSelector';

export default function OptionSheet({
  sheetRef,
  data,
  setselectedData,
  selectedData,
  formik,
}) {
  const {colors} = useTheme();
  const snapPoints = ['40%'];

  const optionData = data?.data || [];
  const optionKey = data?.key || '';
  const isForCheckbox = data?.multiple || false;
  const [selectedValue, setSelectedValue] = useState('');

  // ✅ When optionKey changes, set previously selected value from selectedData
  useEffect(() => {
    if (!Array.isArray(selectedData)) return; // Prevent error
    const existing = selectedData.find(item => item?.type === optionKey);
    if (existing) {
      setSelectedValue(existing?.value);
    } else {
      setSelectedValue('');
    }
  }, [optionKey, selectedData]);
  

  // ✅ Update selectedData state and formik when selection changes
  useEffect(() => {
    if (!selectedValue) return;
  
    setselectedData(prev => {
      const safePrev = Array.isArray(prev) ? prev : []; // 🛡️ Defensive fallback
      const updated = safePrev.map(item =>
        item?.type === optionKey ? {...item, value: selectedValue} : item,
      );
      const exists = safePrev.some(item => item?.type === optionKey);
      if (!exists) {
        updated.push({type: optionKey, value: selectedValue});
      }
  
      formik.setFieldValue(optionKey, selectedValue);
      return updated;
    });
  }, [selectedValue]);
  
  
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
          <Text className="font-p_medium text-lg mb-5">{data?.title}</Text>

          {isForCheckbox ? (
            <CheckboxSelector
              selectedValues={selectedValue}
              setSelectedValues={setSelectedValue}
              data={optionData}
            />
          ) : (
            <RadioSelector
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              data={optionData}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </Portal>
  );
}
