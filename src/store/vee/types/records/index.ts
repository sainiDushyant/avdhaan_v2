export type BaseObj = {   name: string; description: string; id: string; };
export type BaseObjWithoutId = Omit<BaseObj, "id">;