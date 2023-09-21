import InfoDate from './InfoDate'
import arrow from '../assets/icon-arrow.svg'
import styles from './Card.module.css'
import {useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Card = () => {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState({years: '--', months: '--', days: '--'})
  const newCurrentDate = new Date().getFullYear()

  const handleChange = e => {
    const {name, value} = e.target

    if (name === 'day') {
      if (value >= 1 && value <= 31) {
        setDay(value)
      }
    } else if (name === 'month') {
      if (value >= 1 && value <= 12) {
        setMonth(value)
      }
    } else if (name === 'year') {
      const currentYear = new Date().getFullYear()
      if (value <= currentYear) {
        setYear(value)
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (
      day >= 1 &&
      day <= 31 &&
      month >= 1 &&
      month <= 12 &&
      year >= 1 &&
      year <= newCurrentDate
    ) {
      const dayInMonth = new Date(year, month, 0).getDate()

      if (day <= dayInMonth) {
        const birthDate = new Date(`${year}-${month}-${day}`)
        const currentDate = new Date()

        let yearsDiff = currentDate.getFullYear() - birthDate.getFullYear()
        let monthsDiff = currentDate.getMonth() - birthDate.getMonth()
        let daysDiff = currentDate.getDate() - birthDate.getDate()

        if (daysDiff < 0) {
          const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          ).getDate()
          daysDiff = lastDayOfMonth + daysDiff
          monthsDiff -= 1
        }

        if (monthsDiff < 0) {
          monthsDiff = 12 + monthsDiff
          yearsDiff -= 1
        }

        setAge({years: yearsDiff, months: monthsDiff, days: daysDiff})
      } else {
        MySwal.fire({
          toast: true,
          position: 'center',
          timer: 2000,
          timerProgressBar: true,
          title: "The day it's invalid",
          text: 'Insert a correct value for the current Month',
          icon: 'info',
          showConfirmButton: false
        })
      }
    } else {
      console.log('valores de fecha invalidos')
    }
  }

  return (
    <div role='main' className={styles.cardContainer}>
      <form
        className={styles.formContainer}
        action=''
        id='calendar'
        onSubmit={handleSubmit}
      >
        <div className={styles.inputContainer}>
          <h1>DAY</h1>
          <input
            name='day'
            type='number'
            min={1}
            max={31}
            placeholder='DD'
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <h2>MONTH</h2>
          <input
            name='month'
            type='number'
            min={1}
            max={12}
            placeholder='MM'
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <h3>YEAR</h3>
          <input
            name='year'
            type='number'
            min={1}
            max={newCurrentDate}
            placeholder='YYYY'
            onChange={handleChange}
          />
        </div>

        <button className={styles.buttonCard}>
          <img src={arrow} alt='arrow icon' />
        </button>
      </form>
      <div className={styles.infoContainer}>
        <InfoDate data={age.years} title={'years'} />
        <InfoDate data={age.months} title={'months'} />
        <InfoDate data={age.days} title={'days'} />
      </div>
    </div>
  )
}

export default Card
