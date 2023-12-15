type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void

function debounce<T extends (...args: any[]) => any>(
  callback: T,
  timeout = 300
): DebouncedFunction<T> {
  let cleanup: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(cleanup)
    cleanup = setTimeout(() => callback(...args), timeout)
  }
}

export default debounce

// <T extends (...args: any[]) => any>: 이 부분은 T라는 타입 변수를 정의하고, 이 타입 변수는 함수((...args: any[]) => any)를 확장(extends)합니다. 즉, T는 어떤 함수 형태일 수 있는지를 나타냅니다.

// DebouncedFunction<T>: 이 부분은 DebouncedFunction이라는 새로운 타입을 정의합니다. 이 타입은 T라는 함수 타입을 기반으로 하며, 매개변수는 Parameters<T>로 설정합니다. 이는 T 함수의 매개변수 타입을 그대로 따르는 것을 의미합니다.

// (...args: Parameters<T>) => void;: 실제로 디바운스된 함수의 타입을 정의합니다. 이 함수는 T의 매개변수 타입을 그대로 받아들이고, 반환 타입은 void로 설정합니다. 여기서 Parameters<T>는 T 함수의 매개변수 타입들을 나타냅니다.

// 이렇게 함으로써 DebouncedFunction 타입은 어떤 함수 형태이든 그 함수의 매개변수를 그대로 받아들이고 반환값이 없는 디바운스된 함수를 나타내게 됩니다.
