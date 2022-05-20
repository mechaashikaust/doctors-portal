import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {

    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);
    const formattedDate = format(date, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;

        // {2} Booking data for sending to DB
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    toast(`Appointment is set, ${formattedDate} at ${slot}`);
                }
                else {
                    toast.error(`Already had an appointment on ${data.booking?.date} at ${data.booking?.slot}`);
                }

                // To Close The Modal
                refetch();
                setTreatment(null);

            })
        // {2} Booking data for sending to DB //*********** END */


    }
    console.log(user);
    return (
        <div>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>


                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3'>

                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />

                        <select name="slot" className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}> {slot}</option>)
                            }
                        </select>

                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary text-white w-full max-w-xs" />

                    </form>

                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default BookingModal;