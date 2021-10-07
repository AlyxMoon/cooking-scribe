
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

export type DataModelGroupChat = {
  id: string,
  idUser: string,
  idGroup: string,
  message: string,
  user?: DataModelUser,
  createdAt: string,
  updatedAt: string,
}
