const GridPlaceholder = () => {
  return (
    <div className='movies'>
      {Array.from({ length: 8 }, (_, index) => index + 1).map((el) => (
        <div className='placeholder movies__item' key={el}>
          <div className='placeholder__background placeholder__image' />
        </div>
      ))}
    </div>
  )
}

export default GridPlaceholder
