import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"

type FieldProps = {
    name: string
    label: string
    type: string
}
export const Field = ({ name, label, type }: FieldProps) => {
    const labelElement = <Label htmlFor={name}>{label}</Label>
    let inputElement
    switch (type) {
        case "number":
        case "text":
            return (
                <div>
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                        type={type}
                        id={name}
                        name={name}
                    />
                </div>
            )
        default:
            inputElement = <h3>Type "{type}" not implemented</h3>
    }

    return (
        <>
            {labelElement}
            {inputElement}
        </>
    )
}
