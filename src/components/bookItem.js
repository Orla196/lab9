import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from "axios";

// Functional component for rendering a book ite
function BookItem(props) {

    return (
        <div>
             {/* Card component from React Bootstrap */}
            <Card>
                {/* Displaying book title in the card header */}
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        {/* Displaying book cover image */}
                        <img src={props.myBook.cover}></img>
                        <footer>
                            {/* Displaying book author */}
                            {props.myBook.author
                            }
                        </footer>
                    </blockquote>
                </Card.Body>
                {/* Link to navigate to the Edit page with the book's ID */}
                <Link to={'/edit/' + props.myBook._id} className='btn btn-primary'>Edit</Link>
                {/* Button to delete the book */}
                <Button onClick={(e) => {
                    e.preventDefault();
                    axios.delete('http://localhost:4000/api/book/' + props.myBook._id)
                        .then((res)=>{
                            props.reload();
                        })
                        .catch();
                }} variant="danger">Delete</Button>
            </Card>
            {/* <h3>{props.myBook.title}</h3>
            <img src={props.myBook.thumbnailUrl}></img>
            <p>{props.myBook.authors[0]}</p> */}
        </div>
    );

}
// Exporting the BookItem component
export default BookItem;
