"use client"

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/features/userSlice'
import Cookies from 'js-cookie'

export function AuthInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get('token')
    const userStr = Cookies.get('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        dispatch(setUser({ user, token }))
      } catch (error) {
        console.error('Error parsing user data from cookie:', error)
      }
    }
  }, [dispatch])

  return null
} 