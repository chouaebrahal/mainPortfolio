
const Alert = ({text,type}) => {
  
  return (
    <div className={`fixed top-30 left-1/2 -translate-x-1/2 ${type === 'success' ? "bg-green-300" : "bg-red-500"} text-white px-4 py-2 rounded-2xl`}>
         {text}
    </div>
  )
}

export default Alert