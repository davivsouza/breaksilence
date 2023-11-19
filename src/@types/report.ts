export type Report = {
    id: number,
    description: string | null,
    status: 'ON WAY' | 'SOLVED!'
    type: 'abuso' | 'assédio' | null
    date: string
}