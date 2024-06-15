import React, {useState} from 'react';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

const CountryCodePicker = ({setCountryCode}: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [countryCode, setCountry] = useState<CountryCode>('IN');
  const onSelect = (country: Country) => {
    console.log(country);
    setCountry(country.cca2);
    setCountryCode(country?.callingCode);
  };
  return (
    <CountryPicker
      onSelect={onSelect}
      withFilter={true}
      countryCode={countryCode}
      withFlag={true}
      withCallingCode={true}
      visible={show}
      preferredCountries={['IN']}
    />
  );
};

export default CountryCodePicker;
