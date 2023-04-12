import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    example: z.string().nonempty()
})

type Schema = z.infer<typeof schema>

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: Schema) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="example">Example</label>
            <input type="text" {...register("example")}  />
            <p>{errors.example?.message}</p>
        </form>
    )
}