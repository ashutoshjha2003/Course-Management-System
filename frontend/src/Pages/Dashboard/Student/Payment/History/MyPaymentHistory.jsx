import { useEffect, useState } from 'react'
import useAxiosFetch from '../../../../../Hooks/useAxiosFetch'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure'
import useUser from '../../../../../Hooks/useUser'
import moment from 'moment';

const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch()
  const axiosSecure = useAxiosSecure()
  const {currentUser} = useUser()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [paginatedPayments, setPaginatedPayments] = useState([])
  const totalItems = payments.length
  const [page, setPage] = useState(1)

  let totalPage = Math.ceil(totalItems/5)
  let itemsPerPages = 5
  const handleChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    const lastIndex = page * itemsPerPages
    const firstIndex = lastIndex - itemsPerPages
    const currentItems = payments.slice(firstIndex, lastIndex)
    setPaginatedPayments(currentItems)
  },[page, payments])

  useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser?.email}`).then(res => {
      setPayments(res.data)
      setLoading(false)
    }).catch(err => console.log(err))
  },[currentUser?.email])

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0)
  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>Hey, <span className='text-secondary font-bold'>{currentUser.name}</span> Welcome...!</p>
        <h1 className='text-4xl font-bold'>My Paym<span className='text-secondary'>ent Hist</span>ory</h1>
        <p className='text-gray-500 text-sm my-3'>You can see your pyment history here</p>
      </div>

      {/* table here */}
      <div>
        <div>
          <p className='font-bold'>Total Payments: {payments.length}</p>
          <p className='font-bold'>Total paid: ${totalPaidAmount}</p>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">#</th>
                      <th className="text-left font-semibold">Amount</th>
                      <th className="text-left font-semibold">Total Item</th>
                      <th className="text-left font-semibold">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      paginatedPayments.map((payment, idx) =>(
                        <tr>
                          <td>{idx + 1}</td>
                          <td className='white-space-nowrap px-6 py-4'>${payment.amount}</td>
                          <td className='white-space-nowrap px-6 py-4'>{payment.classesId.length}</td>
                          <td className='white-space-nowrap px-6 py-4'>
                            <p className= "text-green-500 text-sm">
                              {moment(payments.succeeded).format("MMMM Do YYYY, h:mm:ss a")}
                            </p>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPaymentHistory