import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const DatepickerDefault = (props) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    props.dateHandler(newValue.endDate);
  };

  return (
    <Datepicker
      inputClassName="w-full border border-blue-gray-200 rounded-md p-2 min-w-[200px]"
      useRange={false}
      asSingle={true}
      value={value}
      onChange={handleValueChange}
      displayFormat={'YYYY/MM/DD'}
      showShortcuts={true}
      disabledKeyboardNavigation={true}
      readOnly={true}
    />
  );
};
export default DatepickerDefault;
