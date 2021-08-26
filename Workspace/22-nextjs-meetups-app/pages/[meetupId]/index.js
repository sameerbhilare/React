// This file will be served when request reaches ourdomain.com/:meetupId
// the name 'index.js' is a special name.
// keep page components as lean as possible.

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailsPage = () => {
  return (
    <MeetupDetail
      image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
      title='Our First Meetup'
      address='Some street 5, City'
      description='A meetup description'
    />
  );
};

export default MeetupDetailsPage;
