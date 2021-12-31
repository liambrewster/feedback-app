import { createContext, useState, useEffect} from "react";

const FeedbackContext  = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
    })

    useEffect(() => {
    fetchFeedback()
    }, [])
    // get the feedback
    const fetchFeedback = async () => {
      const response = await fetch('/feedback?_sort=id&_order=desc')
      const data = await response.json()
      setFeedback(data)
      setIsLoading(false)
    }


    // ADD - the Feedback
    const addFeedback = async (newFeedback) => {
      const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      })
  
      const data = await response.json()
  
      setFeedback([data, ...feedback])
    }
    // UPDATE - the feedback
    const updateFeedback = (id,updItem) => {
      setFeedback(
        feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
      )
    }
    // DELETE - the feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are You Sure You Want To Delete?')){
            await fetch(`/feedback/${id}`, {method: 'DELETE'})

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    //this will set an item to be updated
    const editFeedback =(item) => {
      setFeedbackEdit({
        item,
        edit:true
      })
    }


    return <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback

    }}>
        {children}
        </FeedbackContext.Provider>
}

export default FeedbackContext