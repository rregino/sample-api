export interface Db <Id, SaveType, Type> {
  save(t: SaveType): Type
  update(t: Type): void
  get(id: Id): Type | undefined
  list(): Array<Type>
}

export interface SimpleDb <Id, Type> extends Db <Id, Type, Type> {}
