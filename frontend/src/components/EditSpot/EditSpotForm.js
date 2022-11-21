import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchSingleSpot, updateASpot } from "../../store/spots";


const EditSpotForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {spotId} = useParams()
  //console.log('spotId', spotId)
  const currentSpot = useSelector(state=>state.spotStates.singleSpot)
  //console.log('currentSpot',currentSpot)


  useEffect(()=>{
    dispatch(fetchSingleSpot(spotId))
  },[dispatch,spotId])

  useEffect(()=>{
    setAddress(currentSpot?.address)
    setCity(currentSpot?.city)
    setState(currentSpot?.state)
    setCountry(currentSpot?.country)
    setName(currentSpot?.name)
    setDescription(currentSpot?.description)
    setPrice(currentSpot?.price)

  },[currentSpot])

  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [validationError, setValidationError] = useState([])

  const updateAddress = (e) => setAddress(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)

  

  useEffect(()=>{
    let err = []
    if(!address) err.push('Address is required')
    if(!city) err.push('City is required')
    if(!country) err.push('Country is required')
    if(!description) err.push('Please describe your spot ')
    if(!state) err.push('state is required')
    if(!name) err.push ('Please name your spot')
    if(!price) err.push('please enter price per night')
    setValidationError(err)
  },[name, price,description,address,city,country,state])

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const payload = {
        address,
        state,
        country,
        city,
        name,
        price,
        lat:50,
        lng:50,
        description,
        imageUrl
    }
    let updatedSpot;
    updatedSpot = await dispatch(updateASpot(payload,spotId))
    if(validationError.length){
      window.alert('Cannot submit the form')
    }
    history.push('/spots/current');
    reset();
  }
  const reset = (e) =>{
    e.preventDefault()
    setAddress('')
    setCity('')
    setCountry('')
    setDescription('')
    setName('')
    setPrice('')
    setState('')
  }


  return (
    <div>
      <h1>Edit Page</h1>
      <form onSubmit={handleSubmit}>
            <input
            type='text'
            value={address}
            onChange={updateAddress}
            required
            placeholder='Address'
            />
            <input
            type='text'
            value={state}
            onChange={updateState}
            required
            placeholder='State'
            />
            <input
            type='text'
            value={city}
            onChange={updateCity}
            required
            placeholder='City'
            />
            <input
            type='text'
            value={country}
            onChange={updateCountry}
            required
            placeholder='Country'
            />
            <input
            type='text'
            value={name}
            onChange={updateName}
            required
            placeholder='Name'
            />
            <input
            type='text'
            value={description}
            onChange={updateDescription}
            required
            placeholder='Description'
            />
            <input
            type='number'
            value={price}
            onChange={updatePrice}
            required
            placeholder='Price'
            />
            <button type='submit'> Update</button>
            <button onClick={reset}>Cancel</button>


      </form>
    </div>
  );
}

export default EditSpotForm;