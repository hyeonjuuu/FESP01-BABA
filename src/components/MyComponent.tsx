import { useAuthStore } from '@/store/useAuthStore'

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuthStore()

  // 로그인 여부에 따라 다른 UI를 렌더링
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.username}!</p>
          <button onClick={logout}>Log Out</button>
        </>
      ) : (
        <button
          onClick={() =>
            login({
              email: 'example@example.com',
              username: 'example',
              nickname: 'Nickname',
              password: 'password'
            })
          }
        >
          Log In
        </button>
      )}
    </div>
  )
}

export default MyComponent
