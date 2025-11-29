// Validation utilities for forms

export const validators = {
  required: (value: string | number | null | undefined): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email format';
    }
    return null;
  },

  minLength: (value: string, min: number): string | null => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value: string, max: number): string | null => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be at most ${max} characters`;
    }
    return null;
  },

  number: (value: string | number): string | null => {
    if (value === null || value === undefined || value === '') return null;
    if (isNaN(Number(value))) {
      return 'Must be a valid number';
    }
    return null;
  },

  min: (value: number, min: number): string | null => {
    if (value === null || value === undefined) return null;
    if (value < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },

  max: (value: number, max: number): string | null => {
    if (value === null || value === undefined) return null;
    if (value > max) {
      return `Must be at most ${max}`;
    }
    return null;
  },

  range: (value: number, min: number, max: number): string | null => {
    if (value === null || value === undefined) return null;
    if (value < min || value > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  },
};

export type ValidationRule = (value: any) => string | null;

export const validateField = (value: any, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

