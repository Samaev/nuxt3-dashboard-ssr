import { describe, it, expect } from 'vitest'
import { useInitials } from '../../composables/useInitials'

describe('useInitials', () => {
    it('returns 01 for undefined input', () => {
        expect(useInitials()).toBe('01')
    })

    it('returns first letter uppercased for single word', () => {
        expect(useInitials('andrey')).toBe('A')
    })

    it('returns initials for two words', () => {
        expect(useInitials('andrey samaev')).toBe('AS')
    })

    it('ignores extra whitespace', () => {
        expect(useInitials('   anna   maria   ')).toBe('AM')
    })
})
