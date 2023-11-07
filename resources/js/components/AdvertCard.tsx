import React from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Col from "react-bootstrap/Col";


const ellipsis = (text) => { 
    return text && text.length > 100 
        ? text.substr(0,100) + '...' 
        : text
}

export default function AdvertCard(props) {

    const { url, title, description, id} = props.item;

    return (
        <Col className="col-12 col-md-3 col-sm-3 mx-2 mt-2">
            <div className="card">
                <img src="/img/advertising.jpg" className="card-img-top" width="100%" />
                <div className="card-body pt-0 px-0">
                    <div className="px-3 py-1">
                        <h5 className="text-muted">
                            Title
                        </h5>
                        <div className="text-muted">
                            {ellipsis(title)}
                        </div>
                    </div>
                    <hr className="mt-2 mx-3" />
                    <div className="px-3 pb-1">
                        <h5 className="text-muted">
                            Description
                        </h5>
                        <div className="text-muted small">
                            {ellipsis(description)}
                        </div>
                    </div>
                    <div className="mx-3 mt-3 mb-2">
                        <Link to={`/adverts/edit/${id}`} className='btn btn-success me-2'>
                            <small>Edit</small>
                        </Link>
                        <Button variant="danger" onClick={ () => props.onDelete(id) }>
                            <small>Delete</small>
                        </Button>
                    </div>
                </div>
            </div>
        </Col>
    )
}


