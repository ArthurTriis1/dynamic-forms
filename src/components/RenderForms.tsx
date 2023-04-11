import { UseFormRegister } from "react-hook-form";
import FormAnimal, { animalSchema } from "./FormAnimal";
import FormCarro, { carroSchema } from "./FormCarro";
import { z } from "zod"

export const formsSchema = z.object({
    forms: z.array(z.discriminatedUnion("type", [
        carroSchema,
        animalSchema
    ]))
})

export type Form = z.infer<typeof formsSchema>

const forms = {
    FormAnimal,
    FormCarro
}

export type FormEnum = keyof typeof forms

export type Register = UseFormRegister<Form>

type RenderFormsTypes = {
    form: FormEnum
    index: number
}

const RenderForms = ({ form, ...otherProps } : RenderFormsTypes) => {
    const Component = forms[form]
    return <Component {...otherProps}/>
}

export default RenderForms