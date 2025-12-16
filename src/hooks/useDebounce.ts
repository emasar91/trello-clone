import { useEffect, useState } from 'react'

/**
 * Hook that wraps the setTimout function in order to debounce the given value.
 * It returns the debounced value.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds. Defaults to 300.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const id = setTimeout(() => setDebouncedValue(value), delay)
		return () => clearTimeout(id)
	}, [value, delay])

	return debouncedValue
}
