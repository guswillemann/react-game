export default function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
