import React, {useState} from "react";
import Form from "react-bootstrap/cjs/Form";
import Button from "react-bootstrap/Button";

// ((([0-9]|[1-8][0-9])((\.[0-9]{1,5})|))|90\.00000)
// ((([0-9]|[1-8][0-9])\.[0-9]{1,5})|90\.00000)
// ((([0-9]|[1-9][0-9]|1[0-7][0-9])((\.[0-9]{1,5})|))|180\.00000)
// ((([0-9]|[1-9][0-9]|1[0-7][0-9])\.[0-9]{1,5})|180\.00000)

// ((([0-9]|[1-8][0-9])((\.[0-9]{1,5})|))|90\.00000) ((([0-9]|[1-9][0-9]|1[0-7][0-9])((\.[0-9]{1,5})|))|180\.00000)

// ((([0-9]|[1-8][0-9])\.[0-9]{1,5})|90\.00000) ((([0-9]|[1-9][0-9]|1[0-7][0-9])\.[0-9]{1,5})|180\.00000)

// 90.00000 2146.5757749
// 89.68888  2146.5757749
// 1.44500 146.5757749
// 146.57577 2146.5757749
// 2146.57577 180.5757749
// 0.45454 180.00000
// 99.99999 999.99999
// 99.0 999.99999
// 99. .99999

const Maskoo = () => {

    const [coor, setCoor] = useState("");
    const latRegex = /((([0-9]|[1-8][0-9])\.[0-9]{1,5})|90\.00000)/;
    const lonRegex = /((([0-9]|[1-9][0-9]|1[0-7][0-9])\.[0-9]{1,5})|180\.00000)/;
    const mask = /((([0-9]|[1-8][0-9])\.[0-9]{1,5})|90\.00000) ((([0-9]|[1-9][0-9]|1[0-7][0-9])\.[0-9]{1,5})|180\.00000)/;

    const color = /Red|Gr(een|ay)|Blue|Yellow|O(range|live)/;


    return (
        <Form onSubmit={e => {
            console.debug("coor ->", coor);
            setCoor("");
            e.preventDefault();
        }}>
            <label>
                Coordinates:{' '}

            </label>
            <Form.Control type="text"
                          placeholder="Enter the coor here..."
                          value={coor}
                          onChange={(e) => {
                              console.log(e.target.value);
                              setCoor(e.target.value)
                          }}
            />
            <Button type="submit" variant="success">Log it</Button>
        </Form>
    )
}

export default Maskoo;