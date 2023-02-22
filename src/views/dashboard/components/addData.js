const addData = (newData, setData, setShowData) => {
  const sortedData = [...newData]
  sortedData.sort((a, b) => {
    return new Date(b.latestPayment).getTime() - new Date(a.latestPayment).getTime()
  })
  sortedData.reverse()
  setData(sortedData)
  setShowData(sortedData)
}

export default addData
