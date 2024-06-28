import React, { useState, useEffect } from 'react';
import '../styles/NoteEditor.css';

const NoteEditor = ({ note, onSave, onCancel, onDelete }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [images, setImages] = useState(note.images || []);
    const [lists, setLists] = useState(note.lists || []);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
        setImages(note.images || []);
        setLists(note.lists || []);
    }, [note]);

    const handleSave = () => {
        const updatedNote = { ...note, title, content, images, lists };
        onSave(updatedNote);
    };

    const handleDelete = () => {
        onDelete(note._id);
    };

    const handleImageChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.value;
        setImages(newImages);
    };

    const handleAddImage = () => {
        setImages([...images, '']);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleListChange = (e, index) => {
        const newLists = [...lists];
        newLists[index] = e.target.value;
        setLists(newLists);
    };

    const handleAddList = () => {
        setLists([...lists, '']);
    };

    const handleRemoveList = (index) => {
        const newLists = lists.filter((_, i) => i !== index);
        setLists(newLists);
    };

    return (
        <div className="note-editor">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="note-title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className="note-content"
            />
            <div className="note-images">
                <h3>Images</h3>
                {images.map((image, index) => (
                    <div key={index} className="image-input">
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                            placeholder="Image URL"
                        />
                        <button className="blue-button" onClick={() => handleRemoveImage(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button className="blue-button" onClick={handleAddImage}>
                    Add Image
                </button>
            </div>
            <div className="note-lists">
                <h3>Lists</h3>
                {lists.map((list, index) => (
                    <div key={index} className="list-input">
                        <input
                            type="text"
                            value={list}
                            onChange={(e) => handleListChange(e, index)}
                            placeholder="List Item"
                        />
                        <button className="blue-button" onClick={() => handleRemoveList(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button className="blue-button" onClick={handleAddList}>
                    Add List
                </button>
            </div>
            <div className="note-editor-buttons">
                <button className="blue-button" onClick={handleSave}>
                    Save
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Cancel
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteEditor;
