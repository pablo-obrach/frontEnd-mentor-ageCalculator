import styles from './InfoDate.module.css'

const InfoDate = ({data, title}) => {
  return (
    <div>
      <h2 className={styles.content}>
        <span className={styles.numbers}>{data} </span>
        {title}
      </h2>
    </div>
  )
}

export default InfoDate
