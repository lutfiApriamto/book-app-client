import axios from "axios"
import { useState } from "react"
import PhotosUploader from '../PhotosUploader'
import Perks from '../Perks'
import AccountNav from "../AccountNav"
import { Navigate } from "react-router-dom"


export default function PlacesFormPage() {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState('')
    const [redirect, setRedirect] = useState(false)

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4 "> {text} </h2>
        )
    }

    function inputDesc(text) {
        return (
            <p className="text-gray-500 text-sm">{text} </p>
        )
    }
    function preInput(header, desc){
        return (
            <>
            {inputHeader(header)}
            {inputDesc(desc)}
            </>
        )
    }

    async function addNewPlace(e) {
        e.preventDefault();
        await axios.post('/places', {title,address, addedPhotos, description,perks, extraInfo, checkIn, checkOut, maxGuest});
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <>
        <AccountNav/>
                        <div>
                    <form onSubmit={addNewPlace}>
                        {preInput('Title','Title for your place, sholud be short' )}
                        <input type="text" placeholder="Title, exm : my home" value={title} onChange={e => setTitle(e.target.value)} />
                        {preInput('Address', 'Address for this Place')}
                        <input type="text" placeholder="Address, exm : my home" value={address} onChange={e => setAddress(e.target.value)} />
                        {preInput('Photos', 'More = Better')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                        {preInput('Descriptions', 'Descriptions for the places' )}
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        {preInput('Perks', 'Sellect a Perks on your place')}
                            <Perks selected={perks} onChange={setPerks}/>
                        {preInput('Extra Info','House Rules, ETC...' )}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>
                        {preInput('Check In&Out Times', 'Add Check In & Out times, remember to have some time window cleaning the room between guests')}
                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input type="text" placeholder="11:00" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input type="text" placeholder="14:00" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Number of Guset</h3>
                                <input type="number" value={maxGuest} onChange={e => setMaxGuest(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
        </>
    )
}