// This file will be served when request reaches ourdomain.com/:meetupId
// the name 'index.js' is a special name.
// keep page components as lean as possible.

import { MongoClient, ObjectId } from 'mongodb'; // will not be part of client bundle
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
  'getStaticPaths' is a function you need to export in a 'page' component file,
  if it's a dynamic page like we have it here AND you're using 'getStaticProps'.

  With 'getStaticProps', a page is pre-generated during the build process.
  This means that of course, NextJS needs to pre-generate all versions of this dynamic page in advance
  for all the supported IDs. 
  Because since this is dynamic, NextJS needs to know for which ID values it should pre-generate the page.

  'getStaticPaths' has the job of returning an object where we describe all the dynamic segment values.
  So all the meetup IDs in this case.

  'getStaticPaths' therefore is another important function, which you need in dynamic pages to tell NextJS
  for which dynamic parameter values this page should be pre-generated. 
  And then again, 'getStaticProps' executes for every page.
*/
export async function getStaticPaths() {
  /* 
    Here we could call fetch api to call our API routes
    e.g. fetch('/api/meetups');

    However this code in the 'getStaticProps' runs during "build time" and not exposed to client,
    we can directly get data using some helper function here.
    This will avoid sending unnecessary request to our own endpoint

    IMPORTANT -
    When you import something in a 'page' component file and that something is 
    then only used in getServerSideProps or getStaticProps, 
    then the imported package will NOT be part of the client side bundle. 
    So your credentials will NOT be exposed client/browser.

    So you can import both server side and clients side code here, and depending on where you use it,
    it will be included in different bundles which are independent from each other.
    That's a nice, smart feature built into nextJS.
  */
  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/meetups-db');
  const db = client.db();

  // select collection in which you want to insert document
  const meetupCollections = db.collection('meetups');
  // fetch all documents but only _id field
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  // close connection
  client.close();

  return {
    /*
      fallback key tells NextJS whether your 'paths' array contains all supported parameter values or just some of them.
      'false' means 'paths' arr contains all supported params 
      and if the user enters anything that's not supported here e.g. m3, he would see a 404 error.
      'true' means NextJS would try to generate a page for meetup ID 
      dynamically on the server for the incoming request.

      Fall back is a nice feature because it allows you to pre-generate some of your pages for specific meetup ID values.
      For example the pages which are visited most frequently 
      and then pre-generate the missing ones dynamically when requests for them are coming in.
    */
    fallback: false,

    // array of objects. In realiyy this will be fetched from DB and this array is then generated
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    /*
    paths: [
      // one object per version of this dynamic page.
      {
        // all the key-val pairs that lead to this dynamic page
        params: {
          meetupId: 'm1',
        },
      },
      // one object per version of this dynamic page.
      {
        // all the key-val pairs that lead to this dynamic page
        params: {
          meetupId: 'm2',
        },
      },
    ], */
  };
}

/*
  On 'getStaticProps', 'context' will NOT hold request and response (like in case of getServerSideProps),
  but it will have a params key
*/
export async function getStaticProps(context) {
  // fetch data for single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId); // you will see this log in terminal at the time of "build process" of this prj.

  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/meetups-db');
  const db = client.db();

  // select collection in which you want to insert document
  const meetupCollections = db.collection('meetups');
  // fetch all documents but only _id field
  const meetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) });
  console.log(meetup);
  // close connection
  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
