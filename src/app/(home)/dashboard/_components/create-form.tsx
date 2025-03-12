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

  const PROMPT = `,"
"Bana belirttiğim alanlar doğrultusunda JSON formatında bir form yapısı oluştur. Form şu kurallara uygun olmalı:

Her alan için 'type', 'name', 'label' ve gerekirse 'placeholder' içermeli.
Eğer alan bir seçenek içeriyorsa, 'options' dizisi içinde 'value' ve 'label' olacak şekilde tanımlanmalı.
Zorunlu alanlar için 'required' özelliği kullanılmalı.
Placeholder ekle.
Çıktıyı sadece JSON formatında üret, ek açıklamalar ekleme."
Tipi select olanlarada placeholder ekle.


Örnek olarak aşağıdaki form yapısını kullanabilirsin:
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
      "placeholder": "Lütfen konu seçin",
      "options": [
        { "value": "destek", "label": "Destek" },
        { "value": "bilgi", "label": "Bilgi Almak İstiyorum" },
        { "value": "sikayet", "label": "Şikayet" }
      ]
    }
    // radio
    {
      "type": "radio",
      "name": "cinsiyet",
      "label": "Cinsiyetiniz",
      "options": [
        { "value": "erkek", "label": "Erkek" },
        { "value": "kadin", "label": "Kadın" }
      ]
    }
    // checkbox
    {
      "type": "checkbox",
      "name": "hizmetler",
      "label": "Hangi hizmetlerden faydalanmak istersiniz?",
      "options": [
        { "value": "web-tasarim", "label": "Web Tasarım" },
        { "value": "seo", "label": "SEO" },
        { "value": "sosyal-medya-yonetimi", "label": "Sosyal Medya Yönetimi" }
      ]
    }

  ]
}
  `;

  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      `Description: ${userInput}\n\n${PROMPT}\n\nDönen yanıt **sadece geçerli bir JSON olmalıdır**. Açıklama veya metin içermemelidir.`
    );

    setLoading(false);

    const response = result?.response?.text()?.match(/\{[\s\S]*\}/)?.[0];

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
