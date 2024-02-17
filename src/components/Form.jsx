import React, { useEffect, useState } from 'react';
import './Form.css';

function Form() {
    const [url, setUrl] = useState('')
    const [slug, setSlug] = useState('')
    const [shortenedLink, setShortenedLink] = useState('')
    const [links, setLinks] = useState([])

    // Here we call useEffect, a React hook used mostly for fetching data, we use this to see the links
    useEffect(e => {
        fetch('http://localhost:3000/s')
        //Open pizza box (data)
        .then(r => r.json())
        // Devour the pizza (data)
        .then(data => setLinks(data.links))
    },[])
    // Just a debugging measure to ensure that the links data has actually been sent from the backend
    console.log(links)

    //We need a handleSubmit function to handle the submit event after a user clicks on the submit button
    // We call it on the onClick function provided by react therefore it acts as a callback function, a fuction called in a function 
    function handleSubmit(e) {
        //The e.preventDefault() function prevents the form from reseting itself
        e.preventDefault();

        // Make API call to create the shortened link
        fetch('http://localhost:3000/s', {
            // There are 4 common methods, POST, GET, PATCH, DELETE
            //Here we do a POST request because we are sending data to the API
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ url, slug }),
        })
        //This part is opening the pizza box, you cant eat the pizza without opening the box
        //We check whether the data is okay, and set it to json readable format
        .then(res => {
            if (res.ok) {
                console.log('Link shortened successfully');
                return res.json();
            } else {
                console.error('Failed to shorten link');
            }
        })
        // Here we devour  the pizza (data) , we use the setter function created above to set the data variable
        // to the data got from the API after a succesful POST  API request
        .then(data => setShortenedLink(data.short_link));
    }

// In React JS we work with html elements as well as they are rendered on the client
// Below is a form used to collect the data, i.e the url and its slug 

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
          //On any change in the input field, the url will be set to the value in the input 
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          className='input-block'
          type='text'
          placeholder='Slug'
          value={slug}
          //On any change in the input field, the url will be set to the value in the input 
          onChange={(event) => setSlug(event.target.value)}
        />
        <button className='submit' type='submit'>Shorten</button>
      </fieldset>
    </form>
    {/* After succesful link shortening, the shortened link will be displayed below the form */}
    {/* The link is clickable and will redirect the user to the original link */}
    {shortenedLink && (
      <div className='shortened-link'>
        {/* //Here we use the anchor tag (<a>) and the href attribute to send the user to the backend,
         which will redirect the user to the original link */}
        Shortened link: <a href={`http://localhost:3000${shortenedLink}`}>{shortenedLink}</a>
      </div>
    )}
    <div className="links-container">
                <h2>Shortened Links:</h2>
                <ul>
                    {/* Here we go through every element in the array we set above (links) with the setLinks setter function */}
                    {/* After we go through each link they are rendered on the client from the server*/}
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
