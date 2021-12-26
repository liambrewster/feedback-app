import { createContext, useState } from "react";
import {v4 as uuidv4 } from 'uuid';

const FeedbackContext  = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            rating: 10,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 2,
            rating: 9,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 3,
            rating: 8,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 4,
            rating: 8,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 5,
            rating: 5,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 6,
            rating: 11,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 7,
            rating: 12,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
    })
    // this will add in the feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
    }
    //this will delete the feedback item
    const deleteFeedback = (id) => {
        if(window.confirm('Are You Sure You Want To Delete?')){
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
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit

    }}>
        {children}
        </FeedbackContext.Provider>
}

export default FeedbackContext