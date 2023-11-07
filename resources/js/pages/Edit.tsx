import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditUser() {
    const navigate = useNavigate();

    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        fetchAdvert()
    }, [])

    const fetchAdvert = async () => {
        await axios.get(`/api/adverts/${id}`).then(({ data }) => {
            const { title, description, url } = data
            setTitle(title)
            setDescription(description)
            setUrl(url)
        }).catch(({ response: { data } }) => {
            toast(data.message);
        })
    }

    const changeHandler = (event) => {
        setUrl(event.target.files[0]);
    };

    const updateAdvert = async (e) => {
        e.preventDefault();

        await axios.put(`/api/adverts/${id}`, {
            title, description, url
        }).then(({ data }) => {
            toast(data.message);
            navigate("/")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                toast(response.data.message);
            }
        })
    }

    const onCancel = (e) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Advert</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={updateAdvert}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event) => {
                                                    setTitle(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Url">
                                                <Form.Label>Url</Form.Label>
                                                <Form.Control type="text" value={url} onChange={(event) => {
                                                    setUrl(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
                                    </Button>
                                    <Button variant="danger" className="mt-2 mx-3" size="lg" block="block" onClick={(event) => onCancel(event) }>
                                        Cancel
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}