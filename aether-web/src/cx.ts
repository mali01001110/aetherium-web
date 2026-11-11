/** Join truthy class names. */
export default function cx(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).join(" ")
}
