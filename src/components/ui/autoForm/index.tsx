import { Schema, z } from "zod"
import { Form } from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldConfig } from "@/type/formConfig.type.ts"
import { useTranslation } from "react-i18next"
import { Field } from "@/components/ui/autoForm/field"
import { Button } from "@/components/ui/button.tsx"

export interface AutoFormProps {
    schema: Schema
    values: any
    onValuesChange: (values: any) => void
    onSubmit: (values: any) => any
    fieldConfig: FormFieldConfig
    className?: string
}

export const AutoForm = ({ schema, values, onValuesChange, onSubmit, fieldConfig, className }: AutoFormProps) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        values: values,
    })

    const { t } = useTranslation()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {fieldConfig.map((field) => {
                    return (
                        <Field
                            key={field.name}
                            name={field.name}
                            label={t(field.name)}
                            type={field.fieldType}
                            // zodSchemaField={schema}
                        />
                    )
                })}
                <Button
                    type="submit"
                    onClick={() => {
                        console.log("Submit", values)
                    }}
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}
