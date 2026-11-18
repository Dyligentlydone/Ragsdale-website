export async function verifyTurnstile(
  token: string,
  clientIp?: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { success: false, errorCodes: ["missing-secret"] }
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(clientIp ? { remoteip: clientIp } : {}),
      }),
    }
  )

  const result = (await response.json()) as {
    success: boolean
    "error-codes"?: string[]
  }
  return { success: result.success, errorCodes: result["error-codes"] }
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  return (
    request.headers.get("cf-connecting-ip") ||
    forwarded?.split(",")[0].trim() ||
    undefined
  )
}
