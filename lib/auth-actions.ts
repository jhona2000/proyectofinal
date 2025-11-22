'use client'

import { simpleAuth } from "./simple-auth"

export async function registerUser(
  email: string,
  password: string,
  name: string,
  phone: string,
  role: "admin" | "client" = "client"
) {
  try {
    const result = simpleAuth.register(email, password, name, phone, role)
    if (result.success) {
      // Force a page reload to update auth context
      window.location.reload()
      return { success: true }
    }
    return { success: false, error: result.error }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error registering user",
    }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const result = simpleAuth.login(email, password)
    if (result.success) {
      // Force a page reload to update auth context
      window.location.reload()
      return { success: true }
    }
    return { success: false, error: result.error }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error logging in",
    }
  }
}

export async function logoutUser() {
  try {
    simpleAuth.logout()
    // Force a page reload to update auth context
    window.location.reload()
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error logging out",
    }
  }
}
