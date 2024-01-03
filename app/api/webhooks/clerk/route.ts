/* eslint-disable */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { db } from '~/server/db'

export async function POST(req: Request): Promise<Response | undefined> {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  if (evt) {
    // 👉 Parse the incoming event body into a ClerkWebhook object
    try {
      // 👉 `webhook.type` is a string value that describes what kind of event we need to handle

      // 👉 If the type is "user.created" create a record in the users table
      if (evt.type === 'user.created') {
        const emailAddress = evt.data.email_addresses[0]?.email_address

        await db.user.create({
          data: {
            externalId: evt.data.id,
            username: evt.data.username ?? `${emailAddress.split('@')[0]}-${evt.data.id}`,
            name: `${evt.data.first_name} ${evt.data.last_name}`,
            imageUrl: evt.data.image_url,
            email: emailAddress
          }
        })
      }

      return new Response('', { status: 201 })
    } catch (err) {
      console.error(err)
      return new Response('Error occured -- processing webhook data', {
        status: 500
      })
    }
  }
}
