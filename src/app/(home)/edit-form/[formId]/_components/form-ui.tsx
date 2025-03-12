import { Input } from "@/components/ui/input";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./field-edit";

type Props = {
  jsonForm: Record<string, any>;
  onFieldUpdate: (value: any, index: number) => void;
  onDelete: (id: number) => void;
  selectedTheme: string;
};

function FormUi({ jsonForm, onFieldUpdate, onDelete, selectedTheme }: Props) {
  const form = jsonForm?.jsonForm;

  return (
    <div className="border p-5 md:w-[600px]" data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-xl">{form?.formName}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {form?.formDescription}
      </h2>

      <div className="flex flex-col gap-4">
        {jsonForm?.jsonForm?.formFields?.map((field: any, index: number) => {
          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ||
            field.type === "number" ||
            field.type === "tel" ||
            field.type === "url" ||
            field.type === "date" ||
            field.type === "time" ||
            field.type === "datetime-local" ||
            field.type === "month" ||
            field.type === "week" ||
            field.type === "search" ||
            field.type === "color" ||
            field.type === "file" ||
            field.type === "hidden" ||
            field.type === "range" ||
            field.type === "submit" ||
            field.type === "reset" ||
            field.type === "button" ||
            field.type === "image" ||
            field.type === "textarea"
          ) {
            return (
              <div key={index} className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-500">{field.label}</label>
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
                <div
                  className="
                 absolute top-8 right-2 flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all
                "
                >
                  <FieldEdit
                    field={field}
                    onUpdate={(value) => {
                      onFieldUpdate(value, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
              </div>
            );
          } else if (field.type == "select") {
            return (
              <div key={index} className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-500">{field.label}</label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option: any, index: number) => {
                      return (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <div
                  className="
                 absolute top-8 right-8 flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all
                "
                >
                  <FieldEdit
                    field={field}
                    onUpdate={(value) => {
                      onFieldUpdate(value, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
              </div>
            );
          } else if (field.type == "radio") {
            return (
              <div key={index} className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-500">{field.label}</label>

                <RadioGroup>
                  {field.options.map((option: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-x-2">
                        <RadioGroupItem
                          key={index}
                          value={option.value}
                          id={field.name + index}
                        >
                          {option.label}
                        </RadioGroupItem>
                        <label
                          className="text-xs text-gray-500"
                          htmlFor={field.name + index}
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <div
                  className="
                 absolute top-0 right-2 flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all
                "
                >
                  <FieldEdit
                    field={field}
                    onUpdate={(value) => {
                      onFieldUpdate(value, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
              </div>
            );
          } else if (field.type == "checkbox") {
            return (
              <div key={index} className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-500">{field.label}</label>

                <RadioGroup>
                  {field.options.map((option: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-x-2">
                        <Checkbox
                          key={index}
                          value={option.value}
                          id={field.name + index}
                        />
                        <label
                          className="text-xs text-gray-500"
                          htmlFor={field.name + index}
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
                <div
                  className="
                 absolute top-0 right-2 flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all
                "
                >
                  <FieldEdit
                    field={field}
                    onUpdate={(value) => {
                      onFieldUpdate(value, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
              </div>
            );
          }
        })}

        <button className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default FormUi;
