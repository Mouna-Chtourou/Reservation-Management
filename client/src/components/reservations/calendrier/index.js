import Layout from '../../layout'
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/fr'
import Swal from 'sweetalert2'
import Moment from 'moment'
import 'moment/locale/fr'
import AddReservation from './addReservation'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useQuery } from 'react-query'

function ReturnLink() {
  return (
    <Link to='/reservations/reserver'>
      <button type='button' className='btn-cal mb-2 btn btn-fw'>
        <i className='mdi mdi-arrow-left mr-2'></i>
        Retourner vers salles
      </button>
    </Link>
  )
}

function Calendrier(props) {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const [open, setOpen] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const history = useHistory()

  const config = userInfo && {
   headers: {
       Authorization: `Bearer ${userInfo.token}`,
    },
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo])

  const {
    data: reservations,
    isLoading: loadingReservations,
    isFetching: fetchingReservation,
    refetch,
  } = useQuery('get-all-reservations', () =>
    axios.get('/reservations',config).then(res => res.data)
  )

  const event = (reservations || [])
    .filter(filteredRes => filteredRes.salle._id === props.location.state.id)
    .map(res => ({
      title: res.titre,
      start: res.deDate,
      end: res.versDate,
      allday: false,
      user: res.user.email,
      eventid: res._id,
      org: res.salle.organisme.nom,
      ressource:
        res.ressource.length !== 0
          ? res.ressource.map(l => l.nom)
          : "<p className='text-dark' style='font-size:18px;'> Pas de ressources réservées <p/>",
      color: '#74b358',
    }))

  const handleSelect = ({ start }) => {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(start.getDate())
    endDate.setDate(start.getDate())
    startDate.setMonth(start.getMonth())
    endDate.setMonth(start.getMonth())
    startDate.setYear(start.getFullYear())
    endDate.setYear(start.getFullYear())
    endDate.setTime(endDate.getTime() + 3600000)
    setStart(startDate)
    setEnd(endDate)
    setOpen(true)
  }

  const handleClickEvent = info =>
    Swal.fire(
      'Titre : ' + info.event.title,
      ' Date début :' +
        Moment(info.event.start).format('DD/MM/YYYY HH:mm') +
        'h' +
        '<br>' +
        ' Date fin :' +
        Moment(info.event.end).format('DD/MM/YYYY HH:mm') +
        'h' +
        '<br>' +
        'Utilisateur : ' +
        info.event.extendedProps.user +
        '<br>' +
        'ressources : ' +
        info.event.extendedProps.ressource,
      'info'
    )

  if (loadingReservations || fetchingReservation) return <Layout />

  return (
    <Layout>
      <ReturnLink />
      <div className='center'>
        <h2 className=' margin text-center text-secondary'>
          " {props.location.state.nom} " : {props.location.state.organisme}
        </h2>
        <div className='maincontainer mb-5 size'>
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            selectable={true}
            select={handleSelect}
            events={event}
            eventClick={handleClickEvent}
          />
        </div>
      </div>
      <AddReservation
        defaultEnd={end}
        defaultStart={start}
        isOpen={open}
        hideModal={() => setOpen(false)}
        salle={props.location.state.id}
        refetch={refetch}
      />
    </Layout>
  )
}

export default Calendrier

