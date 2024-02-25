import React, { useEffect, useState } from 'react';
import './Form.css';

function Form() {
    const [url, setUrl] = useState('')
    const [slug, setSlug] = useState('')
    const [shortenedLink, setShortenedLink] = useState('')
    const [links, setLinks] = useState([])
    const [key, setKey] = useState(false)

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

    function handleKeyChange(){
      setKey(!key)
      console.log(key)
    }

// In React JS we work with html elements as well as they are rendered on the client
// Below is a form used to collect the data, i.e the url and its slug 

  return (
    <div className='form-container'>
    <h1 className='title'> Shortify your link</h1>
    <form onSubmit={handleSubmit}>
        <input
          className='input-block'
          type='text'
          placeholder='Paste a link to shorten'
          value={url}
          //On any change in the input field, the url will be set to the value in the input 
          onChange={(event) => setUrl(event.target.value)}
        />
        <div className="radio-control">
          <div className='key-control'>
            <span>Shorten without a key</span>
             <input type='radio'   name='radio' checked={!key} className='inline' onChange={() => setKey(false)} />
          </div>
          <div className='key-control'>
            <span>Shorten with a custom code</span>
              <input type='radio' name='radio' className='inline' checked={key} onChange={() => setKey(true)}/>
          </div>
        </div>
        {key && (
           <input
           className='input-block'
           type='text'
           placeholder='Enter your custom code'
           value={slug}
           onChange={(event) => setSlug(event.target.value)}
         />
        )}
        <button className='submit' type='submit'>Shorten</button>
        <p>By using linked, You agree to our Terms of Service and Privacy Policy.</p>
        <p>We use cookies for analytics, personalization and ads</p>
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
