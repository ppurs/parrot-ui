import { CurrentLanguages } from "./current-languages";
import { Language } from "./language";

export interface NavbarData {
    username: string,
    //accountType: string,
    currentLanguages?: CurrentLanguages,
    languages?: Language[]
  }