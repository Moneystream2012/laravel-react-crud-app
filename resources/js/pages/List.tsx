import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';

import AdvertCard from "../components/AdvertCard";
import DeleteConfirmation from "../components/Confirm";


export default function AdvertList() {

    const [adverts, setAdverts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {
        fetchAdverts()
    }, [])

    const fetchAdverts = async (page = 1) => {
        await axios.get(`/api/adverts`, { params: { page }} )
        .then(({ data }) => {
            setAdverts(data.data)
            setTotalPages(data.last_page)
        })
    }

    const changePage = async (page) => {
        fetchAdverts(page);
    } 

    const showDeleteModal = (id) => {
        setId(id);
        setDeleteMessage(`Are you sure?`);
        setDisplayConfirmationModal(true);
    };
     
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const deleteAdvert = async (id) => {
        await axios.delete(`/api/adverts/${id}`)
        .then(({ data }) => {
            toast(data.message);
            fetchAdverts()
        }).catch(({ response: { data } }) => {
            toast(data.message);
        })
    }

    return (
        <Container>
            <Row>
                <div>
                    <Link className='btn btn-primary mb-2 float-end' to={"/adverts/create"}>
                        Create Advert
                    </Link>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    {
                        adverts.length > 0 && (
                            adverts.map((row, key)=>(
                                <AdvertCard 
                                    item={ row }
                                    key={ key }
                                    onDelete={ showDeleteModal }
                                />
                            )
                        ))
                    }
                </div>
            </Row>
            <Row className="justify-content-center mt-5">
                <Pagination className='min-content'>
                    <Pagination.Prev disabled/>
                        {
                            totalPages > 0 && (
                                [...Array(totalPages).keys()].map((item)=>(
                                    <Pagination.Item key={item} onClick={() => changePage(item + 1)}>{item + 1}</Pagination.Item>
                                ))
                            )
                        }
                    <Pagination.Next disabled/>
                </Pagination>
            </Row>
            <DeleteConfirmation 
                showModal={ displayConfirmationModal } 
                confirmModal={ deleteAdvert } 
                hideModal={ hideConfirmationModal } 
                id={id} 
                message={ deleteMessage }  
            />

        </Container>
    );
}