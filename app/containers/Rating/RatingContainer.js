import React from 'react'
import Rater from 'react-rater'
import FeedbackForm from 'components/FeedbackForm/FeedbackForm'
import axios from 'axios'

const RatingContainer = React.createClass({
  getInitialState () {
    return {
      rate: null,
      rateForm: {},
      error: '',
      isFetching : false,
      isPoorFeedback : false
    }
  },
  componentDidMount () {
    let rateForm = this.state.rateForm
    rateForm['email']= this.props.email
    rateForm['lectureID']= this.props.lectureID
    rateForm['course']= this.props.course
    this.setState({
      rateForm
    })
  },
  handleOnRate ({ rating, lastRating, originalEvent }) {
    if (originalEvent.type === 'click' && rating !== lastRating) {
      let rateForm = this.state.rateForm
      rateForm['score'] = rating
      this.setState({
        rateForm,
        isPoorFeedback : rating < 4
      })
    }
  },
  sendFeedback (e){
    e.preventDefault()
    const self = this
    self.setState({
      isFetching : true,
    })

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        raterForm : self.state.rateForm
      }
    }
    axios.post(self.props.zap, {}, config )
    .then(function (response) {
      self.setState({
        isFetching : false,
        success: true,
      })
    })
    .catch(function (error) {
      console.log(error)
      self.setState({
        isFetching : false,
      })
    });
  },
  handleChange (event) {
    let field = event.target.name
    let rateForm = this.state.rateForm
    rateForm[field] = event.target.value
    this.setState({
      rateForm,
    })
  },
  render () {
    return (
      <div className="rating">
        { !this.state.success ?
        <div>
          {this.props.title ? <h2>{this.props.title}</h2> : null}
          <Rater rating={this.state.rateForm.score} onRate={this.handleOnRate} />
          <FeedbackForm
            rateForm={this.state.rateForm}
            showComment={this.state.isPoorFeedback}
            onChange={this.handleChange}
            sendFeedback={this.sendFeedback}
            error={this.state.error}
            commentLabel={this.props.commentLabel}
            isfetching={this.state.fetching} />
        </div> :
        <p className="success">{this.props.successMessage}</p> }
      </div>

    )
  },
})
export default RatingContainer
