import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from "./contactContext";
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "id": "1",
                "name": "Celestin",
                "email": "celestinbg@gmail.com",
                "phone": "0618217128",
                "type": "personal",
            },
            {
                "id": "2",
                "name": "Philippe",
                "email": "philippebg@gmail.com",
                "phone": "069876542",
                "type": "personal",
            },
            {
                "id": "3",
                "name": "Edgar",
                "email": "edgar@gmail.com",
                "phone": "0612345241",
                "type": "professional",
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    // Delete contact
    // Set current contact
    // Clear current contact
    // Update contact
    // Filter contact
    // Clear filter

    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts
            }}
        >
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;
