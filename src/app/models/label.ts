import { LabelProperties } from "./label-properties";

export interface Label {
    properties: LabelProperties, 
	usageCount: number,
	parentLabels: LabelProperties[]
}

