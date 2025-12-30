// Tipo Partial estándar de TypeScript
export type CustomPartial<T> = {
  [P in keyof T]?: T[P];
};

// DeepPartial que hace todos los campos recursivamente opcionales
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};