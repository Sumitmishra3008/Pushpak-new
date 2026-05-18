import React from 'react'

const ConfirmRide = (props) => {
    // Use parent-provided setters directly; do not keep local state here.

    return (
        <div className="relative">
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

            <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-xs">Share</span>
                    <input
                        type="checkbox"
                        checked={Boolean(props.sharing)}
                        onChange={(e) => {
                            const on = e.target.checked
                            if (typeof props.setSharing === 'function') props.setSharing(on)
                            if (!on && typeof props.setsharingDelayConstraint === 'function') props.setsharingDelayConstraint(0)
                        }}
                        className="w-5 h-5"
                    />
                </label>
                {props.sharing && (
                    <label className="flex items-center gap-1 text-sm text-gray-700">
                        <span className="text-xs">Delay (min)</span>
                        <select
                            defaultValue={Number(props.sharingDelayConstraint) || 0}
                            onChange={(e) => {
                                const val = Number(e.target.value)
                                if (typeof props.setsharingDelayConstraint === 'function') props.setsharingDelayConstraint(val)
                            }}
                            className="bg-white border rounded px-2 py-1 text-sm"
                        >
                            {Array.from({ length: 31 }, (_, i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </label>
                )}
            </div>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()

                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide