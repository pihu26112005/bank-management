import Header from '@/components/Header'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedin = { firstName: 'Piyush', lastName: 'Kumar', email: 'example@example.com'}
  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <Header
            type="greeting"
            title="welcome"
            subtext="Access and manage your bank account efficiently"
            user={loggedin?.firstName || 'Guest'}
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