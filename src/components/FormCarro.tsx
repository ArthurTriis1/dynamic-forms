import { z } from "zod";
import { Form, Register } from "./RenderForms";
import { FieldErrors, useFormContext } from "react-hook-form";


export const carroSchema = z.object({
    type: z.literal("FormCarro"),
    aro: z.coerce.number().min(17),
    marca: z.string().nonempty(),
});

export type Carro = z.infer<typeof carroSchema>

type FormCarroProps = {
    index: number
}

const FormCarro = ({ index }: FormCarroProps) => {
    const { register, formState: { errors } } = useFormContext<Form>()

    const formErrors: FieldErrors<{forms: Carro[]}> = errors

    return (
        <>
            <p>Aro</p>
            <input type="number" placeholder="Aro" {...register(`forms.${index}.aro`)} />
            <p>{formErrors.forms?.[index]?.aro?.message}</p>
            <p>Marca</p>
            <input type="text" placeholder="Marca" {...register(`forms.${index}.marca`)} />
            <p>{formErrors.forms?.[index]?.marca?.message}</p>

        </>
    )
}

export default FormCarro