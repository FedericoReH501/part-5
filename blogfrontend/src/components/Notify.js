const Notify = ({ notify, errornotify }) => {

  if (errornotify === null && notify === null) {
    return null
  }
  if (notify) {
    return (
      <div className="notify">
        <h2> {notify}</h2>
      </div>
    )
  }
  if (errornotify) {
    return (
      <div className="errornotify">
        <h2> {errornotify}</h2>
      </div>
    )
  }

}

export default Notify