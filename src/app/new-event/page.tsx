'use client'
import '../../sass/NewEvent.scss'

const page = () => {
  const handleSubmit = () => {
    console.log('object')
  }

  return (
		<div className='new-event'>
			<form onSubmit={handleSubmit}>
				<label>
					<h2>Ponle título a tu evento:</h2>
					<input name='title' type='text' placeholder='nombre del evento' />
				</label>
			</form>

		</div>
  )
}
export default page
