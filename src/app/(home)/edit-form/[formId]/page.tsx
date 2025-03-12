"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Redo, Undo } from "lucide-react";
import { useCustomActionMutation, useCustomGetQuery } from "@/redux/api";
import {
  getFormData,
  updateJsonControllerFields,
  updateJsonFormAction,
} from "@/actions/ai";
import FormUi from "./_components/form-ui";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Controller from "./_components/controller";

function EditForm() {
  const [history, setHistory] = useState<any>([]); // değişiklikleri saklar
  const [currentIndex, setCurrentIndex] = useState<number>(0); // historydeki index

  // get params
  const [jsonForm, setJsonForm] = useState<any>(null);
  const { formId } = useParams();
  const router = useRouter();
  
  
  const { data: formData, isLoading } = useCustomGetQuery({
    mutation: getFormData,
    mutationArgs: { id: formId },
  });


  // Theme
  const [selectedTheme, setSelectedTheme] = useState(
   'light'
  );
  // Background
  const [selectedBackground, setSelectedBackground] = useState(
   ''
  );

  const saveToHistory = (newData: any) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newData);
    // yeni eklenen veriyi set et
    setHistory(newHistory);

    // yeni eklenen verinin indexini set et
    setCurrentIndex(newHistory.length - 1);
  };


  console.log( formData?.data, "formData?.data");



  const [updateJsonForm] = useCustomActionMutation();

  useEffect(() => {
    if (formData?.data) {

      setSelectedBackground(formData.data.background);
      setSelectedTheme(formData.data.theme);

      setJsonForm(formData.data);
    }
  }, [formData]);

  const onFieldUpdate = (
    value: {
      label: string;
      placeholder: string;
    },
    index: number
  ) => {
    // deep clone the form data
    const newFormData: any = structuredClone(formData);
    const field = newFormData.data.jsonForm.formFields[index];
    const formId = newFormData.data.id;

    if (
      formData?.data?.jsonForm?.formFields &&
      formData.data.jsonForm.formFields[index]
    ) {
      field.label = value.label;
      field.placeholder = value.placeholder;
    }

    saveToHistory(newFormData.data);
    setJsonForm(newFormData.data);

    updateJsonForm({
      mutation: updateJsonFormAction,
      mutationArgs: {
        jsonForm: newFormData.data.jsonForm,
        id: formId,
      },
    }).then((res: any) => {
      toast("Updated!");
    });
  };

  const onDelete = (index: number) => {
    console.log(index, "index");

    const newFormData: any = structuredClone(jsonForm);
    const formId = newFormData.id;
    const fields = newFormData.jsonForm.formFields?.filter(
      (field: any, i: number) => i !== index
    );

    newFormData.jsonForm.formFields = fields;

    saveToHistory(newFormData);
    setJsonForm(newFormData);

    updateJsonForm({
      mutation: updateJsonFormAction,
      mutationArgs: {
        jsonForm: newFormData.jsonForm,
        id: formId,
      },
    }).then((res: any) => {
      toast("Updated!");
    });
  };

  const updateControllerFields = (value: string, columnName: string) => {
    const newFormData: any = structuredClone(formData);
    const formId = newFormData.data.id;
    let field = newFormData.data[columnName];
    field = value;

    updateJsonForm({
      mutation: updateJsonControllerFields,
      mutationArgs: {
        fields: {
          [columnName]: value,
        },
        id: formId,
      },
    }).then((res: any) => {
      toast("Updated!");
    });
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setJsonForm(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setJsonForm(history[currentIndex + 1]);
    }
  };

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded shadow-md">
          <Controller
            setSelectedTheme={(value) => {
              setSelectedTheme(value);
              updateControllerFields(value, "theme");
            }}
            setSelectedBackground={(value) => {
              setSelectedBackground(value);
              updateControllerFields(value, "background");
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-4 flex items-center justify-center relative"
          style={{ background: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            onDelete={onDelete}
            selectedTheme={selectedTheme}
          />

          <div className="absolute top-0 right-0 flex gap-2 p-5">
            <button
              data-theme={selectedTheme}
              className="btn btn-primary"
              onClick={() => undo()}
              disabled={currentIndex === 0}
            >
              <Undo />
            </button>
            <button
              data-theme={selectedTheme}
              className="btn btn-primary"
              onClick={() => redo()}
              disabled={currentIndex === history.length - 1}
            >
              <Redo />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
