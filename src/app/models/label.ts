import { LabelProperties } from "./label-properties";

export interface Label extends LabelProperties {
	parentLabels?: LabelProperties[],
	directParentLabelId?: number,
}

