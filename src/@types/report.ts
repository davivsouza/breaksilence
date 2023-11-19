export type Report = {
    id: number,
    description: string | null,
    status: 'ON WAY' | 'SOLVED!'
    createdAt: Date
    type: 'abuso' | 'assédio' | null
    date: string
}