import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    fullpageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        zIndex: 1,
    },
};

const View = ({render}) => (
    <div style={styles.fullpageContainer}>
       {render()}
    </div>
);

View.propTypes = {
    render: PropTypes.func.isRequired,
};

export default View;
