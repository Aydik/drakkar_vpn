import React from 'react';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type PathValue,
} from 'react-hook-form';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Typography } from 'shared/ui/Typography';

interface InputWithFormatterProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  format?: (value: string) => string;
  error?: FieldError;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  type?: string;
  defaultValue?: PathValue<TFieldValues, FieldPath<TFieldValues>>;
}

export const InputWithFormatter = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  format,
  error,
  rules,
  type = 'text',
  defaultValue,
}: InputWithFormatterProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur, ref } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputVal = e.target.value;
          onChange(format ? format(inputVal) : inputVal);
        };

        return (
          <div className={styles.inputContainer}>
            <div className={clsx(styles.inputWrapper, error && styles.inputWrapper_error)}>
              <input
                id={name}
                type={type}
                value={value || ''}
                onChange={handleChange}
                onBlur={onBlur}
                ref={ref}
                placeholder={' '}
                className={styles.inputField}
              />
              <label htmlFor={name} className={styles.floatingLabel}>
                {label}
              </label>
            </div>
            {error?.message && (
              <Typography variant="p" className={styles.inputErrorMessage}>
                {String(error.message)}
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
};
