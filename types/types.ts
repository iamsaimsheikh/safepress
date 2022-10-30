import { EClassification, EFindingLocationType, EFindingStatus } from "./audit.enum"

export type Auditor = {
    first_name: string,
    last_name: string
}

export type CommitHash = {
    label:string,
    value: string
}

export type Finding = {
    title: string,
    description: string,
    recommendation: string,
    classification: EClassification,
    status: EFindingStatus,
    location: {
      type: EFindingLocationType,
      name: string,
      line_number: {
        start: number,
        end:number
      }
    }
  }