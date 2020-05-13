import React from 'react';
import { func, string } from 'prop-types';
import NumberFormat from 'react-number-format';

const TelephoneNumberInput = ({ name, inputRef, onChange, ...rest }) => {
  const onValueChangeHandler = ({ value }) => {
    onChange({
      target: { name, value },
    });
  };

  return (
    <NumberFormat
      {...rest}
      name={name}
      getInputRef={inputRef}
      onValueChange={onValueChangeHandler}
      format="#### #### ###"
    />
  );
};

TelephoneNumberInput.propTypes = {
  inputRef: func.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
};

export default TelephoneNumberInput;
