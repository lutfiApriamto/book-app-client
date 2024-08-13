import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from 'axios'

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState('')
    const [isLoading, setIsloading] = useState(false)

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

    async function addPhotoByLink(e) {
        e.preventDefault();
        setIsloading(true)
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
        } finally {
            setIsloading(false)
        }
    }
    
    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        setIsloading(true);  // Set isLoading to true before starting the upload
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => [...prev, ...filenames]);
        }).catch(error => {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
        }).finally(() => {
            setIsloading(false);  // Set isLoading to false after the upload is complete
        });
    }
    

    return(
        <div>
            {action !== 'new' && (
            <div className=" text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new Place
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form >
                        {preInput('Title','Title for your place, sholud be short' )}
                        <input type="text" placeholder="Title, exm : my home" value={title} onChange={e => setTitle(e.target.value)} />
                        {preInput('Address', 'Address for this Place')}
                        <input type="text" placeholder="Address, exm : my home" value={address} onChange={e => setAddress(e.target.value)} />
                        {preInput('Photos', 'More = Better')}
                        <div className="flex gap-2">
                            <input type="text" placeholder={'Add using a link ...'} value={photoLink}  onChange={e => setPhotoLink(e.target.value)} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {isLoading ? (
                                <div className="font-bold text-center">Loading Image...</div>
                            ) : (
                                addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                    <div key={index} className="h-32 flex">
                                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/' + link} alt="" />
                                    </div>
                                ))
                            )}
                            <label className="border h-32 cursor-pointer flex items-center gap-1 justify-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                                Upload 
                            </label>
                        </div>
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
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}