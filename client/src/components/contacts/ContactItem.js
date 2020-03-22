import React, {useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";
import PropTypes from 'prop-types';

const ContactItem = ({contact}) => {
    const {id, name, email, phone, type} = contact;
    const contactContext = useContext(ContactContext);

    const deleteContact = () => {
        contactContext.deleteContact(id);
        contactContext.clearCurrent();
    };

    const setCurrent = () => {
        contactContext.setCurrent(contact);
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name} {' '}
                <span style={{float: 'right'}}
                      className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open"> {email} </i>
                </li>)}
            </ul>
            <ul className="list">
                {phone && (<li>
                    <i className="fas fa-phone"> {phone} </i>
                </li>)}
            </ul>
            <p className="btn btn-dark btn-sm" onClick={setCurrent}>Edit</p>
            <p className="btn btn-danger btn-sm" onClick={deleteContact}>Delete</p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
