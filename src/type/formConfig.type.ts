export type FormFieldConfig = {
    name: string
    fieldType: FieldType
    defaultValue?: string | number | boolean | Date | string[]
    prefix?: string
    suffix?: string
    subObject?: FormFieldConfig
}[]

export type FieldType =
    | "text"
    | "textarea"
    | "checkbox"
    | "radio"
    | "date"
    | "datetime"
    | "number"
    | "password"
    | "email"
    | "tel"
    | "select-multiple"
    | "select-one"
    | "combobox-one"
    | "combobox-multiple"
    | "add"
    | "radio-banner"
