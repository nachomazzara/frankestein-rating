import React from 'react'

export default function FeedbackForm ({rateForm, showComment, commentLabel, onChange, sendFeedback, error, isFetching}) {

  return (
    <div>
      {error ? <div><p>{error}</p></div> : null}
      { showComment ?
        <h4>{commentLabel}</h4> :
        null }
      <form>
        { showComment ?<div >
          <p>
            <textarea id='comment' name='comment' placeholder='Ingrese su comentario aquí' onChange={onChange}></textarea>
          </p>
        </div> : null }
        <p>
          <button
            className="btn btn-primary"
            onClick={sendFeedback}
            disabled={(showComment && !rateForm.comment) ||  !rateForm.score || !!isFetching}>
                {'Enviar'}
          </button>
        </p>
      </form>
    </div>
  )
}
