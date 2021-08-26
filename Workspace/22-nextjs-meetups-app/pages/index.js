// This file will be served when request reaches ourdomain.com/
// the name 'index.js' is a special name.

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

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  /* 
  IMPORTANT - 
  Here useEffect will execute the function after this HomePage component is loaded.
  So for the first render cycle (which will be server side pre-rendered page) the loadedMeetups will be empty.
  And those are fetched only in the 2nd render cycle as part of useEffect function execution.
  So if you see the html page source, you will not see the loadedMeetups 
  as those are fetched only after the component is rendered in the browser.

  From SEO point of view, this is a problem.
  SOLUTION is to use getStaticProps() - data fetching for pre-rendering
  */
  /*
  useEffect(() => {
    // send http request and load data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
  */

  return <MeetupList meetups={props.meetups || []} />;
};

/*
    By default, NextJS generates your pages already statically during the build process
    but if you need to add data fetching to a page component, 
    you can do so by exporting a special function called 'getStaticProps' from inside your page component file.
    This now only works in your page component files, not in other component files.

    NextJS will look for a function with name getStaticProps() and if it finds it, 
    it executes that function during this pre-rendering process before it calls the component function.

    Job of getStaticProps is to prepare props for this page. 
    And these props could then contain the data this page needs.

    getStaticProps is allowed to be asynchronous. You can return a promise there
    and then, NextJS will wait for this promise to resolve, which means it waits until your data is loaded
    and then you return the props for this component function.

    In getStaticProps, you can also execute any code that would normally only run on a server.
    You could access a file system here or securely connect to a database 
    because any code you write in here will never end up on the client side and it will never execute on the client side 
    simply because this code is executed during the build process, 
    not on the server and especially not on the clients of your visitors.

    getStaticProps => data fetching for pre-rendering
*/
export async function getStaticProps() {
  // fetch data from an API or file system, etc.

  // in the end, must return an object
  return {
    // 'props' must be part of returned object
    // as it will passed to the props property of this component function (HomePage)
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
