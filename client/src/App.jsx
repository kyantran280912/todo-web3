import { useEffect, useState } from 'react'
import Web3 from "web3"
import TodoJSON from "./contract/Todo.json"

function App() {
  const [dataForm, setdataForm] = useState({
    index: 0,
    text: ""
  })
  const [listItem, setlistItem] = useState([])
  const [edit, setedit] = useState(false)
  useEffect(() => {
    listTodo()
  }, []);

  const web3Provider = () => {
    if (window.ethereum) {
      return new Web3(window.ethereum)
    }else {
      alert("please install metamask")
    }
  }
  const connectContract  = async () => {
      const provider = await web3Provider();
      const contractAddress = "0x305999D56Eaeaea6f4F61D6da2dCECACaA66D4bD";
      const accounts = await provider.eth.requestAccounts();
      return new provider.eth.Contract(TodoJSON.abi, contractAddress, {
        from: accounts[0]
      })
  }
  const addTodo = async () => {
    const constract = await connectContract();
    await constract.methods.add(dataForm.text).send()
  }


  const editTodo = async () => {
    const contract = await connectContract();
    await contract.methods.edit(dataForm.text, dataForm.index).send()
    setedit(false)
  }


  const submitData = async (e) => {
    e.preventDefault();

    if (edit) {
      await editTodo()
    }else{

      await addTodo();
    }
    alert("Submit is success")
    await listTodo()
    setdataForm(prev => ({
      index: 0,
      text: ""
    }))
  }

  const handleChange = e => {
      setdataForm(prev => ({
        ...prev,
        text: e.target.value
      }))
  }
  const listTodo = async () => {
    const contract = await connectContract();
    console.log(contract)
    try {
      const lists = await contract.methods.list().call();
    console.log(lists)
    setlistItem(lists)

      
    } catch (error) {
        console.log('error list ', error)
    }
  }
  const handleEdit = (text, index) => {
      setedit(true)
      setdataForm(prev => ({
        index, text
      }))
  }
  return (
      <div className='container mx-auto flex items-center justify-center'>
          <div className="p-8">
              <h1 className='text-4xl uppercase'>Todo</h1>
              <form className='mt-10' onSubmit={submitData}>
                  <label className='text-gray-600 text-[24px]'>Title</label>
                  <div><input type="text" onChange={handleChange} value={dataForm.text} className='border shadow-md outline-none p-2 rounded-xl' /></div>
                  <button type='submit' className='button bg-emerald-600 px-4 py-2 rounded-md text-white mt-3'>
                    Submit
                  </button>
              </form>
              <div className="card mt-6">
                <ul>
                  {listItem.map((text,i ) => (
                      <li key={i}>
                        {text}
                        <button 
                        className='button bg-emerald-600 px-4 py-2 rounded-md text-white mt-3 ml-2'
                        onClick={() => handleEdit(text,i)}
                        >Edit</button>
                      </li>
                  ))}
                </ul>
              </div>
          </div>
      </div>
  )
}

export default App
