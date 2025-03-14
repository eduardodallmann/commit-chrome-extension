import { Label, TextInput } from 'flowbite-react';

export function Input({
  name,
  label,
  type = 'text',
  value,
  onChange,
}: {
  name: string;
  label: string;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <TextInput
        id={name}
        type={type}
        required
        autoComplete="off"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
