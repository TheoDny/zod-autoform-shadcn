import { AutoForm } from "@/components/ui/autoForm"
import { useState } from "react"
import { FormFieldConfig } from "@/type/formConfig.type.ts"
import usePersonSchema from "@/zod/person.schema.ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"

type PersonFormProps = {
    startValues?: any
}

export const PersonForm = ({ startValues }: PersonFormProps) => {
    const [values, setValues] = useState(startValues)
    const personFormSchema = usePersonSchema()
    const handleSubmit = (newValues: any) => {
        console.log(newValues)
        setValues(newValues)
    }
    const personFieldConfig: FormFieldConfig = [
        {
            name: "firstname",
            fieldType: "text",
        },
        {
            name: "lastname",
            fieldType: "text",
        },
        {
            name: "birthday",
            fieldType: "date",
        },
        {
            name: "gender",
            fieldType: "radio",
        },
        {
            name: "email",
            fieldType: "email",
        },
        {
            name: "children",
            fieldType: "add",
            subObject: [
                {
                    name: "firstname",
                    fieldType: "text",
                },
                {
                    name: "lastname",
                    fieldType: "text",
                },
                {
                    name: "age",
                    fieldType: "number",
                },
            ],
        },
        {
            name: "luckyNumber",
            fieldType: "number",
        },
        {
            name: "favoriteColor",
            fieldType: "select-one",
        },
        {
            name: "quality",
            fieldType: "select-multiple",
        },
        {
            name: "sport",
            fieldType: "radio-banner",
        },
        {
            name: "position",
            fieldType: "text",
        },
        {
            name: "rank",
            fieldType: "number",
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>PersonForm</CardTitle>
                <CardDescription>
                    Generate a form for the schema PersonForm and a bit of config file
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AutoForm
                    schema={personFormSchema}
                    values={values}
                    onValuesChange={setValues}
                    fieldConfig={personFieldConfig}
                    onSubmit={handleSubmit}
                ></AutoForm>
            </CardContent>
        </Card>
    )
}
