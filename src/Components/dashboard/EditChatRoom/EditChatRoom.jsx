import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function EditChatRoom(props) {
    console.log('edit chat room rendered')
    let [showEditField, setEditField] = useState(false)
    let [editTitle, setEditTitle] = useState(props.title)
    let [editDescription, setEditDescription] = useState(props.description)

    const handleEditView = () => {
        setEditField(!showEditField)
    }

    const handleCancelBtn = () => {
        setEditField(!showEditField)
    }

    const handleInputTitle = (val) => {
        setEditTitle(val)
    }

    const handleInputDescript = (val) => {
        setEditDescription(val)
        console.log(editDescription)
    }

    const saveEditChanges = (id) => {
        let title = editTitle
        let description = editDescription

        let newObj = {
            title,
            description
        }

        axios.put(`/rooms/${id}`, newObj).then(res => {
            let co_id = props.company_id
            axios.get(`/rooms/${co_id}`).then(res => {
                props.setCompany(res.data)
                setEditField(!showEditField)
            }).catch(console.log)
        }).catch(console.log)
    }

    return (
        <div className='editChatRoom'
            onClick={() => props.chatRoomClick(props.chat_room_id)}>
            <h4> {props.title} </h4>
            <label> {props.description} </label>
            <div>
                <div className=' whenHoovered1'> {!showEditField ?
                    <i
                        className="far fa-edit whenHoovered2"
                        onClick={() => handleEditView(props.chat_room_id)}
                    > </i> :
                    <div >
                        <input
                            onChange={(e) => handleInputTitle(e.target.value)}
                            defaultValue={props.title}
                            type="text" />
                        <input
                            onChange={(e) => handleInputDescript(e.target.value)}
                            defaultValue={props.description}
                            type="text" />
                        <button
                            className='whenHovered1'
                            onClick={() => handleCancelBtn()} >
                            X
                            </button>
                        <button
                            className='whenHovered1'
                            onClick={() => saveEditChanges(props.chat_room_id)}>
                            Save
                            </button>
                    </div>
                }

                </div>
                <i
                    className="far fa-trash-alt whenHoovered3"
                    onClick={() => props.deleteChatRoom(props.chat_room_id)} > </i>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    const { company_id } = reduxState
    return {
        company_id
    }
}

export default connect(mapStateToProps)(EditChatRoom)