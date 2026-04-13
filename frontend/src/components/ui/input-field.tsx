import React from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, type = 'text' }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} type={type} />
    </div>
  );
};

export { InputField };
