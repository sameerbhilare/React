// This file will be served when request reaches ourdomain.com/:meetupId
// the name 'index.js' is a special name.
// keep page components as lean as possible.

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

/*
  On 'getStaticProps', 'context' will NOT hold request and response (like in case of getServerSideProps),
  but it will have a params key
*/
export async function getStaticProps(context) {
  // fetch data for single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        title: 'Our First Meetup',
        address: 'Some street 5, City',
        description: 'A meetup description',
      },
    },
  };
}

export default MeetupDetailsPage;
