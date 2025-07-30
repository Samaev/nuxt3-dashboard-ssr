export function useInitials(name?: string): string {
    if (!name) return '01'

    const safeName : string = name.trim()
    const words : string[]  = safeName.split(/\s+/)

    if (!/\s/.test(safeName)) {
        return safeName.charAt(0).toUpperCase()
    }

    const first = words[0]?.charAt(0).toUpperCase() ?? ''
    const second = words[1]?.charAt(0).toUpperCase() ?? ''

    return first + second
}