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
} from '../types';

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
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = (contact) => {
        contact.id = 'abc';
        dispatch({type: ADD_CONTACT, payload: contact});
    };
    // Delete contact
    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id});
    };
    // Set current contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    };
    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    };
    // Update contact
    // Filter contact
    // Clear filter

    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent
            }}
        >
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;
