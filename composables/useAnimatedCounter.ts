export function useAnimatedCounter(target: number, durationMs = 1000) {
    const current = ref(0)

    if (process.client) {
        const startTime = performance.now()
        const endTime = startTime + durationMs

        const animate = (now: number) => {
            const progress = Math.min((now - startTime) / durationMs, 1)
            current.value = Math.round(progress * target)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                current.value = target
            }
        }

        requestAnimationFrame(animate)
    }

    return current
}
