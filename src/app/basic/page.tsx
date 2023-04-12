"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@src/components/FormControlled"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    examples: z.array(z.object({ item: z.string().nonempty()})).nonempty(),
    controlled: z.string().nonempty().default("")
})

export type Schema = z.infer<typeof schema>

const Form = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<Schema>({
        resolver: zodResolver(schema)
    })

    const { fields, append } = useFieldArray({ 
        control, 
        name: "examples" 
    })

    const onSubmit = (data: Schema) => console.log(data)



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                fields.map((field, index) => {
                    const reg = register(`examples.${index}.item`)
                    return (
                    <div key={field.id}>
                        <label htmlFor="example">{`Example ${index}`}</label>
                        <input type="text" {...register(`examples.${index}.item`)}  />
                        <p>{errors.examples?.[index]?.item?.message}</p>
                    </div>
                )})
            }
            <Input control={control} name="controlled" />
            <button onClick={() => append({ item: ""})}>Add</button>
            <input type="submit" />
        </form>
    )
}

export default Form