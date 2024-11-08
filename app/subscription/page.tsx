import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const SubscritionPage = async() => {
    const { userId } = await auth();
    if (!userId) {
    redirect("/login");
  }
  return (
    <div>
      <h1>assinatura</h1>
    </div>
  )
}

export default SubscritionPage
