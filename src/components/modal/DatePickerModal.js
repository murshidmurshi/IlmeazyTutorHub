import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = ({date, setDate, open, setOpen}) => {
  return (
    <View>
      {/* <Button title="Pick a Date" onPress={() => setOpen(true)} /> */}
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date" // You can change to "time" or "datetime"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DatePickerComponent;
