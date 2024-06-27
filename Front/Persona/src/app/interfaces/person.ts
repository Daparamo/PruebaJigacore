export interface Person {
  id?: number,
  name: string,
  surname: string,
  email: string,
  birthDate: Date,
  gender: Gender,
  img?: string
}
export enum Gender {
  Masculino = 0,
  Feminino = 1,
  Otro = 3
}