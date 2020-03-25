import React, {useContext, useEffect} from 'react';
import Contacts from "../contacts/Contacts";
import PropTypes from 'prop-types';
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = props => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
                <Contacts/>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;
