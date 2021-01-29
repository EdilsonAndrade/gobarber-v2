import React, {
  InputHTMLAttributes, useEffect, useRef, useCallback, useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import ToolTip from '../TootlTip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name:string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input:React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {
    defaultValue, fieldName, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container data-testid="inputContainer" isErrored={!!error} isFilled={isFilled} isFocused={isFocused} errorMessage={error}>
      {Icon ? <Icon size={22} /> : ''}
      <input
        onFocus={handleIsFocused}
        onBlur={handleIsFilled}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error ? (
        <Error>
          <FiAlertCircle size={22} color="red" />
          <ToolTip error={error} />
        </Error>
      ) : ''}
    </Container>
  );
};
export default Input;
