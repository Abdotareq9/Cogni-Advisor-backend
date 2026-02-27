export enum UserRole {
  STUDENT = "STUDENT",
  ADVISOR = "ADVISOR",
  ADMIN = "ADMIN",
}


// export interface RegisterInput {
//   firstName: string;
//   middleName: string;   
//   lastName: string;
//   email: string;
//   password: string;
//   role: UserRole;
//   nationalId: string;
// }


export interface LoginInput {
  identifier: string;
  password: string;
  role: UserRole;
}