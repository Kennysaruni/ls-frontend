import React, { useEffect, useState } from 'react'
import './Links.css'
import API_BASE_URL from '../utilities/env'

function Links() {
    const [data,setData] = useState([])
    const items = 5
    const [next,setNext] = useState(items)
    const [search,setSearch] = useState("")

    const filtered = data.filter(link => {
      return search.toLowerCase() === "" ? link :link.url.toLowerCase().includes(search)
    })

    console.log(filtered)

    useEffect(() => {
        fetch(`${API_BASE_URL}/s`)
        .then(res => res.json())
        .then(data => setData(data.links))
    },[])

    function loadMore(){
        setNext(next + items )
    }

  return (
    <div className='container'>
        <h1 className='title'>
            Your Links
        </h1>
        <label htmlFor="filter"> Filter links
            <input type="text" placeholder='Search for links by original link' id='filter' className='input-block' onChange={e => setSearch(e.target.value)} />
        </label>
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Short link</th>
                        <th>Original Url</th>
                        <th>Clicks</th>
                        <th>Key</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.slice(0,next).map((link) => (
                        (
                            <tr key={link.id}>
                                <td>{`${API_BASE_URL}/${link.slug}`}</td>
                                <td className='original-url'>{link.url}</td>
                                <td>{link.clicked}</td>
                                <td>{link.slug}</td>
                                <td>
                                    <buttons className='edit'>Edit</buttons>
                                    <buttons className='delete' >Delete</buttons>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
        {next < data.length && (
                <button className="load-more" onClick={loadMore}>Load more</button>
            )}
    </div>
  )
}

export default Links