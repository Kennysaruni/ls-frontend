import React, { useEffect, useState } from 'react';
import './Form.css';

function Form() {
    const [url, setUrl] = useState('')
    const [slug, setSlug] = useState('')
    const [shortenedLink, setShortenedLink] = useState('')
    const [links, setLinks] = useState([])

    useEffect(e => {
        fetch('http://localhost:3000/s')
        .then(r => r.json())
        .then(data => setLinks(data.links))
    },[])
    console.log(links)
    
    function handleSubmit(e) {
        e.preventDefault();

        // Make API call to create the shortened link
        fetch('http://localhost:3000/s', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ url, slug }),
        })
        .then(res => {
            if (res.ok) {
                console.log('Link shortened successfully');
                return res.json();
            } else {
                console.error('Failed to shorten link');
            }
        })
        .then(data => setShortenedLink(data.short_link));
    }


  return (
    <div className='form-container'>
    <h1 className='title'> Swift </h1>
    <form onSubmit={handleSubmit}>
      <fieldset className='legend'>
        <legend>Shorten your link with a click !!</legend>
        <input
          className='input-block'
          type='text'
          placeholder='URL'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          className='input-block'
          type='text'
          placeholder='Slug'
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        />
        <button className='submit' type='submit'>Shorten</button>
      </fieldset>
    </form>
    {shortenedLink && (
      <div className='shortened-link'>
        Shortened link: <a href={shortenedLink}>{shortenedLink}</a>
      </div>
    )}
    <div className="links-container">
                <h2>Shortened Links:</h2>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={`http://localhost:3000/s/${link.slug}`} target="_blank" rel="noopener noreferrer">{link.url}</a>
                        </li>
                    ))}
                </ul>
            </div>
  </div>
  );
}

export default Form;
