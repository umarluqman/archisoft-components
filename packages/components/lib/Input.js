import {
  Input,
  InputGroup as BaseInputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as BaseNumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

export const NumberInput = ({ ...props }) => (
  <BaseNumberInput {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </BaseNumberInput>
)

export const PasswordInput = ({ placeholder, ...props }) => (
  <BaseInputGroup {...props}>
    <Input pr="4.5rem" placeholder={placeholder} />
  </BaseInputGroup>
)

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
}
