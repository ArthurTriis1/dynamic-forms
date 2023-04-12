"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import RenderForms, { Form, FormEnum, formsSchema } from '@src/components/RenderForms'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {

  const methods = useForm<Form>({
    resolver: zodResolver(formsSchema)
  });

  const { control, register, handleSubmit } = methods

  const { fields, append } = useFieldArray({
    control,
    name: "forms"
  });

  const onSubmit = (data: Form) => console.log("data", data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-24">
        {
          fields.map((form, index) => (
            <RenderForms 
              key={form.id}
              form={form.type}
              index={index}
            />
          ))
        }
        <input type="submit" />
      </form>
      <button onClick={() => append({ type: "FormAnimal", patas: 0, som: "", voa: true})}>Adicionar Animal</button>
      <button onClick={() => append({ type: "FormCarro", aro: 17, marca: ""})}>Adicionar Carro</button>
    </FormProvider>
  )
}
