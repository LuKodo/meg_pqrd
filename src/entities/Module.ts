export interface iModule {
  createdAt?: Date;
  updatedAt?: Date;
  id: number;
  name: string;
  parent: number;
  link: string;
  icon: string;
  order: number;
}

export interface iPermission {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  module: iModule;
}
