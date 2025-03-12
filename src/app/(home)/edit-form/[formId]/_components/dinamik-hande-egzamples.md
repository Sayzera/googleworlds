// FormUi.jsx
// ...

{
    "formEvents": [
      { "name": "submit", "description": "Form gönderildiğinde tetiklenir." },
      { "name": "reset", "description": "Form sıfırlandığında tetiklenir." }
    ],
    "inputEvents": [
      { "name": "change", "description": "Elemanın değeri değiştiğinde tetiklenir." },
      { "name": "input", "description": "Kullanıcı veri girdiğinde tetiklenir." },
      { "name": "focus", "description": "Eleman odaklandığında tetiklenir." },
      { "name": "blur", "description": "Eleman odağı kaybettiğinde tetiklenir." },
      { "name": "select", "description": "Metin seçildiğinde tetiklenir." },
      { "name": "keydown", "description": "Tuşa basıldığında tetiklenir." },
      { "name": "keyup", "description": "Tuş bırakıldığında tetiklenir." },
      { "name": "keypress", "description": "Tuşa basılıp bırakıldığında tetiklenir." },
      { "name": "click", "description": "Elemana tıklandığında tetiklenir." },
      { "name": "dblclick", "description": "Elemana çift tıklandığında tetiklenir." },
      { "name": "mouseover", "description": "Fare imleci üzerine geldiğinde tetiklenir." },
      { "name": "mouseout", "description": "Fare imleci ayrıldığında tetiklenir." },
      { "name": "mousemove", "description": "Fare imleci hareket ettiğinde tetiklenir." },
      { "name": "mousedown", "description": "Fare düğmesine basıldığında tetiklenir." },
      { "name": "mouseup", "description": "Fare düğmesi bırakıldığında tetiklenir." }
    ],
    "otherEvents": [
      { "name": "load", "description": "Sayfa veya eleman yüklendiğinde tetiklenir." },
      { "name": "unload", "description": "Sayfa veya eleman boşaltıldığında tetiklenir." },
      { "name": "resize", "description": "Pencere veya eleman yeniden boyutlandırıldığında tetiklenir." },
      { "name": "scroll", "description": "Sayfa veya eleman kaydırıldığında tetiklenir." }
    ],
    "html5Events": [
      { "name": "invalid", "description": "Doğrulama koşullarını karşılamadığında tetiklenir." },
      { "name": "search", "description": "Arama yapıldığında tetiklenir." }
    ]
  }

function FormUi({ jsonForm, onFieldUpdate, eventData }: Props) {
    // ...
  
    return (
      <div className="border p-5 md:w-[600px]">
        {/* ... */}
        <div className="flex flex-col gap-4">
          {jsonForm?.jsonForm?.formFields?.map((field: any, index: number) => {
            if (
              // ... input türleri
            ) {
              const fieldEvents = field.events || {}; // field.events yoksa boş nesne
  
              return (
                <div key={index} className="flex flex-col gap-2 relative">
                  <label className="text-xs text-gray-500">{field.label}</label>
                  <Input
                    key={index}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={(e) => fieldEvents.change && handleEvent(e, field, index)}
                    onBlur={(e) => fieldEvents.blur && handleEvent(e, field, index)}
                    onFocus={(e) => fieldEvents.focus && handleEvent(e, field, index)}
                    onInput={(e) => fieldEvents.input && handleEvent(e, field, index)}
                    onClick={(e) => fieldEvents.click && handleEvent(e, field, index)}
                    // ... diğer olay işleyicileri
                  />
                  {/* ... */}
                </div>
              );
            } else if (field.type === "select") {
              const fieldEvents = field.events || {};
              return (
                <div key={index} className="flex flex-col gap-2 relative">
                  <label className="text-xs text-gray-500">{field.label}</label>
                  <Select onValueChange={(value) => fieldEvents.change && handleEvent({ target: { name: field.name, value: value }, type: 'change' }, field, index)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option: any, optionIndex: number) => (
                        <SelectItem key={optionIndex} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* ... */}
                </div>
              );
            }
            // ... diğer alan türleri
          })}
        </div>
      </div>
    );
  }
  
  export default FormUi;