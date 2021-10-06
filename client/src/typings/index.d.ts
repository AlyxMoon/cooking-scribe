
export type DataModelUser = {
  id: string,
  idGroup: string,
  username: string,
  email: string,
  password?: string,
  createdAt: string,
  updatedAt: string,
}

export type DataModelGroup = {
  id: string,
  name: string,
  users?: DataModelUser[],
  createdAt: string,
  updatedAt: string,
}