import {useSelector, useDispatch} from 'react-redux'
import {getTicket, reset} from '../features/tickets/ticketSlice'
import {toast} from 'react-toastify'
import {BackButton} from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function Ticket() {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

  const params = useParams()
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}

export default Ticket