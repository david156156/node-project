import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Business Card Manager</h1>
      <p className="lead">
        Welcome to Business Card Manager, your ultimate solution for managing
        and organizing business cards. Our platform allows you to create, edit,
        and manage your business cards with ease. Whether you're a business
        owner, a professional, or just someone who wants to keep track of their
        contacts, Business Card Manager is here to help.
      </p>
      <h2 className="mt-4">Features</h2>
      <ul>
        <li>Create and customize your business cards</li>
        <li>Organize your cards into categories</li>
        <li>Search and filter cards by various criteria</li>
        <li>Like and save your favorite cards</li>
        <li>Share your cards with others</li>
      </ul>
      <h2 className="mt-4">How to Use</h2>
      <p>
        Getting started with Business Card Manager is simple. Follow these steps
        to make the most out of our platform:
      </p>
      <ol>
        <li>Sign up for an account or log in if you already have one.</li>
        <li>
          Navigate to the "My Cards" section to view and manage your cards.
        </li>
        <li>
          Click on "Add Card" to create a new business card. Fill in the details
          and save.
        </li>
        <li>
          Use the search bar to find specific cards by title or other criteria.
        </li>
        <li>
          Click on the heart icon to like a card and save it to your favorites.
        </li>
        <li>Share your cards with others by clicking on the share icon.</li>
      </ol>
      <h2 className="mt-4">Integration</h2>
      <p>
        Business Card Manager offers seamless integration with various
        platforms. You can easily import and export your cards to and from other
        services. Our API allows developers to integrate Business Card Manager
        functionalities into their own applications.
      </p>
      <h3>API Endpoints</h3>
      <ul>
        <li>
          <strong>GET /cards</strong> - Retrieve all cards
        </li>
        <li>
          <strong>POST /cards</strong> - Create a new card
        </li>
        <li>
          <strong>PATCH /cards/:id</strong> - Update a card
        </li>
        <li>
          <strong>DELETE /cards/:id</strong> - Delete a card
        </li>
      </ul>
      <p>
        For more information on how to use our API, please refer to our{" "}
        <a href="/api-docs">API documentation</a>.
      </p>
      <h2 className="mt-4">Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to contact our
        support team at{" "}
        <a href="mailto:support@businesscardmanager.com">
          support@businesscardmanager.com
        </a>
        .
      </p>
    </div>
  );
};

export default About;
