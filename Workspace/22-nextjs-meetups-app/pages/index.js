// This file will be served when request reaches ourdomain.com/
// the name 'index.js' is a special name.

import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

const HomePage = () => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  /* 
  IMPORTANT - 
  Here useEffect will execute the function after this HomePage component is loaded.
  So for the first render cycle (which will be server side pre-rendered page) the loadedMeetups will be empty.
  And those are fetched only in the 2nd render cycle as part of useEffect function execution.
  So if you see the html page source, you will not see the loadedMeetups 
  as those are fetched only after the component is rendered in the browser.
  
  From SEO point of view, this is a problem.
  */
  useEffect(() => {
    // send http request and load data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
};

export default HomePage;
