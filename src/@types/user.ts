import { Report } from "./report"

export interface Location {
    subregion: string,
    country: string,
    street: string,
    district: string,
    streetNumber: string,
    region:string
}
export interface User {
    name: string
    password: string
    cpf: string
    isLogged: boolean
    tel?: string
    hasAlreadySeenTheIntroduction: boolean
    reports: Report[] | []
    location: Location
}