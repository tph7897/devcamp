import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { Control, FieldValues, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  control: Control<
    {
      username: string;
      role: string;
      email: string;
      password: string;
      phone: string;
      confirmPassword: string;
    },
    any
  >;
  name: "username" | "role" | "email" | "password" | "phone" | "confirmPassword";
  label: string;
  placeholder?: string;
  type?: string;
}

const FormComponents: React.FC<FormFieldProps> = ({ control, name, label, placeholder, type }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {name === "role" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="placeholder" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="admin">관리자</SelectItem>
                <SelectItem value="user">일반사용자</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormComponents;
