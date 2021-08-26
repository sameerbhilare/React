// This file will be served when request reaches ourdomain.com/new-meetup
// the name 'index.js' is a special name.

import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);

    // send request to API route which will be internal path as both frontend and backend are on same server
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
