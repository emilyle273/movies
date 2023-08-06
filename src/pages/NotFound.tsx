import Header from '@components/Header'

const NotFound = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='not-found'>
          <h1 className='not-found__heading'>404 - Page Not Found</h1>
          <p className='not-found__messge'>The requested page could not be found.</p>
        </div>
      </div>
    </>
  )
}

export default NotFound
