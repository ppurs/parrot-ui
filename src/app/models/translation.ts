import { LabelProperties } from "./label-properties"

export interface Translation {
	translationId?: number,
	wordFrom: string
	wordTo: string
	description?: string
	wordTypeId: number
	wordType?: string
	labels?: LabelProperties[]
}