import { z } from "zod";
import { Register } from "./RenderForms";
import { FieldErrors, useFormContext } from "react-hook-form";


export const animalSchema = z.object({
    type: z.literal("FormAnimal"),
    patas: z.string().transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not a number",
          });
          return z.NEVER;
        }
        return parsed;
      }),
    som: z.string().nonempty(),
    voa: z.boolean()
});

export type Animal = z.infer<typeof animalSchema>

type FormAnimalProps = {
    index: number
}

const FormAnimal = ({ index }: FormAnimalProps) => {
    const { register, formState: { errors } } = useFormContext()

    const formErrors: FieldErrors<{ forms: Animal[] }> = errors

    return (
        <>
            <p>Patas</p>
            <input type="number" placeholder="Patas" {...register(`forms.${index}.patas`)}  />
            <p>{formErrors.forms?.[index]?.patas?.message}</p>
            <p>Som</p>
            <input type="text" placeholder="Som" {...register(`forms.${index}.som`)}  />
            <p>{formErrors.forms?.[index]?.som?.message}</p>
            <p>Voa</p>
            <input type ="checkbox" {...register(`forms.${index}.voa`)}></input>
            <p>{formErrors.forms?.[index]?.voa?.message}</p>
        </>
    )
}

export default FormAnimal