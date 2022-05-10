import React from 'react';

const totalKeyArray = ['pH', 'DO', 'EC'];

function ListView(props) {
    const { 
        locationArray, 
        selectedLocation, 
        onSelectItem, 
        onDeselectItem 
    } = props;



    function onClickItem(id) {
        if (selectedLocation === null) onSelectItem(id);
        else if (selectedLocation.id !== id) onSelectItem(id);
        else onDeselectItem();
    }

    const totalElements = totalKeyArray.map((key) => {
        const sum = locationArray.reduce((sum, location) => {
            return sum = (sum + location.latest[key]);  
        }, 0);

        const sumData = sum/locationArray.length
        
        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    {/* <p className="is-6 has-text-right">{sum/locationArray.length}</p> */}
                    <p className="is-6 has-text-right">{sumData.toFixed(2)}</p>
                </div>
            </div>
        );
    });

    const locationElements = locationArray.map(location => {
        const {
            id, name,
            latest: { pH, DO, EC }
        } = location;

        let title = name;
        // if (province !== '' && province !== country) {
        //     title = `${province}, ${country}`;
        // }

        let locationClass = 'list-view-location';
        if (selectedLocation !== null) {
            if (location.id === selectedLocation.id) {
                locationClass += ' selected';
            }
        }

        return (
            <div key={`${id}-${name}`} className={locationClass} onClick={() => onClickItem(id)}>
                <div className="columns">
                    <div className="column">
                        <h6 className="title is-6">{title}</h6>
                    </div>
                    <div className="column">
                        <p className="is-6 has-text-right">{pH}</p>
                        <p className="is-6 has-text-right">{DO}</p>
                        <p className="is-6 has-text-right">{EC}</p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="list-view">
            <div className="list-view-brand">
                <h2 className="title is-4">Water MSN</h2>
            </div>
            <div className="list-view-total">
                <h2 className="title is-4">Average ({locationArray.length}) Stations</h2>
                {totalElements}
            </div>
            <div className="list-view-locations">
                {locationElements}
            </div>
        </div>
    );
}

export default ListView;