import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import useUser from '../../../../Hooks/useUser'
import { Navigate, useNavigate } from 'react-router-dom'

const CheckoutPayment = ({price, cartItem}) => {
    const URL =`http://localhost:5000/payment-info?${
    cartItem && `classId =${cartItem}`
    }`
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const {currentUser, isLoading} = useUser()
    const [clientSecret, setClientSecret] = useState('')
    const [succeeded, setSucceeded] = useState('')
    const [message, setMessage] = useState('')
    const [cart, setCart] = useState([])
    const navigate = useNavigate()

    if(price <0 || !price){
        return <Navigate to="/dashboard/my-selected" replace />
    } 

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
        .then((res) => {const classesId = res.data.map((item) => item._id)
            setCart(classesId)
        })
        .catch((err)=> {console.log(err)})
    },[])
    

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: price}).then((res) => {
            setClientSecret(res.data.clientSecret)
            console.log(res.data)
        })
    },[])

    const handleSubmit = async(event) => {
        setMessage('')
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card,
        })
        if(error){
            console.log("[error]", error)
            setMessage(error.message)
        }else{
            console.log("[PaymentMethod]", paymentMethod)
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: currentUser?.name || "Unknown",
                    email: currentUser?.email || "Anonymous"
                }
            }
        })

        if(confirmError){
            console.log("[Confirm Error]", confirmError)
        } else {
            console.log("[Payment Intent]", paymentIntent)
            if(paymentIntent.status === "succeeded"){
                const transactionId = paymentIntent.id
                const paymentMethod = paymentIntent.payment_method
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency
                const paymentStatus = paymentIntent.status
                const userName = currentUser?.name
                const userEmail = currentUser?.email

                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    classesId : cartItem ? [cartItem] : cart,
                    date: new Date()
                }
                
                fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(res => {
                console.log(res);
                if(res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId && res.updatedResult.modifiedCount > 0){
                    setSucceeded('Payment Successful, You can now access your classes')
                    alert("Payment Successful, You can now access your classes")
                    navigate('/dashboard/enrolled-classes')
                }else {
                    setSucceeded('Payment Failed!, Please try again...')
                }
                }).catch(err => console.log(err))
                
            }
        }
    }

  return (
    <>
        <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center pb-8">
          <h1 className="text-2xl font-bold text-gray-800">Payment Amount: <span className="text-green-500">${price}</span></h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="card-element" className="text-sm font-medium text-gray-700 block mb-2">
              Card Details
            </label>
            <CardElement
              options={{
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  fontVariantNumeric: 'tabular-nums',
                  "::placeholder": {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#FFC7EE',
                },
              }}
              id="card-element"
            />
          </div>

          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:opacity-50"
            type="submit"
            disabled={isLoading || !stripe || !clientSecret}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>

          {message && <p className="text-red-500 mt-2">{message}</p>}
          {succeeded && <p className="text-green-500 mt-2">Payment Successful!</p>}
        </form>
      </div>
    </div>
    </>
  )
}

export default CheckoutPayment