import { z } from "zod"
import { useTranslation } from "react-i18next"

export const Colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Gray",
    "Black",
    "White",
    "Cyan",
    "Magenta",
] as const

export const Genders = ["Female", "Male", "Other"] as const

export const SportsWithPosition: string[] = ["VolleyBall", "BasketBall"] as const
export const SportsWithRank: string[] = ["Tennis"] as const
// @ts-ignore [string, ...string[]] => string[]
// it should always be a string[] with at least one element
export const Sports: [string, ...string[]] = [...new Set([...SportsWithPosition, ...SportsWithRank])] as const

const usePersonSchema = () => {
    const { t } = useTranslation()

    return z
        .object({
            firstname: z
                .string()
                .min(1, { message: t("validation.firstname_required") })
                .max(100, { message: t("validation.firstname_too_long") }),
            lastname: z.string().min(1, { message: t("validation.lastname_required") }),
            birthdate: z.string().date(),
            gender: z.enum(Genders, {
                errorMap: () => ({ message: t("validation.gender_required") }),
            }),
            email: z.string().email({ message: t("validation.email_invalid") }),
            children: z
                .array(
                    z.object({
                        firstname: z.string().min(1, { message: t("validation.firstname_required") }),
                        lastname: z.string().min(1, { message: t("validation.lastname_required") }),
                        age: z
                            .number()
                            .int()
                            .min(1, { message: t("validation.age_too_low") }),
                    }),
                )
                .min(1, "validation.children_required")
                .optional(),
            luckyNumber: z
                .number()
                .int()
                .min(1, { message: t("validation.luckyNumber_too_low") })
                .max(9, { message: t("validation.luckyNumber_too_hight") }),
            favoriteColor: z.enum(Colors, {
                errorMap: () => ({ message: t("validation.favoriteColor_required") }),
            }),
            quality: z
                .array(z.string().min(1, { message: t("validation.quality_required") }))
                .min(1, t("validation.quality_min_required")),
            sport: z.enum(Sports, {
                errorMap: () => ({ message: t("validation.sport_required") }),
            }),
            position: z.string().optional(),
            rank: z.number().int().optional(),
        })
        .refine(
            (data) => {
                // Validate the presence of `position` if sport requires it
                if (SportsWithPosition.includes(data.sport) && !data.position) {
                    return { valid: false, path: ["position"], message: t("validation.position_required") }
                }
                // Validate the presence of `rank` if sport requires it
                if (SportsWithRank.includes(data.sport) && !data.rank) {
                    return { valid: false, path: ["rank"], message: t("validation.rank_required") }
                }
                return { valid: true }
            },
            {
                message: "Validation Failed",
                path: [],
            },
        )
}

export default usePersonSchema
