import React from 'react'

function Loader() {
    return (
        <div className="panel panel-default">
            <div className="panel-heading"></div>
            <div className="panel-body">
                <div className="text-center">
                    <div className="ajax-loader">
                        <img className="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" alt="Loader" />
                        <span style={{ paddingLeft: '5px' }}>Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader