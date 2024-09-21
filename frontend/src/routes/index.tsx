import { createFileRoute, redirect } from '@tanstack/react-router'
import useUser from '../hooks/useUser'

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async ({ location }) => {
    console.log('jwt', document.cookie, document.cookie.includes('jwt='))
    if (!document.cookie.includes('jwt=')) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})

function Index() {
  const userData = useUser()

  return (
    <div className="p-2">
      <p>
        {userData ? `Welcome home, ${userData.username}!` : 'Welcome!'}
      </p>
    </div>
  )
}
