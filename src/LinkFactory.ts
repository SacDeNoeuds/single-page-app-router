import { PathParameters } from "./path-parameters"
import { If } from "./types"

type IsEmpty<T> = {} extends T ? true : false
type Args<Params> = If<IsEmpty<Params>, [], [params: Params]>

export type LinkTo<Path extends string> = (...args: Args<PathParameters<Path>>) => string

export function LinkTo<Path extends string>(path: Path) {
  return (...[params]: Args<PathParameters<Path>>) => {
    let revived: string = path.replace(new RegExp("{.+}?", "g"), "")
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (!value) return
      revived = revived.replace(new RegExp(`:${key}`, "g"), value)
    })
    return revived
  }
}
