

import Header from '@/components/Header'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const loggedin = await getLoggedInUser();
  if(!loggedin) redirect('/sign-in');
  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <Header
            type="greeting"
            title="welcome"
            subtext="Access and manage your bank account efficiently"
            user={loggedin.name || 'Guest'}
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={122}
          />
        </header>
        Recent Transaction
      </div>
      <RightSidebar
        user={loggedin}
        transactions={[]}
        banks={[{ currentBalance:123.50},{ currentBalance:122}]}
      />
    </section>
  )
}

export default Home