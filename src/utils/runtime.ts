export const runtime = (time: number | undefined) => {
  // 예시로 주어진 runtime 값

  const hours = Math.floor((time as number) / 60)
  const minutes = (time as number) % 60

  return `${hours}시간 ${minutes}분`
}
