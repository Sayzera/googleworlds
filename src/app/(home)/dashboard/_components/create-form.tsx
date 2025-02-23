"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/lib/ai-model";
import { useUser } from "@clerk/clerk-react";
import { useCustomActionMutation } from "@/redux/api";
import { createJsonForm } from "@/actions/ai";
import { Loader } from "lucide-react";

export const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [createJsonFormMutation, { isLoading, isSuccess, isError, error }] =
    useCustomActionMutation();
  const { user } = useUser();

  const PROMPT = `,"Merhaba Yapay Zeka,

Senden bana belirli bir veri yapısına sahip, JSON formatında bir çıktı oluşturmanı istiyorum. Bu çıktı, bir form tanımını temsil edecek ve aşağıdaki özelliklere sahip olacak:

Amaç: Bir formun yapısını tanımlayan, makine tarafından okunabilir bir JSON nesnesi oluşturmak.

Beklenen Yapı:

Kök Düzey:

formName: Formun adını temsil eden bir metin dizesi (string). Örneğin: "Müşteri Kayıt Formu".

formDescription: Formun amacını kısaca açıklayan bir metin dizesi (string). Örneğin: "Yeni müşterilerin sisteme kaydolmasını sağlar."

formFields: Formdaki alanların tanımlarını içeren bir dizi (array) nesnesi. Her nesne bir alanı temsil eder.

formFields Dizisindeki Her Bir Alan Nesnesi:

type: Alanın türünü belirten bir metin dizesi (string). Olası değerler şunlardır:

text: Tek satırlık metin girişi.

email: E-posta adresi girişi (doğrulama içerebilir).

textarea: Çok satırlık metin girişi.

select: Açılır liste (seçim kutusu).

checkbox: Onay kutusu.

radio: Radyo düğmeleri (tek seçim).

number: Sayısal giriş.

date: Tarih girişi.

file: Dosya yükleme alanı.

password: Şifre girişi (gizli).

name: Alanın benzersiz adını (kimliğini) temsil eden bir metin dizesi (string). Bu ad, sunucu tarafında veriyi almak için kullanılacak. Örneğin: "adSoyad", "emailAdresi", "mesaj".

label: Alanın kullanıcı arayüzünde (UI) görüntülenecek, kullanıcı dostu etiketini temsil eden bir metin dizesi (string). Örneğin: "Adınız ve Soyadınız", "E-posta Adresiniz", "Mesajınız".

placeholder (isteğe bağlı): Alan boşken içinde görüntülenecek ipucu metnini temsil eden bir metin dizesi (string). Örneğin: "Adınızı girin", "ornek@eposta.com".

options (yalnızca select ve radio türleri için gereklidir): Her biri value (değeri temsil eden metin dizesi) ve label (görüntülenen metni temsil eden metin dizesi) özelliklerini içeren seçeneklerin bir dizisi (array).

value (isteğe bağlı): Alanın varsayılan değerini temsil eden bir metin dizesi (string).

required (isteğe bağlı): Alanın doldurulmasının zorunlu olup olmadığını belirten bir boolean değeri (true veya false).

pattern (isteğe bağlı): Alanın değerini doğrulamak için kullanılacak bir düzenli ifadeyi (regex) temsil eden bir metin dizesi (string).

Önemli:

Çıktın kesinlikle geçerli bir JSON nesnesi olmalı. String formatında bir JSON dizesi istemiyorum; direkt olarak JSON'u temsil eden bir veri yapısı istiyorum.

Lütfen her alan için en az type, name ve label özelliklerini ekleyin.

options özelliğini yalnızca select ve radio alanları için kullanın.

İsteğe bağlı özellikleri gerektiğinde kullanın.

Örnek: (Bu sadece bir örnek, tam olarak aynısını üretmek zorunda değilsin!)

{
  "formName": "İletişim Formu",
  "formDescription": "Kullanıcıların iletişime geçmesini sağlayan form",
  "formFields": [
    {
      "type": "text",
      "name": "adSoyad",
      "label": "Adınız ve Soyadınız",
      "placeholder": "Lütfen adınızı ve soyadınızı girin"
    },
    {
      "type": "email",
      "name": "email",
      "label": "E-posta Adresiniz",
      "required": true
    },
    {
      "type": "textarea",
      "name": "mesaj",
      "label": "Mesajınız",
      "placeholder": "Lütfen mesajınızı buraya yazın"
    },
    {
      "type": "select",
      "name": "konu",
      "label": "Konu",
      "options": [
        { "value": "destek", "label": "Destek" },
        { "value": "bilgi", "label": "Bilgi Almak İstiyorum" },
        { "value": "sikayet", "label": "Şikayet" }
      ]
    }
  ]
}
  `;

  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      `Description: ${userInput}\n\n${PROMPT}`
    );

    console.log(result?.response?.text());

    setLoading(false);

    const response = result?.response
      ?.text()
      .replaceAll("```json", "")
      .replaceAll("```", "")
      .trim();

    if (response) {
      try {
        const parsedResponse = JSON.parse(response);
        const res = await createJsonFormMutation({
          mutation: createJsonForm,
          mutationArgs: {
            jsonForm: parsedResponse,
          },
        });

        if (res?.data?.success) {
          setOpenDialog(false);
          router.push(`/edit-form/${res?.data?.data.id}`);
        }
      } catch (error) {
        console.log("Error parsing response", error);
      }
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>+ Create Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
          <div className="pt-5">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Write description of your form"
            />
            <div className="flex justify-end gap-1 mt-5">
              <Button
                variant={"destructive"}
                onClick={() => {
                  setOpenDialog(false);
                  setUserInput("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={onCreateForm} disabled={loading}>
                {loading && (
                  <Loader className="size-5 animate-spin text-white" />
                )}
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
