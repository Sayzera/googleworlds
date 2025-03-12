function FormUi({ jsonForm }: Props) {
    const form = jsonForm?.jsonForm;
  
    const [selectOptions, setSelectOptions] = useState<any>({});
    const [loading, setLoading] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [selectedValues, setSelectedValues] = useState<any>({});
  
    const fetchData = (url: string, fieldName: string) => {
      setLoading((prevLoading: any) => ({ ...prevLoading, [fieldName]: true }));
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectOptions((prevOptions: any) => ({
            ...prevOptions,
            [fieldName]: data,
          }));
          setLoading((prevLoading: any) => ({ ...prevLoading, [fieldName]: false }));
        })
        .catch((error) => {
          setErrors((prevErrors: any) => ({ ...prevErrors, [fieldName]: error }));
          setLoading((prevLoading: any) => ({ ...prevLoading, [fieldName]: false }));
        });
    };
  
    useEffect(() => {
      form?.formFields?.forEach((field: any) => {
        if (field.type === "select" && field.optionsUrl && !field.dependsOn) {
          fetchData(field.optionsUrl, field.name);
        }
      });
    }, [form?.formFields]);
  
    useEffect(() => {
      form?.formFields?.forEach((field: any) => {
        if (field.type === "select" && field.optionsUrl && field.dependsOn) {
          const parentValue = selectedValues[field.dependsOn];
          if (parentValue) {
            const url = field.optionsUrl.replace(
              `{${field.dependsOn}Id}`,
              parentValue
            );
            fetchData(url, field.name);
          }
        }
      });
    }, [selectedValues, form?.formFields]);
  
    const handleSelectChange = (fieldName: string, value: string) => {
      setSelectedValues({ ...selectedValues, [fieldName]: value });
    };
  
    return (
      <div className="border p-5 md:w-[600px]">
        {/* ... (diğer form alanları) ... */}
        {form?.formFields?.map((field: any, index: number) => {
          if (field.type === "select") {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">{field.label}</label>
                {loading[field.name] ? (
                  <div>Yükleniyor...</div>
                ) : errors[field.name] ? (
                  <div>Hata oluştu.</div>
                ) : (
                  <Select
                    onValueChange={(value) => handleSelectChange(field.name, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions[field.name]?.map((option: any, index: number) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          }
          // ... (diğer form alanları) ...
        })}
      </div>
    );
  }
  
  export default FormUi;